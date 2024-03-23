show databases;

CREATE DATABASE SERE_DB;
USE SERE_DB;

-- TABLA USUARIOS--
create table Usuarios(
IDUsuario int auto_increment primary key,
Usuario varchar(50),
Contraseña varchar(50), 
TipoUsuario varchar (255)
);
insert into Usuarios (Usuario, Contraseña, TipoUsuario) values ('Wuiz', '123456.', 'Admin');
select * from Usuarios;
-- drop table Usuarios;

-- TABLA INFORMACION GENERAL DE LA CUENTA --
CREATE TABLE InfGeneralCuenta (
	IDCuenta INT AUTO_INCREMENT PRIMARY KEY,
    NoClientePadre varchar(255),
    NoClienteHijo varchar(255),
    TipoDeCaso varchar(255),
    FechaDeAsignacion date,
    IDUsuario int,
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario)
);

select * from InfGeneralCuenta;
-- delete from InfGeneralCuenta where IdControl ='11';
-- drop table InfGeneralCuenta;

CREATE TABLE InfDeudor (
    IDCuenta INT,
    FOREIGN KEY (IDCuenta) REFERENCES InfGeneralCuenta(IDCuenta),
    RegimenDeudor VARCHAR(255),
    Rfc VARCHAR(255),
    Curp VARCHAR(255),
    DomicilioEntrega VARCHAR(255),
    DomicilioAlternativo VARCHAR(255),
    ViaPrincipalDeContacto VARCHAR(255),
    DomicilioConfirmado VARCHAR(255),
    FechaValidacion DATE,
    NumeroCelular VARCHAR(50),
    TelefonoFijoUno VARCHAR(50),
    TelefonoFijoDos VARCHAR(50),
    Email VARCHAR(255),
	DomicilioPersonalPF VARCHAR(255),
	DomicilioLaboralPF VARCHAR(255),
	DomicilioFiscalPFAE VARCHAR(255),
	DomicilioPersonalPFAE VARCHAR(255),
	DomicilioLaboralPFAE VARCHAR(255),
	RazonSocial VARCHAR(255),
	DireccionComercial VARCHAR(255),
	PoderNotarial VARCHAR(255),
	PoderNotarialDetalle VARCHAR(255),
	DomicilioFiscalPM VARCHAR(255)
);

select * from InfDeudor;
-- delete from InfDeudor WHERE IdControl = '11';
-- drop table InfDeudor;

CREATE TABLE Contactos (
    IDCuenta INT NOT NULL,
    NumeroContacto INT NOT NULL,
    NombreContacto VARCHAR(255),
    DireccionContacto VARCHAR(255),
    TelefonoContacto VARCHAR(50),
    CelularContacto VARCHAR(50),
    PuestoContacto VARCHAR(255),
    EmailContacto VARCHAR(255),
    EmailContactoAdicional VARCHAR(255),
    ObservacionesContacto VARCHAR(511),
    PRIMARY KEY (IDCuenta, NumeroContacto),
    FOREIGN KEY (IDCuenta) REFERENCES InfGeneralCuenta(IDCuenta)
);
select * FROM Contactos;
delete from Contactos where IdControl='14';