const { Schema, model } = require("mongoose");

const SchemaRaces = new Schema({
    animal: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    nameSpanish: {
        type: String,
        required: true,
        unique: true
    },
    nameEnglish: {
        type: String,
        required: true,
        unique: true
    },
    // status: {
    //     type: Boolean,
    //     default: true
    // }
},
    { timestamps: true }
);

SchemaRaces.method("toJSON", function () {
    const { __v, _id, ...race } = this.toObject();
    race.id = _id;
    return race;
});

module.exports = model("Race", SchemaRaces);
