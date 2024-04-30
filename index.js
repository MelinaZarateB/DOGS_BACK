/* Conexion e iniciacion de la DB y el server */
const server = require('./src/server.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

/* Se realiza la sincronizacion de sequelize con la DB y luego se levanta el servidor(si se sincronizo bien) */
conn.sync({ force: false }).then(() => {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  })
  }).catch(error => console.error(error))