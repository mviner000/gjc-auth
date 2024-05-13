import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `${appUrl}/auth/new-verification?token=${token}`; // Update link for email verification

  await resend.emails.send({
      from: 'mail@gjclibrary.com',
      to: email,
      subject: 'Verify Your Email Address',
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Verify Your Email</title>
              <style>
                  body {
                      font-family: 'Arial', sans-serif;
                      background-color: black;
                      color: lightgreen;
                      text-align: center;
                      padding-top: 50px;
                  }
                  h1 {
                      font-size: 3em;
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      text-transform: uppercase;
                      letter-spacing: 5px;
                      border-bottom: 2px solid lightgreen;
                      padding-bottom: 20px;
                  }
                  h2 {
                    font-size: 1.5em;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                    border-bottom: 2px solid lightgreen;
                    padding-bottom: 20px;
                  }
                  .container {
                      width: 80%;
                      margin: auto;
                      overflow: hidden;
                  }
                  h1 {
                      text-align: center;
                      padding: 20px;
                  }
                  h2 {
                      text-align: center;
                      padding: 20px;
                  }
                  p {
                      text-align: center;
                      padding: 20px;
                  }
                  a:hover {
                      background-color: #006040;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>GJCLibrary</h1>
                  <h2>Verify Your Email Address</h2>
                  <p>Click <a href="${confirmLink}">here</a> to verify your email address.</p>
              </div>
          </body>
          </html>
      `,
  });
};

  export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `${appUrl}/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: "mail@gjclibrary.com",
        to: email,
        subject: "🔑 Reset your password",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emerald Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: black;
            color: lightgreen;
            text-align: center;
            padding-top: 50px;
        }
        h1 {
            font-size: 3em;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            text-transform: uppercase;
            letter-spacing: 5px;
            border-bottom: 2px solid lightgreen;
            padding-bottom: 20px;
        }
        h2 {
          font-size: 1.5em;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-transform: uppercase;
          letter-spacing: 5px;
          border-bottom: 2px solid lightgreen;
          padding-bottom: 20px;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        h1 {
            text-align: center;
            padding: 20px;
        }
        h2 {
            text-align: center;
            padding: 20px;
        }
        p {
            text-align: center;
            padding: 20px;
        }
        a:hover {
            background-color: #006040;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>GJCLibrary</h1>
        <h2>Reset your password</h2>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
    </div>
</body>
</html>
`
    })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
      from: "mail@gjclibrary.com",
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA code: ${token}</p>`
  })
}