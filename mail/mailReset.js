const templateReset = ({ name, token }) => {
	return `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="x-ua-compatible" content="ie=edge" />
            <title>W.A.R. - Recuperar Contraseña</title>
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
                                    style="padding: 15px 0"
                                >
                                <a href="https://firulaixcoin.finance/" target="_blank" style="display: inline-block">
                                <img src="https://firulaixcoin.finance/images/mail/war.png" alt="Logo" border="0"
                                    style="display: block; width: 400px; max-width: 400px" />
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
                                    "
                                >
                                    <p class="text-line text-color" style="padding: 20px 10px 0">
                                        Estimado(a): ${name}
                                    </p>
    
                                    <p class="text-line text-color" style="padding: 20px 10px 0">
                                        Este mensaje es en respuesta a su reciente solicitud de
                                        recuperar una contraseña olvidada. Las medidas de seguridad de
                                        las contraseñas garantizan la información de su cuenta. Para
                                        restablecer su contraseña haga clic en el siguiente vinculo
                                        siguiente y siga las instrucciones.
                                    </p>
    
                                    <p class="text-line text-color" style="padding: 20px 10px 0">
									<a href="https://registro.firulaixcoin.finance/restore?token=${token}"
									style="
									background-color: #039be5;
									border: none;
									color: white;
									padding: 10px 20px;
									text-align: center;
									text-decoration: none;
									display: inline-block;
									font-size: 16px;
									"
									
									>Restaurar Contraseña
										
									</a>
    
                                    <p class="text-line text-color" style="padding: 20px 10px 0">
                                        El token expirará en 12 horas. Si usted no realizo está acción ignorarla.
                                    </p>
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
                                        padding: 24px;
                                        font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                                        font-size: 16px;
                                    "
                                ></td>
                            </tr>
    
                            <tr>
                                <td bgcolor="#e9ecef" style="padding: 24px">
                                    <div
                                        style="
                                            font-size: 10px;
                                            padding: 10px;
                                            border: 1px solid #aaa;
                                            background: #eee;
                                        "
                                    >
                                        <p>
                                            En Firulaix estamos comprometidos con tu seguridad y la de
                                            tu mascota, todo el proceso es transparente y
                                            descentralizado.
                                        </p>
    
                                        <p style="margin: 0">
                                            Para cualquier inquietud comunicarse a nuestro grupo de
                                            <a
                                                href="https://t.me/firulaixcoin"
                                                target="_blank"
                                                ref="noreferrer noopener "
                                                >TELEGRAM
                                            </a>
                                        </p>
                                        <p style="margin: 0">
                                            Para cualquier soporte comunicarse al siguiente E-MAIL
                                            <a href="mail:info@qolkrex.foundation">E-MAIL </a>
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
                        <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                        >
                            <tr>
                                <td class="" align="center" valign="top">
                                    <a
                                        href="https://firulaixcoin.finance/"
                                        target="_blank"
                                        style="display: inline-block"
                                    >
                                        <img
                                            src="https://firulaixcoin.finance/images/mail/firulaix.png"
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
                    <td align="center" bgcolor="#e9ecef" style="padding: 0 24px 24px">
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
                                        Recibió este correo electrónico porque acaba de solicitar un
                                        reseteo de contraseña en registro.firulaixcoin.finance
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="icons">
                                        <a
                                            href="https://www.facebook.com/firulaixfinance"
                                            class="icons facebook"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            <img
                                                src="https://firulaixcoin.finance/images/email/facebook.png"
                                                alt="facebook"
                                            />
                                        </a>
                                        <a
                                            href="https://www.youtube.com/channel/UCrOJRzI105YKDHa9zwABAqQ"
                                            class="icons youtube"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            <img
                                                src="https://firulaixcoin.finance/images/email/youtube.png"
                                                alt="youtube"
                                            />
                                        </a>
                                        <a
                                            href="https://twitter.com/firulaixcoin"
                                            target="_blank"
                                            class="icons twitter"
                                            rel="noreferrer noopener"
                                        >
                                            <img
                                                src="https://firulaixcoin.finance/images/email/twitter.png"
                                                alt="twitter"
                                            />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/firulaixcoin/"
                                            target="_blank"
                                            class="icons instagram"
                                            rel="noreferrer noopener"
                                        >
                                            <img
                                                src="https://firulaixcoin.finance/images/email/instagram.png"
                                                alt="instagram"
                                            />
                                        </a>
    
                                        <a
                                            href="https://discord.gg/3YYpSKw7m8"
                                            target="_blank"
                                            class="icons discord"
                                            rel="noreferrer noopener"
                                        >
                                            <img
                                                src="https://firulaixcoin.finance/images/email/discord.png"
                                                alt="discord"
                                            />
                                        </a>
                                        <a
                                            href="https://t.me/firulaixcoin"
                                            class="icons telegram"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            <img
                                                src="https://firulaixcoin.finance/images/email/telegram.png"
                                                alt="telegram"
                                            />
                                        </a>
    
                                        <a
                                            href="https://www.reddit.com/user/firulaix"
                                            class="icons reddit"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            <img
                                                src="https://firulaixcoin.finance/images/email/reddit.png"
                                                alt="reddit"
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

module.exports = { templateReset };
