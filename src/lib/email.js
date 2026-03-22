import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const FROM_ADDRESS = process.env.EMAIL_FROM || "FLAVR <noreply@flavr.com>";

function buildWelcomeHtml(name) {
    const firstName = name.split(" ")[0];
    const dashboardUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard`;

    return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FLAVR'a Hoş Geldiniz</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px -4px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a6b8a 0%,#2d8fb3 100%);padding:40px 40px 32px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="font-size:32px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
                    FL<span style="color:#f5c542;">A</span>VR
                  </td>
                </tr>
              </table>
              <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:12px 0 0;letter-spacing:0.05em;">
                KISISELLESTIRILMIS VITAMIN PAKETLERI
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="font-size:24px;font-weight:800;color:#0f172a;margin:0 0 8px;letter-spacing:-0.02em;">
                Hos Geldin, ${firstName}!
              </h1>
              <p style="font-size:15px;color:#64748b;line-height:1.7;margin:0 0 24px;">
                FLAVR ailesine katildigin icin cok mutluyuz. Bilimsel verilerle
                desteklenen, sana ozel vitamin rutinin seni bekliyor.
              </p>

              <!-- Feature cards -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#f0f9ff;border-radius:12px;padding:16px 20px;border-left:4px solid #1a6b8a;">
                    <p style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 4px;">
                      Kisisel Vitamin Rutinin
                    </p>
                    <p style="font-size:13px;color:#64748b;margin:0;line-height:1.6;">
                      Saglik testini tamamla ve sana ozel formulunu kesfet.
                      Her kapsul, senin icin secildi.
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#fefce8;border-radius:12px;padding:16px 20px;border-left:4px solid #f5c542;">
                    <p style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 4px;">
                      Bilimsel Yaklasim
                    </p>
                    <p style="font-size:13px;color:#64748b;margin:0;line-height:1.6;">
                      Tum formullerimiz klinik arastirmalar ve kanitli verilerle
                      gelistirilir. Seffaf, guvenilir.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 0;">
                    <a href="${dashboardUrl}" target="_blank"
                       style="display:inline-block;background:#1a6b8a;color:#ffffff;font-size:15px;font-weight:700;
                              text-decoration:none;padding:14px 40px;border-radius:50px;
                              box-shadow:0 4px 12px -2px rgba(26,107,138,0.4);">
                      Dashboard'a Git &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #f1f5f9;text-align:center;">
              <p style="font-size:12px;color:#94a3b8;margin:0 0 4px;">
                Bu e-posta, FLAVR'a kaydoldugunuz icin gonderilmistir.
              </p>
              <p style="font-size:12px;color:#94a3b8;margin:0;">
                &copy; 2026 FLAVR. Tum haklari saklidir.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendWelcomeEmail(email, name) {
    if (!resend) {
        console.log("RESEND_API_KEY not set — skipping welcome email for:", email);
        return null;
    }

    const { data, error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: "Welcome to the FLAVR Family! \uD83C\uDF3F",
        html: buildWelcomeHtml(name),
    });

    if (error) {
        throw new Error(`Resend error: ${error.message}`);
    }

    console.log("Welcome email sent:", data?.id, "to:", email);
    return data;
}
