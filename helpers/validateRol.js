const validateObject = [
	{ rol: "admin", insert: "er" },
	{ rol: "er", insert: "user" },
	{ rol: "user", insert: "medical" },
];

const validateRol = (rol, insert) => {
    let bandera=false;
	validateObject.forEach((ob) => {
		if (ob.rol === rol && ob.insert === insert) {
            bandera =true;
			return true;
		}
	});
	return bandera;
};

module.exports= {
    validateRol
}
