import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string, // Add token as an argument
  ) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const confirmLink = `${appUrl}/auth/new-verification?token=${token}`; // Include token in the link
  
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify Your Email Address',
      html: `<p>Click <a href="${confirmLink}">here</a> to verify your email address.</p>`
    });
  };