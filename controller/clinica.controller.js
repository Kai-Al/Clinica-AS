const historiaClinica = require("../models/historiaClinica.js");
const { version } = require("express");

// Crear Historia clinica nueva.

exports.crearHistoriaClinica = (req, res) => {
  // Mira que no venga vacio el cuerpo.
  if (!req.body) {
    res.status(400).send({
      message: "El contenido del cuerpo no puede estar vacio.",
    });
  }

  // Crea el esquema de la historia clinica
  const nuevaHistoriaClinica = new historiaClinica({
    cedula: req.body.cedula,
    nombrePaciente: req.body.nombrePaciente,
    fechaRegistro: req.body.fechaRegistro,
    nombreMedico: req.body.nombreMedico,
    cedulaMedico: req.body.cedulaMedico,
    sintomas: req.body.sintomas,
  });

  // Guarda la historia clinica en la base de datos
  historiaClinica.create(nuevaHistoriaClinica, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Upss se explotó el servidor, no se pudo crear la historia clinica.",
      });
    else res.send(data);
  });
};

// Busca todas las historias clinicas.

exports.consultarHistoriasClinicas = (req, res) => {
  historiaClinica.find((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Uppss se explotó el servidor, no se pudieron consultar las historias clinicas.",
      });
    else res.send(data);
  });
};

// Busca una historia clinica por cedula

exports.consultarHistoriaClinica = (req, res) => {
  historiaClinica.find({ cedula: req.params.cedula }, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una histria clinica del paciente con cedula ${req.params.cedula}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error buscando la historia del paciente con cedula " + req.params.cedula,
        });
      }
    } else res.send(data);
  });
};
