export const buildPriceDropEmail = ({ userName, productTitle, oldPrice, newPrice, productUrl, productImage }) => {
  const savings = oldPrice - newPrice;
  const savingsPct = Math.round((savings / oldPrice) * 100);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Price Drop Alert</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background:linear-gradient(135deg,#1a1754 0%,#2e28a0 50%,#5b21b6 100%);padding:36px 40px;border-radius:16px 16px 0 0;text-align:center;">
              <p style="margin:0 0 6px 0;color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:3px;text-transform:uppercase;">PriceTrack Alert</p>
              <h1 style="margin:0;color:#ffffff;font-size:30px;font-weight:300;letter-spacing:-0.5px;">Price just dropped!</h1>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
              <p style="margin:0 0 8px 0;color:#64748b;font-size:15px;line-height:1.6;">Hi${userName ? ` ${userName}` : ""},</p>
              <p style="margin:0 0 32px 0;color:#334155;font-size:15px;line-height:1.7;">
                Great news — a product you're tracking just dropped in price. Here's your deal summary:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:24px;overflow:hidden;">
                <tr>
                  ${productImage ? `
                  <td width="100" valign="middle" style="padding:20px 0 20px 20px;">
                    <img src="${productImage}" alt="Product" width="70" height="70" style="display:block;width:70px;height:70px;object-fit:contain;border-radius:8px;background:#fff;" />
                  </td>` : ""}
                  <td valign="middle" style="padding:20px;">
                    <p style="margin:0 0 14px 0;color:#1e293b;font-size:13px;line-height:1.6;">${productTitle}</p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:24px;">
                          <p style="margin:0 0 3px 0;color:#94a3b8;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;">Was</p>
                          <p style="margin:0;color:#94a3b8;font-size:20px;font-weight:300;text-decoration:line-through;">&#8377;${oldPrice.toLocaleString("en-IN")}</p>
                        </td>
                        <td>
                          <p style="margin:0 0 3px 0;color:#6366f1;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;">Now</p>
                          <p style="margin:0;color:#6366f1;font-size:26px;font-weight:600;">&#8377;${newPrice.toLocaleString("en-IN")}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ecfdf5;border:1px solid #6ee7b7;border-radius:10px;margin-bottom:32px;">
                <tr>
                  <td style="padding:16px 24px;text-align:center;">
                    <p style="margin:0;color:#065f46;font-size:16px;">
                      You save <strong>&#8377;${savings.toLocaleString("en-IN")}</strong> &mdash; that's <strong>${savingsPct}% off</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <a href="${productUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#ffffff;text-decoration:none;font-size:15px;font-weight:500;padding:16px 48px;border-radius:10px;letter-spacing:0.2px;">
                      View &amp; Buy Now &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top:1px solid #f1f5f9;padding-top:24px;">
                    <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.7;text-align:center;">
                      This alert was sent because you're tracking this product on PriceTrack.<br />
                      Prices can change quickly &mdash; act fast before it goes back up.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:11px;">&copy; 2025 PriceTrack &mdash; Never overpay again</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
