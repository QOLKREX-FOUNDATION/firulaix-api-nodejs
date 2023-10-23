const templateDonationGreeting = ({
  name,
  lastName,
  email,
  dni,
  amount,
  currency,
}) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Gracias por tu generosa donación!</title>
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 400;
        }
  
        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 700;
        }
      }
  
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%;
        /* 1 */
        -webkit-text-size-adjust: 100%;
        /* 2 */
      }
  
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
  
      img {
        -ms-interpolation-mode: bicubic;
      }
  
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
  
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
  
      p {
        margin: 0;
      }
  
      .bold {
        font-weight: bold;
      }
  
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
  
      table {
        border-collapse: collapse !important;
      }
  
      a {
        color: #1a82e2;
      }
  
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
  
      .flex-item {
        display: flex;
        gap: 5px;
        margin-bottom: 10px;
      }
  
      .center {
        justify-content: center;
      }
  
      .mobile_toolbar__Bo3ir {
        background-image: linear-gradient(270deg, #04b4a4, #04cebd);
        box-shadow: 2px 2px 1px #0cac9c;
        margin: auto;
        width: 100%;
      }
  
      h1 {
        color: #111;
      }
  
      .text-color {
        color: #444;
      }
  
      .text-line {
        line-height: 1.7;
      }
  
      p {
        text-align: justify;
      }
  
      .process {
        box-sizing: border-box;
        background-color: #ffc094;
        box-shadow: 3px 3px 5px #555;
        font-size: 13px;
        gap: 20px;
        height: 150px;
        margin: 0 auto;
        text-align: center;
        padding: 10px;
        width: 150px;
      }
  
      .realized {
        background-color: #8bff67;
      }
  
      .danger {
        background-color: #ff5656;
      }
  
      .square {
        border: 2px solid #000;
        box-sizing: border-box;
        height: 48px;
        width: 48px;
        margin: 20px auto 0;
      }
  
      .icons {
        display: flex;
        margin: auto;
        width: 70%;
  
      }
  
      .icons a {
        border-radius: 20px;
        margin: 0 0.5rem;
        transition: 0.5s transform, 0.5s background-color;
      }
  
      .icons img {
        width: 40px;
      }
  
      .facebook:hover {
        background-color: #4274c0;
        transform: rotate(360deg);
      }
  
      .youtube:hover {
        background-color: #ff0000;
        transform: rotate(360deg);
      }
  
      .telegram:hover {
        background-color: #039be5;
        transform: rotate(360deg);
      }
  
      .reddit:hover {
        background-color: #e84a1b;
        transform: rotate(360deg);
      }
  
      .twitter:hover {
        background-color: #03a9f4;
        transform: rotate(360deg);
      }
  
      .instagram:hover {
        background-image: linear-gradient(to right bottom, #fbca2d, #831cc3);
        transform: rotate(360deg);
      }
  
      .discord:hover {
        background-color: #5c6bc0;
        transform: rotate(360deg);
      }
    </style>
  </head>
  
  <body style="background-color: #e9ecef">
    <div class="preheader" style="
                      display: none;
                      max-width: 0;
                      max-height: 0;
                      overflow: hidden;
                      font-size: 1px;
                      line-height: 1px;
                      color: #fff;
                      opacity: 0;
                  ">
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td class="mobile_toolbar__Bo3ir" align="center" valign="top" style="padding: 0px 0">
                <a href="https://firulaixcoin.finance/" target="_blank" style="display: inline-block">
                  <img src="https://media.discordapp.net/attachments/839620709517230081/1093538394224738305/logo-icon.png"
                    alt="Logo" border="0" style="display: block; width: 120px; max-width: 120px" />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td align="left" bgcolor="#ffffff" style="
                                          padding: 20px 50px 0;
                                          font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                                          border-top: 3px solid #d4dadf;
                                      ">
                <h1 style="
                                              margin: 0;
                                              font-size: 32px;
                                              font-weight: 700;
                                              letter-spacing: -1px;
                                              line-height: 48px;
                                          ">
                  <center>
                    ¡Gracias por la donación!
                  </center>
                </h1>
                <h4 style="padding-left: 10px; margin-top: 30px;">Estimado ${name}${" "}${lastName}</h4>
                <p class="text-line text-color" style="padding: 20px 10px">
                  Espero que este mensaje te encuentre bien. Queremos expresar nuestro más sincero agradecimiento por tu
                  generosa donación de <b>${amount}${currency}</b>, la cual recibimos con gran aprecio.
                </p>
                <p class="text-line text-color" style="padding: 20px 10px">
                  Nos sentimos afortunados de contar con personas como tú que comparten nuestra visión y compromiso. Tu donación nos impulsa a seguir trabajando con dedicación y pasión.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
            </tr>
            <tr>
              <td align="left" bgcolor="#ffffff" style="
                                          padding: 24px;
                                          font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                                          font-size: 16px;
                                      ">
              </td>
            </tr>
  
            <tr>
              <td align="left" bgcolor="#ffffff" style="
                                          padding: 24px;
                                          font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                                          font-size: 16px;
                                      ">
  
              </td>
            </tr>
  
            <tr>
              <td bgcolor="#e9ecef" style="padding: 24px">
                <div style="
                                              font-size: 10px;
                                              padding: 10px;
                                              border: 1px solid #aaa;
                                              background: #eee;
                                          ">
                  <p>
                    En World Animal Registry estamos comprometidos con tu seguridad y la de tu mascota, todo el proceso es transparente
                    y descentralizado.
                  </p>
  
                  <p style="margin: 0">
                    Para cualquier inquietud comunicarse a nuestro grupo de
                    <a href="https://t.me/WorldAnimalRegistry" target="_blank" ref="noreferrer noopener ">TELEGRAM
                    </a>
                  </p>
                  <p style="margin: 0">
                    Para cualquier soporte comunicarse al siguiente E-MAIL
                    <a href="mail:donaciones@worldanimalregistry.org">E-MAIL </a>
                  </p>
                  <br />
                  <p style="margin: 0">
                    Qolkrex Foundation,<br />
                    Support
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td class="" align="center" valign="top">
                <a href="https://firulaixcoin.finance/" target="_blank" style="display: inline-block">
                  <img src="https://github.com/QOLKREX-FOUNDATION/logos/blob/main/firucoingeko-200x200.png?raw=true" alt="Logo" border="0"
                    style="display: block; width: 90px; max-width: 90px" />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
  
      <tr>
        <td align="center" bgcolor="#e9ecef" style="padding: 0 24px 24px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td align="center" bgcolor="#e9ecef" style="
                                          padding: 12px 24px;
                                          font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                                          font-size: 14px;
                                          line-height: 20px;
                                          color: #666;
                                      ">
                <p style="margin: 0">
                  Recibió este correo electrónico porque acaba de registrar una aplicación en
                  registro.firulaixcoin.finance
  
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="icons">
                    <a href="https://www.facebook.com/firulaixfinance" class="icons facebook" target="_blank"
                    rel="noreferrer noopener">
                    <img src="https://github.com/QOLKREX-FOUNDATION/logos/blob/main/facebook.png?raw=true" alt="facebook" />
                  </a>
                  <a href="https://www.youtube.com/channel/UCrOJRzI105YKDHa9zwABAqQ" class="icons youtube" target="_blank"
                    rel="noreferrer noopener">
                    <img src="https://github.com/QOLKREX-FOUNDATION/logos/blob/main/youtube.png?raw=true" alt="youtube" />
                  </a>
                  <a href="https://twitter.com/firulaixcoin" target="_blank" class="icons twitter"
                    rel="noreferrer noopener">
                    <img src="https://github.com/QOLKREX-FOUNDATION/logos/blob/main/twitter.png?raw=true" alt="twitter" />
                  </a>
                  <a href="https://www.instagram.com/firulaixcoin/" target="_blank" class="icons instagram"
                    rel="noreferrer noopener">
                    <img src="https://github.com/QOLKREX-FOUNDATION/logos/blob/main/instagram.png?raw=true" alt="instagram" />
                  </a>

                  <a href="https://discord.gg/3YYpSKw7m8" target="_blank" class="icons discord" rel="noreferrer noopener">
                    <img src="https://raw.githubusercontent.com/QOLKREX-FOUNDATION/logos/main/discord.png?raw=true" alt="discord" />
                  </a>
                  <a href="https://t.me/firulaixcoin" class="icons telegram" target="_blank" rel="noreferrer noopener">
                    <img src="https://github.com/QOLKREX-FOUNDATION/logos/blob/main/telegram.png?raw=true" alt="telegram" />
                  </a>

                  <a href="https://www.reddit.com/user/firulaix" class="icons reddit" target="_blank"
                    rel="noreferrer noopener">
                    <img src="https://github.com/QOLKREX-FOUNDATION/logos/blob/main/reddit.png?raw=true" alt="reddit" />
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  
  </html>
  `;
};

module.exports = { templateDonationGreeting };
