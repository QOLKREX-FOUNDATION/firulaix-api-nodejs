const { Schema, model } = require("mongoose");

const RequestShema = new Schema(
  {
    adopter: {
      country: {
        type: String,
      },
      person: {
        type: String,
      },
      documentType: {
        type: String,
      },
      documentNumber: {
        type: String,
      },
      adopterType: {
        type: String,
      },
      isAddressPublic: {
        type: String,
      },
      addressPublic: {
        type: String,
      },
      // dni: {
      //   type: String,
      // },
      firstName: {
        type: String,
      },
      secondName: {
        type: String,
      },
      firstLastName: {
        type: String,
      },
      secondLastName: {
        type: String,
      },
      birthDate: {
        type: String,
      },
      gender: {
        type: String,
      },
      cellphone: {
        type: String,
      },
      email: {
        type: String,
      },
      department: {
        type: String,
      },
      province: {
        type: String,
      },
      district: {
        type: String,
      },
      address: {
        type: String,
      },
      registerEntity: {
        type: String,
      },
      jurament1: {
        type: Boolean,
      },
      isMicrochip: {
        type: String,
      },
      jurament3: {
        type: Boolean,
      },
    },
    pet: {
      microchip: {
        type: String,
      },
      dateMicrochip: {
        type: String,
      },
      firstNamePet: {
        type: String,
      },
      countryPet: {
        type: String,
      },
      birthDatePet: {
        type: String,
      },
      adoptionDate: {
        type: String,
      },
      genderPet: {
        type: String,
      },
      specie: {
        type: String,
      },
      race: {
        type: String,
      },
      color: {
        type: String,
      },
      isSterilized: {
        type: String,
      },
      fatherMicrochip: {
        type: String,
      },
      motherMicrochip: {
        type: String,
      },
    },
    correlativeNumber: {
      type: String,
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
    },
    imagePet: {
      cloduinaryId: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

RequestShema.method("toJSON", function () {
  const { __v, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
});

module.exports = model("Request", RequestShema);
