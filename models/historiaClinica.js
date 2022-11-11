const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historiaClinicaSchema = new Schema({
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    nombrePaciente: {
        type: String,
        required: true,
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    nombreMedico: {
        type: String,
        required: true
    },
    cedulaMedico: {
        type: String,
        required: true
    },
    sintomas: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("HistoriaClinica", historiaClinicaSchema);
