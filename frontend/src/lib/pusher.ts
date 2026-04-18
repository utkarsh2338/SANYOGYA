import Pusher from "pusher";

/**
 * Pusher server-side client for triggering events.
 * Used in Phase 2 for real-time messaging and notifications.
 */
export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.PUSHER_CLUSTER ?? "ap2",
  useTLS: true,
});

/**
 * Helper to trigger an event on a private user channel.
 */
export async function triggerUserEvent(
  userId: string,
  event: string,
  data: unknown
) {
  return pusherServer.trigger(`private-user-${userId}`, event, data);
}

/**
 * Helper to trigger an event on a conversation channel.
 */
export async function triggerConversationEvent(
  conversationId: string,
  event: string,
  data: unknown
) {
  return pusherServer.trigger(
    `private-conversation-${conversationId}`,
    event,
    data
  );
}
