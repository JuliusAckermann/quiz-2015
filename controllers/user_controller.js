var users = { admin:  {id: 1, username: "admin",  password: "1234"},
              pepe:   {id: 2, username: "pepe",   password: "5678"}
};

exports.authenticate = function (login, password, callback) {
  if (users[login]) {
    if (password === users[login].password) {
      callback(null, users[login]);
    } else { callback(new Error('Contraseña incorrecta.')); }
  } else { callback( new Error('El usuario especificado no existe.')); }
}
