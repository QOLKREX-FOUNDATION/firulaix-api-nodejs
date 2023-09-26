const categorizarAnimal = (tipoAnimal = "") => {
    // Obtén la primera letra del tipo de animal y conviértela a minúscula
    const primeraLetra = tipoAnimal.charAt(0).toLowerCase();

    if (primeraLetra === "f") {
        return "CAT";
    } else if (primeraLetra === "c") {
        return "DOG";
    } else if (primeraLetra === "m") {
        return "FERRET";
    } else {
        // En caso de que no coincida con ninguna de las categorías conocidas
        return "Desconocido";
    }
};

const formatURL = (url) => {
    // const baseUrl = "https://firulaix-api-nodejs.vercel.app/public/images/petimg/";
    if (!url) {
        return "https://media.discordapp.net/attachments/839620709517230081/1156349206718578788/img-nofound.png?ex=6514a59e&is=6513541e&hm=7954188e4bc8db925d3a615e3f81e1a87114a329527d4d84fbec642ced94907a&=&width=575&height=671";
    }

    const baseUrl = "https://consultwar.renian.foundation/public/images/petimg/";

    const urlParts = url?.split("/");
    console.log(urlParts);

    const urlPart = urlParts[urlParts?.length - 1];

    console.log(urlPart);
    console.log(urlParts[0]);

    return `${ baseUrl }${ urlPart }`;

    // Si no se proporciona una URL, establece un placeholder
    // if (!url) {
    //   return "placeholder";
    // }

    // // Utiliza una expresión regular para verificar si la URL contiene un número de 15 dígitos al final
    // const regex = /(\d{15})$/;
    // const match = url.match(regex);

    // // Si se encuentra un número de 15 dígitos al final de la URL, lo devuelve
    // if (match) {
    //   return match[1];
    // }

    // // Si no se encuentra un número de 15 dígitos al final de la URL, devuelve el placeholder
    // return "placeholder";
};

module.exports = {
    categorizarAnimal,
    formatURL,
};
