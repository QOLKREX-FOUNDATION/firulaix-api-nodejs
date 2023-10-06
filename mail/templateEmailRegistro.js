const templateEmailRegistro = ({ data, entityRegister }) => {
    // console.log({ data });
    return `
      <!DOCTYPE html>
  <html>
    <head>
      <style>
        /* Estilos CSS */
        body {
          font-family: Arial, sans-serif;
        }
  
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
  
        .header {
          background-color: #007bff;
          color: #fff;
          text-align: center;
          padding: 10px;
        }
  
        .content {
          padding: 20px;
          background-color: #fff;
        }
  
        .info {
          font-weight: bold;
        }
  
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Solicitud de Registro</h1>
        </div>
        <div class="content">
          <p>Gracias por completar el formulario de solicitud de registro</p>
          <p>Número de Fomrulario:</p>
          <div class="info">
            <p>${ data.correlativeNumber }</p>
          </div>
          <p>Información del Adoptante:</p>
          <div class="info">
            <p>Nombre del Adoptante: ${ data.adopter.firstName } ${ data.adopter.firstLastName }</p>
            <p>Correo Electrónico: ${ data.adopter.email }</p>
            <p>Teléfono de Contacto: ${ data.adopter.cellphone }</p>
            <p>Dirección: ${ data.adopter.address }</p>
          </div>
          <p>Información de la Mascota:</p>
          <div class="info">
            <p>Nombre de la Mascota: ${ data.pet.firstNamePet }</p>
            <p>Raza de la Mascota: ${ data.pet.race }</p>
            <p>Tipo de la Animal: ${ data.pet.specie }</p>
          </div>
          <p>Entidad Resgistradora:</p>
          <div class="info">
            <p>Entidad Registradora: ${ entityRegister[0].user?.local }</p>
            <p>email: ${ entityRegister[0].user?.email }</p>
            <p>Dirección: ${ entityRegister[0].user?.direction }</p>
          </div>
          <p>
            Estamos revisando su solicitud, nos pondremos en contacto con usted a
            la brevedad.
          </p>
          <p>Saludos cordiales</p>
        </div>
        <div class="footer">
          <p>© 2023 QolKrex</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

module.exports = {
    templateEmailRegistro,
};
