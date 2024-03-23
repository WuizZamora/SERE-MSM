const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: "localhost",
    user: "root", // Reemplaza con tu usuario de MySQL
    password: "Lazp221819.", // Reemplaza con tu contraseña de MySQL
    database: "SERE_DB", // Reemplaza con el nombre de tu base de datos
});

const app = express();
// Middleware para parsear el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
const PORT = 3000; // Iniciar el servidor



// Conexión a la base de datos
connection.connect((err) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err);
        return; // Detiene la ejecución del programa después de imprimir el error
    }
    console.log("Conexión a la base de datos establecida");
});

// Ruta para manejar la solicitud POST del formulario
app.post('/AltaUsuario', (req, res) => {
    const { usuario, contraseña, tipo_alta } = req.body;

    // Insertar datos en la tabla Usuarios
    const sql = 'INSERT INTO Usuarios (Usuario, Contraseña, TipoUsuario) VALUES (?, ?, ?)';
    connection.query(sql, [usuario, contraseña, tipo_alta], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            res.status(500).send('Error al insertar usuario');
            return;
        }
        console.log('Usuario insertado correctamente');
        res.status(200).send('Usuario insertado correctamente');
    });
});

let IDCuenta;

app.post("/guardar-datos", (req, res) => {
    const { RegimenDeudor } = req.body;
    let camposDeudor = {};

    switch (RegimenDeudor) {
        case "Persona Moral":
            camposDeudor = {
                RazonSocial: req.body.RazonSocial,
                DireccionComercial: req.body.DireccionComercial,
                PoderNotarial: req.body.PoderNotarial,
                PoderNotarialDetalle: req.body.PoderNotarialDetalle,
                DomicilioFiscalPM: req.body.DomicilioFiscalPM,
                // Establecer valores predeterminados para campos no aplicables
                DomicilioFiscalPFAE: "N/A",
                DomicilioPersonalPFAE: "N/A",
                DomicilioLaboralPFAE: "N/A",
                DomicilioPersonalPF: "N/A",
                DomicilioLaboralPF: "N/A"
            };
            break;
        case "Persona Fisica con Actividad Empresarial":
            camposDeudor = {
                DomicilioFiscalPFAE: req.body.DomicilioFiscalPFAE,
                DomicilioPersonalPFAE: req.body.DomicilioPersonalPFAE,
                DomicilioLaboralPFAE: req.body.DomicilioLaboralPFAE,
                // Establecer valores predeterminados para campos no aplicables
                RazonSocial: "N/A",
                DireccionComercial: "N/A",
                PoderNotarial: "N/A",
                PoderNotarialDetalle: "N/A",
                DomicilioFiscalPM: "N/A",
                DomicilioPersonalPF: "N/A",
                DomicilioLaboralPF: "N/A"
            };
            break;
        case "Persona Fisica":
            camposDeudor = {
                DomicilioPersonalPF: req.body.DomicilioPersonalPF,
                DomicilioLaboralPF: req.body.DomicilioLaboralPF,
                // Establecer valores predeterminados para campos no aplicables
                RazonSocial: "N/A",
                DireccionComercial: "N/A",
                PoderNotarial: "N/A",
                PoderNotarialDetalle: "N/A",
                DomicilioFiscalPM: "N/A",
                DomicilioFiscalPFAE: "N/A",
                DomicilioPersonalPFAE: "N/A",
                DomicilioLaboralPFAE: "N/A"
            };
            break;
        // Agrega más casos según sea necesario para otros tipos de deudor
    }

    const IDUsuario = "1";

    const queryInfGeneral = `INSERT INTO InfGeneralCuenta (NoClientePadre, NoClienteHijo, TipoDeCaso, FechaDeAsignacion, IDUsuario) VALUES (?, ?, ?, ?, ?)`;

    connection.query(
        queryInfGeneral,
        [
            req.body.NoClientePadre,
            req.body.NoClienteHijo,
            req.body.TipoDeCaso,
            req.body.FechaDeAsignacion,
            IDUsuario
        ],
        (error, results, fields) => {
            if (error) {
                console.error("Error al insertar datos en la tabla InfGeneralCuenta: " + error);
                return res.status(500).send("Error interno del servidor");
            }

            IDCuenta = results.insertId;

            // Antes de la consulta a la base de datos para InfDeudor, verifica si DomicilioConfirmado es "No"
            let fechaValidacion = req.body.FechaValidacion; // Asignar la fecha proporcionada
            if (req.body.DomicilioConfirmado === "No") {
                fechaValidacion = null; // O cualquier otro valor predeterminado que desees
            }

            const queryInfDeudor = `INSERT INTO InfDeudor (IDCuenta, RegimenDeudor, ${Object.keys(camposDeudor).join(", ")}, Rfc, Curp, DomicilioEntrega, DomicilioAlternativo, ViaPrincipalDeContacto, DomicilioConfirmado, FechaValidacion, NumeroCelular, TelefonoFijoUno, TelefonoFijoDos, Email) VALUES (?, ?, ${Object.keys(camposDeudor).map(() => "?").join(", ")}, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            // Luego, en la lista de valores para la consulta, utiliza esta variable
            connection.query(
                queryInfDeudor,
                [
                    IDCuenta,
                    RegimenDeudor,
                    ...Object.values(camposDeudor),
                    req.body.Rfc,
                    req.body.Curp,
                    req.body.DomicilioEntrega,
                    req.body.DomicilioAlternativo,
                    req.body.ViaPrincipalDeContacto,
                    req.body.DomicilioConfirmado,
                    fechaValidacion, // Utiliza la variable en lugar de req.body.FechaValidacion
                    req.body.NumeroCelular,
                    req.body.TelefonoFijoUno,
                    req.body.TelefonoFijoDos,
                    req.body.Email,
                ],
                (deudorError, deudorResults, deudorFields) => {
                    if (deudorError) {
                        console.error("Error al insertar datos en la tabla InfDeudor: " + deudorError);
                        return res.status(500).send("Error interno del servidor");
                    }
                    res.json({ success: true, IDCuenta });
                }
            );
        }
    );
});

// Ruta para manejar el envío de formulario desde el cliente
app.post('/guardar-contactos', (req, res) => {
    // Obtener los datos del formulario
    const { NombreContacto1, DireccionContacto1, TelefonoContacto1, CelularContacto1, PuestoContacto1, EmailContacto1, EmailContactoAdicional1, ObservacionesContacto1 } = req.body;

    // Consulta SQL para insertar los datos del contacto fijo
    let sql = `INSERT INTO Contactos (IDCuenta, NumeroContacto, NombreContacto, DireccionContacto, TelefonoContacto, CelularContacto, PuestoContacto, EmailContacto, EmailContactoAdicional, ObservacionesContacto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let values = [IDCuenta, 1, NombreContacto1, DireccionContacto1, TelefonoContacto1, CelularContacto1, PuestoContacto1, EmailContacto1, EmailContactoAdicional1, ObservacionesContacto1]; // Utiliza el IDCuenta obtenido previamente

    // Ejecutar la consulta para el contacto fijo
    connection.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log("Contacto fijo insertado correctamente");

        // Iterar sobre los contactos dinámicos y guardar solo los que tienen información
        for (let i = 2; i <= 3; i++) { // Cambia los límites según tu límite de contactos dinámicos
            const NombreContacto = req.body['NombreContacto' + i];
            const DireccionContacto = req.body['DireccionContacto' + i];
            const TelefonoContacto = req.body['TelefonoContacto' + i];
            const CelularContacto = req.body['CelularContacto' + i];
            const PuestoContacto = req.body['PuestoContacto' + i];
            const EmailContacto = req.body['EmailContacto' + i];
            const EmailContactoAdicional = req.body['EmailContactoAdicional' + i];
            const ObservacionesContacto = req.body['ObservacionesContacto' + i];

            // Verificar si al menos uno de los campos dinámicos tiene información
            if (NombreContacto || DireccionContacto || TelefonoContacto || CelularContacto || PuestoContacto || EmailContacto || EmailContactoAdicional || ObservacionesContacto) {
                // Consulta SQL para insertar los datos del contacto dinámico
                sql = `INSERT INTO Contactos (IDCuenta, NumeroContacto, NombreContacto, DireccionContacto, TelefonoContacto, CelularContacto, PuestoContacto, EmailContacto, EmailContactoAdicional, ObservacionesContacto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                values = [IDCuenta, i, NombreContacto, DireccionContacto, TelefonoContacto, CelularContacto, PuestoContacto, EmailContacto, EmailContactoAdicional, ObservacionesContacto];

                // Ejecutar la consulta para el contacto dinámico
                connection.query(sql, values, (err, result) => {
                    if (err) throw err;
                    console.log(`Contacto dinámico ${i} insertado correctamente`);
                });
            }
        }

        // Enviar respuesta al cliente
        res.send('Datos de contacto guardados correctamente');
    });
});



app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
