import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
    email: string,
    token: string,
  ) => {
    const confirmLink = `${appUrl}/auth/new-verification?token=${token}`; // Include token in the link
  
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify Your Email Address',
      html: `<p>Click <a href="${confirmLink}">here</a> to verify your email address.</p>`
    });
  };

export const sendPasswordResetEmail = async (
    email: string, 
    token: string
  ) => {
    const resetLink = `${appUrl}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA code: ${token}</p>`
  })
}