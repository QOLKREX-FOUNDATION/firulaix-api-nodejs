const { generateUrlForm } = require("../helpers/generateUrlForm");
const {
  mailRegisterEntity,
  mailRegisterUserWar,
  mailRegisterUserRenian,
  mailRegisterUserWarSRV,
  mailRegisterUserWarChip,
} = require("../helpers/mail");

const requestRegisterEntity = async (req, res) => {
  try {
    // console.log(req.body)
    if (req.body) {
      const sendEmail = await mailRegisterEntity({
        registry: req.body,
      });
    }

    return res.status(201).json({
      ok: true,
      // sendEmail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const requestRegisterUser = async (req, res) => {
  try {
    const url = await generateUrlForm();
    console.log({ url });
    // console.log(JSON.stringify(req.body));
    if (req.body) {
      const sendEmail = await mailRegisterUserWar({
        registry: req.body,
        url,
      });
    }

    return res.status(201).json({
      ok: true,
      // sendEmail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const requestRegisterUserRenian = async (req, res) => {
  try {
    const url = await generateUrlForm();
    // console.log(JSON.stringify(req.body));
        if (req.body) {
      const sendEmail = await mailRegisterUserRenian({
        registry: req.body,
        url
      });
    }

    return res.status(201).json({
      ok: true,
      // sendEmail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const requestRegisterUserWarWithChip = async (req, res) => {
  try {
    const country = req.body.country;
    if (!country) {
      return res.status(400).json({
        ok: false,
        msg: "Country is required",
      });
    }
    const url = await generateUrlForm(true, req.body.country);
    const addresses = {
      CL: "0x4f4c1714BD2583Be46a415b34acb3f69a4CC07f5",
      CO: "0xe4E0D5eB1Eda5c6a0C3279fDa8a9347c93501e25",
      ES: "0x186fD9C69711aBC74e53DBF808ef9C537cB00213",
      EC: "0x4923FfceD28391828C6dfe79e271E5bC16Ec5b8C",
      PE: "0x11c3e8eDCEd034cFCbCF88be14Dc19cB169d9951",
      HN: "0x3373681Db719331c7bdB06acB259247B0614d6f5",
    };
    if (req.body) {
      const newUrl = `${url}&address=${
        addresses[req.body.country]
      }`;
      const sendEmail = await mailRegisterUserWarChip({
        registry: req.body,
        url: newUrl,
      });
    }

    return res.status(201).json({
      ok: true,
      // sendEmail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};
const requestRegisterUserWarSRV = async (req, res) => {
  try {
    const country = req.body.country;
    if (!country) {
      return res.status(400).json({
        ok: false,
        msg: "Country is required",
      });
    }
    if (req.body) {
      const newUrl = `https://registro.worldanimalregistry.org/formulario/solicitud-de-registro?address=${
        country === "HN"
          ? "0x3373681Db719331c7bdB06acB259247B0614d6f5"
          : "0xE8A2a2c0fA6E62568f5dc389cAD421cDb06962D9"
      }`;
      const sendEmail = await mailRegisterUserWarSRV({
        registry: req.body,
        url: newUrl,
      });
    }

    return res.status(201).json({
      ok: true,
      // sendEmail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

module.exports = {
  requestRegisterEntity,
  requestRegisterUser,
  requestRegisterUserRenian,
  requestRegisterUserWarSRV,
  requestRegisterUserWarWithChip,
};
