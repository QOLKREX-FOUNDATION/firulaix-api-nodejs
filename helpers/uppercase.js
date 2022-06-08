const objectUppercase = (object) => {
    Object.keys(object).map(key => {
        if(typeof(object[key]) === "string" && key!='_id' && key!='user'){
            object[key] = String(object[key]).toUpperCase();
        }
    })
    return object;
}

module.exports = {
    objectUppercase
}