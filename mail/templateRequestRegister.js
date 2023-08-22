const templateRequestRegisterForm = ({ data }) => {
    return `
  <!DOCTYPE html>
  <html lang="es">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registrado Correctamente</title>
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
          .flex{
                display: flex;
          }

          .flex-row{
                flex-direction: row;
          }

          .flex-col{
                flex-direction: column;
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
              text-align: left;
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
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;" >
          <tr>
              <td align="center" bgcolor="#e9ecef">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" >
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
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" >
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
                                      ${ data.correlativeNumber
            .toString()
            .padStart(8, "0") }
                                  </center>
                              </h1>
                              <h1 style="
                                              margin: 0;
                                              font-size: 32px;
                                              font-weight: 700;
                                              letter-spacing: -1px;
                                              line-height: 48px;
                                          ">
                                  <center>
                                      Gracias por formar parte del mundo #PETLOVER
                                  </center>
                              </h1>
                              <p class="text-line text-color" style="padding: 20px 10px">
                                  Su registro fue realizado exitosamente! Por favor revise sus
                                  credenciales de registro a continuación. No comparta esta información con niguna
                                  entidad, su llave private es de suma importancia.
                              </p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr style="padding-bottom: 20px;">
              <td align="center" bgcolor="#e9ecef" >
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                          <td align="left" bgcolor="#ffffff" style="
                                  padding: 20px 50px 0;
                                  padding-bottom: 40px;
                                  font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
                              ">

                              <div class="flex flex-row">
                                  <div class="flex flex-col">
                                      <div class="flex-item text-color">
                                         
                                          <p>
                                              <b>Datos del Usuario:<br>
          
                                          </p>
                                          <hr>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Tipo de persona:</b>${ data.adopter.person
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Tipo de Documento:</b>${ data.adopter.documentType
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Número de Documento:</b>${ data.adopter.documentNumber
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Tipo de Adoptante:</b>${ data.adopter.adopterType
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>¿Tiene dirección pública?:</b>${ data.adopter.isAddressPublic
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Dirección Pública:</b>${ data.adopter.addressPublic
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Primer Nombre:</b>${ data.adopter.firstName
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Segundo Nombre:</b>${ data.adopter.secondName
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Primer Apellido:</b>${ data.adopter.firstLastName
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Segundo Apellido:</b>${ data.adopter.secondLastName
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Fecha de Nacimiento:</b>${ data.adopter.birthDate
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Género:</b>${ data.adopter.gender
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Teléfono / Celular:</b>${ data.adopter.cellphone
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Email:</b>${ data.adopter.email
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Departamento:</b>${ data.adopter.department
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Provincia:</b>${ data.adopter.province
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Distrito:</b>${ data.adopter.district
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Dirección :</b>${ data.adopter.address
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Entidada Registradora:</b>${ data.adopter.regiterEntity
        }<br>
          
                                          </p>
                                      </div>
                                  </div>
    
                                  <div class="flex flex-col">
    
                                      <div class="flex-item text-color">
                                          
                                          <p style="fontSize:30px">
                                              <b>Datos de la Mascota:<br>
          
                                          </p>
                                          <hr>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Microchip:</b>${ data.pet.microchip
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Fecha de Microchip:</b>${ data.pet.dateMicrochip
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Primer Nombre de la Mascota:</b>${ data.pet.firstNamePet
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>País de la Mascota:</b>${ data.pet.countryPet
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Fecha de Nacimiento:</b>${ data.pet.birthDatePet
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Fecha de Adopción:</b>${ data.pet.adoptionDate
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Género de la mascota:</b>${ data.pet.genderPet
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Especie:</b>${ data.pet.specie
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Raza:</b>${ data.pet.race }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Color:</b>${ data.pet.color }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Esterilizado:</b>${ data.pet.isSterilized
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Microchip del Padre:</b>${ data.pet.fatherMicrochip
        }<br>
          
                                          </p>
                                      </div>
                                      <div class="flex-item text-color">
                                          <img src="https://media.discordapp.net/attachments/839620709517230081/1093539283605917716/check.png"
                                              alt="checked" border="0" style="display: block; width: 20px; height: 20px" />
                                          <p>
                                              <b>Microchip de la Madre:</b>${ data.pet.motherMicrochip
        }<br>
          
                                          </p>
                                      </div>
                                  </div>
                              </div>


                            
                      </tr>
          </tr>
  
  
      </table>
  </body>
  
  </html>
    `;
};

module.exports = { templateRequestRegisterForm };
