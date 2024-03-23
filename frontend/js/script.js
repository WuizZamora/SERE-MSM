// VALIDACION CAMPOS
(function () {
  "use strict";
  window.addEventListener(
    "DOMContentLoaded",
    function () {
      var forms = document.querySelectorAll(".needs-validation");
      Array.prototype.forEach.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

// Agregamos un listener para el evento "input" en los campos de entrada
document.getElementById("NoClientePadre").addEventListener("input", function () {
  // Removemos cualquier caracter que no sea un número
  this.value = this.value.replace(/[^\d]/, '');
});

document.getElementById("NoClienteHijo").addEventListener("input", function () {
  // Removemos cualquier caracter que no sea un número
  this.value = this.value.replace(/[^\d]/, '');
});

 // Función para validar y limitar la entrada a números y 10 dígitos
 function validarNumerosDiezDigitos(input, avisoId) {
  input.value = input.value.replace(/[^\d]/, ''); // Remover caracteres no numéricos
  const aviso = document.getElementById(avisoId);
  if (input.value.length < 10 && input.value.length > 0) {
      aviso.textContent = "El número debe tener 10 dígitos";
  } else {
      aviso.textContent = "";
  }
  if (input.value.length > 10) {
      input.value = input.value.slice(0, 10); // Limitar la longitud a 10 dígitos
  }
}

// Agregar listeners para los eventos "input" en los campos
document.getElementById("NumeroCelular").addEventListener("input", function() {
  validarNumerosDiezDigitos(this, "avisoCelular");
});

document.getElementById("TelefonoFijoUno").addEventListener("input", function() {
  validarNumerosDiezDigitos(this, "avisoFijoUno");
});

document.getElementById("TelefonoFijoDos").addEventListener("input", function() {
  validarNumerosDiezDigitos(this, "avisoFijoDos");
});
//VALIDAR EMAIL
document.getElementById("Email").addEventListener("input", function() {
  if (this.value.trim() !== "") { // Solo validar si hay una entrada
    validarCorreoElectronico();
  } else {
    clearEmailValidation();
  }
});

function validarCorreoElectronico() {
  var email = document.getElementById("Email").value;
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let resultado = document.getElementById("resultado");
  if (regex.test(email)) {
    document.getElementById("Email").classList.remove("is-invalid");
    resultado.textContent = "";
  } else {
    document.getElementById("Email").classList.add("is-invalid");
    resultado.textContent = "El correo electrónico ingresado no es válido. Verifica el formato.";
  }
}

function clearEmailValidation() {
  document.getElementById("Email").classList.remove("is-invalid");
  document.getElementById("resultado").textContent = "";
}

function mostrarCampoDetalle() {
  var seleccion = document.getElementById("PoderNotarial").value;
  var campoAdicional = document.getElementById("campoDetalle");
  var inputDetalle = document.getElementById("PoderNotarialDetalle");

  if (seleccion === "Si") {
    campoAdicional.style.display = "flex";
    inputDetalle.required = true;
    inputDetalle.value = ""; // Limpiar el valor del campo de texto
  } else {
    campoAdicional.style.display = "none";
    inputDetalle.required = false;
    inputDetalle.value = "No Aplica por la seleccion"; // Asignar el valor predeterminado
  }
}

function mostrarCamposSegunRegimen() {
  // Restablecer campos requeridos a false
  var campos = [
    "RazonSocial",
    "DireccionComercial",
    "PoderNotarial",
    "DomicilioFiscalPM",
    "DomicilioPersonalPF",
    "DomicilioLaboralPF",
    "DomicilioFiscalPFAE",
    "DomicilioPersonalPFAE",
    "DomicilioLaboralPFAE",
  ];
  campos.forEach(function (campo) {
    document.getElementById(campo).required = false;
  });

  var regimen = document.getElementById("RegimenDeudor").value;

  var camposPersonaMoral = document.getElementById("camposPersonaMoral");
  var camposPersonaFisica = document.getElementById("camposPersonaFisica");
  var camposPersonaFisActEmp = document.getElementById(
    "camposPersonaFisicaActEmp"
  );

  if (regimen === "Persona Moral") {
    camposPersonaMoral.style.display = "flex";
    camposPersonaFisica.style.display = "none";
    camposPersonaFisActEmp.style.display = "none";
    // Agregar atributos required
    document.getElementById("RazonSocial").required = true;
    document.getElementById("DireccionComercial").required = true;
    document.getElementById("PoderNotarial").required = true;
    document.getElementById("DomicilioFiscalPM").required = true;
  } else if (regimen === "Persona Fisica") {
    camposPersonaMoral.style.display = "none";
    camposPersonaFisica.style.display = "flex";
    camposPersonaFisActEmp.style.display = "none";
    // Agregar atributos required
    document.getElementById("DomicilioPersonalPF").required = true;
    document.getElementById("DomicilioLaboralPF").required = true;
  } else if (regimen === "Persona Fisica con Actividad Empresarial") {
    camposPersonaMoral.style.display = "none";
    camposPersonaFisica.style.display = "none";
    camposPersonaFisActEmp.style.display = "flex";
    // Agregar atributos required
    document.getElementById("DomicilioFiscalPFAE").required = true;
    document.getElementById("DomicilioPersonalPFAE").required = true;
    document.getElementById("DomicilioLaboralPFAE").required = true;
  }
}

function mostrarCampoFechaValidacion() {
  var DomicilioVerificado = document.getElementById(
    "DomicilioConfirmado"
  ).value;
  var campoFecha = document.getElementById("campoFechaValidacion");
  var inputFecha = document.getElementById("FechaValidacion");

  if (DomicilioVerificado === "Si") {
    campoFecha.style.display = "flex";
    inputFecha.required = true;
    inputFecha.value = ""; // Limpiar el valor del campo de fecha
  } else {
    campoFecha.style.display = "none";
    inputFecha.required = false;
  }
}


document.addEventListener("DOMContentLoaded", function () {
  var tipoGarantiaSelect = document.getElementById("TipoGarantia");
  var campoOtros = document.getElementById("campoOtros");

  tipoGarantiaSelect.addEventListener("change", function () {
    if (tipoGarantiaSelect.value === "Otros") {
      campoOtros.style.display = "flex";
    } else {
      campoOtros.style.display = "none";
    }
  });
});

function mostrarCampoTipoGarantia() {
  var seleccionTipoDeuda = document.getElementById("TipoDeuda").value;
  var campoAdicionalTipoGarantia = document.getElementById("CampoTipoGarantia");

  if (seleccionTipoDeuda === "Garantizada") {
    campoAdicionalTipoGarantia.style.display = "flex";
  } else {
    campoAdicionalTipoGarantia.style.display = "none";
  }
}

function mostrarCampoEstadoDeCuenta() {
  var seleccionEstadoDeCuenta = document.getElementById("EstadoDeCuenta").value;
  var campoAdicionalEstadoDeCuenta = document.getElementById(
    "CampoEstadoDeCuenta"
  );

  if (seleccionEstadoDeCuenta === "Si") {
    campoAdicionalEstadoDeCuenta.style.display = "flex";
  } else {
    campoAdicionalEstadoDeCuenta.style.display = "none";
  }
}
function agregarFilaPagares() {
  var table = document.getElementById("dataTablePagares");
  var rowCount = table.rows.length;

  var row = table.insertRow(rowCount);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  cell1.innerHTML = rowCount;
  cell2.innerHTML =
    '<input type="date" class="form-control text-center" id="FechaVencimientoPagares' +
    rowCount +
    '" required>';
  cell3.innerHTML =
    '<input type="date" class="form-control text-center " id="FechaPrescripcionPagares' +
    rowCount +
    '" required>';
  cell4.innerHTML =
    '<input type="number" class="form-control text-center" id="MontoPagares' +
    rowCount +
    '" required>';
  cell5.innerHTML =
    '<input type="text" class="form-control text-center" id="Moneda' +
    rowCount +
    '" maxlength="10" required>';
  cell6.innerHTML =
    '<input type="number" class="form-control text-center" id="MontoPesosAproximado' +
    rowCount +
    '" maxlength="10" required>';
}

function agregarFilaDocumentosExtras() {
  var table = document.getElementById("dataTableDocumentosExtras");
  var rowCount = table.rows.length;

  var row = table.insertRow(rowCount);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3); // Corregir la posición a 3

  cell1.innerHTML = rowCount;
  cell2.innerHTML =
    '<input type="text" class="form-control text-center" id="DescripcionArchivoExtra' +
    rowCount +
    '" required>';
  cell3.innerHTML =
    '<input type="file" class="form-control text-center " id="ArchivoExtra' +
    rowCount +
    '" required>';
  var selectOptions =
    '<select class="form-select" name="ModoEntregaArchivoExtra' +
    rowCount +
    '" id="ModoEntregaArchivoExtra' +
    rowCount +
    '" required>' +
    '<option selected disabled value=""></option>' +
    '<option value="Original">ORIGINAL</option>' +
    '<option value="Copia">COPIA</option>' +
    '<option value="Electronico">ELECTRONICO</option>' +
    "</select>";

  cell4.innerHTML = selectOptions;
}
