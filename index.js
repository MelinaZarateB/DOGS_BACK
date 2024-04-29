/* Conexion e iniciacion de la DB y el server */
const server = require('./src/server.js');
const { conn } = require('./src/db.js');

/* Se realiza la sincronizacion de sequelize con la DB y luego se levanta el servidor(si se sincronizo bien) */
conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log('Server raised in port: 3001'); // eslint-disable-line no-console
  });
});
