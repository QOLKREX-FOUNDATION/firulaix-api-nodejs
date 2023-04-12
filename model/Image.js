const { Schema, model } = require("mongoose");

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
})

module.exports = model("Image", ImageSchema);
