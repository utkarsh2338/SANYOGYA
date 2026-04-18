import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.FROM_EMAIL ?? "hello@sanyogya.in";

/**
 * Send a transactional email.
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
  });
}

/**
 * Send application approval email.
 */
export async function sendApprovalEmail(to: string, firstName: string) {
  return sendEmail({
    to,
    subject: "Welcome to Sanyogya — You've Been Approved!",
    html: `
      <h2>Congratulations, ${firstName}!</h2>
      <p>Your Sanyogya profile has been verified and approved. 
      You can now access your dashboard and start discovering matches.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/home">
        Go to Dashboard →
      </a>
    `,
  });
}

/**
 * Send application rejection email.
 */
export async function sendRejectionEmail(to: string, firstName: string) {
  return sendEmail({
    to,
    subject: "Your Sanyogya Application",
    html: `
      <h2>Thank you for applying, ${firstName}.</h2>
      <p>After careful review, we are unable to approve your application at this time. 
      We may reach out if a future opportunity arises.</p>
    `,
  });
}
