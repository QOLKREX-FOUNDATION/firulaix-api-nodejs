const Request = require("../model/Request");
const bcrypt = require("bcrypt");
const { generateSequence } = require("./generateSquence");
const { generateJWTCorrelative } = require("./jwt");

const generateUrlForm = async () => {
  // creamos formulario de registro en la base de datos con los datos vacios, pero con su correlative

  try {
    const newCorrelativeNumber = await generateSequence(
      "Request",
      "correlativeNumber"
    );

    // crea el formulario en la base de datos
    const newForm = new Request({
      adopter: {
        country: "",
        person: "",
        documentType: "",
        documentNumber: "",
        adopterType: "",
        isAddressPublic: "",
        addressPublic: "",
        // dni:"",
        firstName: "",
        secondName: "",
        firstLastName: "",
        secondLastName: "",
        birthDate: "",
        gender: "",
        cellphone: "",
        email: "",
        department: "",
        province: "",
        district: "",
        address: "",
        regiterEntity: "",
        jurament1: false,
        isMicrochip: "",
        jurament3: false,
      },
      pet: {
        microchip: "",
        dateMicrochip: "",
        firstNamePet: "",
        countryPet: "",
        birthDatePet: "",
        adoptionDate: "",
        genderPet: "",
        specie: "",
        race: "",
        color: "",
        isSterilized: "",
        // dni:"",
        fatherMicrochip: "",
        motherMicrochip: "",
      },
      correlativeNumber: newCorrelativeNumber,
      isPayment: true,
    });

    await newForm.save();

    // creamos hash del correlative del formulario que enviaremos al correo

    // const correlation = bcrypt.hashSync(`${newCorrelativeNumber}`, 10);

    // console.log({ correlation });

    // generate jwt with correlation

    const tokenCorrelation = await generateJWTCorrelative(newCorrelativeNumber);

    // damos forma al url que enviaremos al correo

    // const url = `http://localhost:3001/formulario/solicitud-de-registro?correlative=${ tokenCorrelation }`;
    const url = `https://registro.worldanimalregistry.org/formulario/solicitud-de-registro?correlative=${ tokenCorrelation }`;

    return url;
    // const url= `https://worldanimalregistry.org/registro/${hash}`
    // const url= `http://localhost:3000/formulario/solicitud-de-registro/${hash}`
  } catch (error) {
    console.log(error);
    // const url = `http://localhost:3001/formulario/solicitud-de-registro`;
    const url = `https://registro.worldanimalregistry.org/formulario/solicitud-de-registro`;

    return url;
  }
};

// const getUrlForm = async (correlativeToken) => {
//   // desencriptamos el correlative jwt

//   const { correlative } = jwt.verify(
//     correlativeToken,
//     process.env.SECRET_JWT_SEED
//   );

//   // buscamos el formulario en la base de datos

//   const formData = await Request.findOne({ correlativeNumber: correlative });

//   // si no existe el formulario, retornamos false

//   if (!formData) {
//     return false;
//   }

//   // si existe el formulario, retornamos el url

//   // const url = `http://localhost:3001/formulario/solicitud-de-registro?correlative=${correlativeToken}`;

//   return formData;
// };

module.exports = {
  generateUrlForm,
};
