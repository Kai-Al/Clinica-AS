const clinicaController = require("../controller/clinica.controller.js");

module.exports = (router) => {
  /**
   * @swagger
   * components:
   *    schemas:
   *        HistoriaClinica:
   *            type: object
   *            required:
   *                - cedula
   *                - nombrePaciente
   *                - fechaRegistro
   *                - nombreMedico
   *                - cedulaMedico
   *                - sintomas
   *            properties:
   *                cedula:
   *                    type: String
   *                    description: Cedula del paciente
   *                nombrePaciente:
   *                    type: String
   *                    description: Nombre del paciente
   *                nombreMedico:
   *                    type: String
   *                    description: Nombre del medico
   *                cedulaMedico:
   *                    type: String
   *                    description: Cedula del medico
   *                sintomas:
   *                    type: String
   *                    description: Sintomas del paciente
   *            example:
   *                cedula: 123456789
   *                nombrePaciente: Juan Perez
   *                nombreMedico: Juan Perez
   *                cedulaMedico: 123456789
   *                sintomas: dolor de cabeza
   */

  /**
   * @swagger
   * /api/clinica/{cedula}:
   *    get:
   *        summary: Consulta una historia clinica por cedula
   *        description: Consulta una historia clinica por cedula
   *        tags: [Historia Clinica]
   *        parameters:
   *          - in: path
   *            name: cedula
   *            schema:
   *                type: string
   *            required: true
   *            description: Cedula del paciente
   *        responses:
   *            200:
   *                description: La historia clinica fue consultada correctamente
   *                content:
   *                   application/json:
   *                    schema:
   *                        type: array
   *                        items:
   *                            $ref: '#/components/schemas/HistoriaClinica'
   *            404:
   *                description: No se encontraron historias clinicas del paciente
   */
  router.get("/clinica/:cedula", clinicaController.consultarHistoriaClinica);

  /**
   * @swagger
   * /api/crearHistoria:
   *    post:
   *        summary: Crea una historia clinica
   *        description: Crea una historia clinica
   *        tags: [Historia Clinica]
   *        requestBody:
   *            required: true
   *            content:
   *                application/json:
   *                    schema:
   *                        type: object
   *                        $ref: '#/components/schemas/HistoriaClinica'
   *        responses:
   *            200:
   *                description: La historia clinica fue creada correctamente
   */
  router.post("/crearHistoria", clinicaController.crearHistoriaClinica);

  /**
   * @swagger
   * /api/clinica:
   *    get:
   *        summary: Consulta las historias clinicas
   *        description: Consulta las historias clinicas
   *        tags: [Historia Clinica]
   *        responses:
   *            200:
   *                description: Las historias clinicas fueron consultadas correctamente
   *                content:
   *                   application/json:
   *                    schema:
   *                        type: array
   *                        items:
   *                            $ref: '#/components/schemas/HistoriaClinica'
   */
  router.get("/clinica", clinicaController.consultarHistoriasClinicas);

  //Ruta para consultar historias clinicas
  //con versión 2.0 añadiendo "accept-version: 2.0"
  router.get("/clinica/version2", (req, res) => {
    let version = req.headers["accept-version"];
    if (version == "2.0") {
      return hospitalController.consultarHistoriasClinicasV2;
    }
    return hospitalController.consultarHistoriasClinicas;
  });
};
