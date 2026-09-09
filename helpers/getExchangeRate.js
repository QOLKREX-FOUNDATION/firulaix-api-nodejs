const https = require("https");

const getExchangeRate = () =>
  new Promise((resolve, reject) => {
    https
      .get("https://free.e-api.net.pe/tipo-cambio/today.json", (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            const exchangeRate = JSON.parse(data);

            if (response.statusCode !== 200 || !exchangeRate.venta) {
              return reject(new Error("No se pudo obtener el tipo de cambio"));
            }

            resolve(Number(exchangeRate.venta));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });

module.exports = getExchangeRate;
