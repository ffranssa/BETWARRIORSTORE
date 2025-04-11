const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Configura el servidor Express
app.use(express.static('testers'));
app.use(bodyParser.urlencoded({ extended: true }));

// Configura la conexión a MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: '5to_betgambler'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión a la base de datos MySQL exitosa como ID ' + db.threadId);
});

app.get('/', (req, res) => {
    res.redirect('registro.html')
})


// Maneja el registro de usuario
app.post('/registro', (req, res) => {
    const { contrasena, nombre, apodo, dni, mail, edad, nacimiento } = req.body;

    // Verifica si la edad es menor de 18 años
    if (edad < 18) {
        res.status(400).send('Debes ser mayor de 18 años para registrarte.');
        return;
    }

    const query = 'INSERT INTO usuario (contra, nombre, apodo, DNI, mail, saldo, fecha_registro, edad, nacimiento ) VALUE (?, ?, ?, ?, ?, 300, NOW(), ?, ?)';

    // Llama al procedimiento almacenado AltaUsuario en la base de datos
    db.query(query, [contrasena, nombre, apodo, dni, mail, edad, nacimiento], (err, results) => {
        if (err) {
            console.error('Error al registrar el usuario: ' + err.stack);
            res.status(500).send('Error al registrar el usuario.');
            return;
        }
        console.log('Usuario registrado con éxito.');
        res.status(200).send('Usuario registrado con éxito.');
    });
});

// Maneja el inicio de sesión
app.post('/login', (req, res) => {
    const {apodo, contrasena } = req.body;
    const queryinicio = 'SELECT * FROM usuario WHERE apodo = ? AND contra = ?'
    // Verifica las credenciales en la base de datos
    db.query(queryinicio, [apodo, contrasena], (err, results) => {
        if (err) {
            console.error('Error al verificar las credenciales: ' + err.stack);
            res.status(500).send('Error al verificar las credenciales.');
            return;
        }

        if (results.length === 0) {
            console.log('El usuario ingresado no existe.');
            res.status(401).send('El usuario ingresado no existe.');
        } else {
            console.log('Inicio de sesión exitoso.');
            res.status(200).redirect('/index.html');
        }
    });
});


// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});


