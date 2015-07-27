// Definición del modelo de Quiz
module.exports = function (sequelize, DataTypes) {
   return sequelize.define('Quiz', {
      pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "-> Falta pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: { msg: "-> Falta respuesta"}}
      }, tema: {
        type: DataTypes.ENUM ('otro', 'ciencia', 'humanidades', 'ocio', 'tecnologia'),
        validate: {
          isIn: {
            args: [["otro", "ciencia", "humanidades", "ocio", "tecnologia"]],
            msg: "-> Tema no válido"
          },
          notEmpty: { msg: "-> Falta respuesta" }
        }
      }
   });
}
