const templateRequestUserCardSRV = ({ registry, url }) => {
  console.log({ registryEmail: registry, url });
  return `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title>WAR - Solicitud de Registro</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          background: #eee;
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
          justify-content: center;
          margin: auto;
          width: 70%;
        }
  
        .icons a {
          border-radius: 20px;
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
          background-color: #111;
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
      <div
        class="preheader"
        style="
          display: none;
          max-width: 0;
          max-height: 0;
          overflow: hidden;
          font-size: 1px;
          line-height: 1px;
          color: #fff;
          opacity: 0;
        "
      ></div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  class="mobile_toolbar__Bo3ir"
                  align="center"
                  valign="top"
                  style="padding: 15px 0; background-color: transparent"
                >
                  <a
                    href="https://worldanimalregistry.org/es"
                    target="_blank"
                    style="display: inline-block"
                  >
                    <img
                      src="https://res.cloudinary.com/giandiaz/image/upload/v1711552547/logo-war_hsr455.webp"
                      alt="Logo"
                      border="0"
                      style="display: block; width: 150px; max-width: 150px"
                    />
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 50px 0;
                    font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                    border-top: 3px solid #d4dadf;
                    width: 100%;
                  "
                >
                  <h1
                    style="
                      margin: 0;
                      font-size: 32px;
                      font-weight: 700;
                      letter-spacing: -1px;
                      line-height: 48px;
                    "
                  >
                    <center>Gracias por enviar su solicitud de registro</center>
                  </h1>
                  <p
                    class="text-line text-color"
                    style="padding: 20px 10px; font-size: 1.2em; text-align: center"
                  >
                    Hola, hemos recibido su solicitud para el registro de su
                    mascota, puede darle click a este link para seguir con el
                    proceso.
                  </p>
                  <a
                    target="_blank"
                    href="${url}"
                    style="
                      background-color: #4caf50;
                      border: none;
                      color: white;
                      padding: 15px 32px;
                      text-align: center;
                      text-decoration: none;
                      display: inline-block;
                      font-size: 16px;
                      margin: 0 auto;
                      cursor: pointer;
                      border-radius: 5px;
                      display: grid;
                      place-items: center;
                      max-width: 150px;
                    "
                  >
                    Click Aqui
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 20px 50px 0;
                    font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                  "
                ></td>
              </tr>
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 24px;
                    font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                    font-size: 16px;
                  "
                >
                  <hr />
                  <div style="padding: 0 30px">
                    <h3>Datos del adoptante</h3>
                    <p class="text-line text-color">
                      <strong>Email:</strong>&nbsp;${ registry.email } <br />
                      <strong>Telefono:</strong>&nbsp;${ registry.phone } <br />
                      <strong>${registry.document}:</strong
                      >&nbsp;${registry.document_number}
                    </p>
                  </div>
                  <p
                    class="text-line text-color"
                    style="margin-top: 2em; padding: 0 30px; font-size: 12px"
                  >
                    Si tiene problemas para hacer clic en el botón "Click Aqui",
                    copie y pegue la siguiente URL en su navegador:
                    <a href="${url}">${url}</a>
                  </p>
                  <p style="padding: 0 30px; margin-top: 2em; font-size: 12px">
                    Si tiene alguna pregunta, Únete a nuestro grupo de
                    <a href="https://t.me/WorldAnimalRegistry" target="_blank"
                      >telegram</a
                    >
                  </p>
                </td>
              </tr>
  
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 0px 24px 24px 24px;
                    font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                    font-size: 16px;
                  "
                >
                  <hr />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#e9ecef"
                  style="
                    padding: 12px 24px;
                    font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    line-height: 20px;
                    color: #666;
                  "
                >
                  <p style="margin: 0">
                    Recibió este correo electrónico porque se acaba de registrar
                    en una aplicación o sitio web de World Animal Registry.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="icons">
                    <a
                      href="https://www.facebook.com/World-Animal-Registry-110574308218058/"
                      class="icons facebook"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <img
                        src="https://media.discordapp.net/attachments/839620709517230081/1116409480733790238/facebook.png"
                        alt="facebook"
                      />
                    </a>
  
                    <a
                      href="https://www.instagram.com/worldanimalregistry/"
                      target="_blank"
                      class="icons instagram"
                      rel="noreferrer noopener"
                    >
                      <img
                        src="https://media.discordapp.net/attachments/839620709517230081/1116410133765951560/instagram.png"
                        alt="instagram"
                      />
                    </a>
  
                    <a
                      href="https://www.youtube.com/@worldanimalregistry"
                      class="icons reddit"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <img
                        src="https://media.discordapp.net/attachments/839620709517230081/1120445770567532695/youtube.png"
                        alt="youtube"
                      />
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

module.exports = { templateRequestUserCardSRV };
