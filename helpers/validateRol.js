const validateRol = (rolNew) => {
	if(rolNew=="ad") {
		return {ad:true};
	}else if(rolNew=="er"){
		return {er:true};
	}else if (rolNew == "us"){
		return {us:true};
	}else{
		return {}
	}
};

module.exports= {
    validateRol
}
