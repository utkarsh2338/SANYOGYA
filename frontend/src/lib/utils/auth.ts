import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

/**
 * Returns the current authenticated User from the database.
 * Throws if the user is not authenticated or not found in DB.
 */
export async function getCurrentUser(): Promise<User> {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error("User not found in database");
  }

  return user;
}

/**
 * Returns the current user or null — does not throw.
 * Useful for optional auth checks.
 */
export async function getCurrentUserOrNull(): Promise<User | null> {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}

/**
 * Checks if the current user has admin role.
 */
export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (user.role !== "admin") {
    throw new Error("Forbidden: Admin access required");
  }
  return user;
}
