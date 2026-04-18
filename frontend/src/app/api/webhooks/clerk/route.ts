import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("CLERK_WEBHOOK_SECRET is not set in environment variables.");
  }

  // Get Svix headers for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  // Read body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const eventType = evt.type;

  // ── user.created ─────────────────────────────────────────
  if (eventType === "user.created") {
    const { id, email_addresses, phone_numbers } = evt.data;

    const primaryEmail = email_addresses.find(
      (e) => e.id === evt.data.primary_email_address_id
    )?.email_address;

    const primaryPhone = phone_numbers?.find(
      (p) => p.id === evt.data.primary_phone_number_id
    )?.phone_number;

    if (!primaryEmail) {
      return NextResponse.json(
        { error: "No primary email found" },
        { status: 400 }
      );
    }

    await prisma.user.create({
      data: {
        clerkId: id,
        email: primaryEmail,
        phone: primaryPhone ?? null,
      },
    });

    console.log(`[Clerk Webhook] User created: ${id} (${primaryEmail})`);
  }

  // ── user.updated ─────────────────────────────────────────
  if (eventType === "user.updated") {
    const { id, email_addresses, phone_numbers } = evt.data;

    const primaryEmail = email_addresses.find(
      (e) => e.id === evt.data.primary_email_address_id
    )?.email_address;

    const primaryPhone = phone_numbers?.find(
      (p) => p.id === evt.data.primary_phone_number_id
    )?.phone_number;

    await prisma.user.update({
      where: { clerkId: id },
      data: {
        ...(primaryEmail && { email: primaryEmail }),
        ...(primaryPhone && { phone: primaryPhone }),
        lastActiveAt: new Date(),
      },
    });

    console.log(`[Clerk Webhook] User updated: ${id}`);
  }

  // ── user.deleted ─────────────────────────────────────────
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (id) {
      await prisma.user.delete({
        where: { clerkId: id },
      });

      console.log(`[Clerk Webhook] User deleted: ${id}`);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
