document.addEventListener("DOMContentLoaded", function() {
    const digiCreditoLink = document.getElementById("digiCreditoLink");
    const mainContent = document.getElementById("mainContent");
    const loginContainer = document.getElementById("loginContainer");
    const contentContainer = document.getElementById("contentContainer");
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const enviarButton = document.getElementById("enviarButton");
    const showLogButton = document.getElementById("showLogButton");
    const logContainer = document.getElementById("logContainer");
    const logList = document.getElementById("logList");
    const logoutButton = document.getElementById("logoutButton");
    const downloadLogButton = document.getElementById("downloadLogButton");
    const digiCreditoForm = document.getElementById("digiCreditoForm");
    const instanciaSelect = document.getElementById("instancia");
    const numeroIdentificacionInput = document.getElementById("numeroIdentificacion");
    const oficinaInput = document.getElementById("oficinaInput");
    const pagaduriaInput = document.getElementById("pagaduriaInput");
    const planSeguroSelect = document.getElementById("planSeguro");
    const lineaCreditoSelect = document.getElementById("lineaCredito");

    let formLog = [];

    // Ocultar contenido de DIGICREDITO y mostrar formulario de inicio de sesión por defecto
    contentContainer.style.display = "none";
    loginContainer.style.display = "block";
    logContainer.style.display = "none";

    // Event listener para el formulario de inicio de sesión
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Verificar credenciales de inicio de sesión
        if (username === "jtellez@excelcredit.co" && password === "Suaita01") {
            // Mostrar contenido de DIGICREDITO
            console.log("Inicio de sesión exitoso");
            contentContainer.style.display = "block";
            loginContainer.style.display = "none";
            // Resetear formulario de inicio de sesión
            loginForm.reset();
        } else {
            // Mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.',
            });
        }
    });

    digiCreditoLink.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("Navegando a DIGICREDITO");
        animationContainer.style.display = "none";
        mainContent.style.display = "block";
        digiCreditoForm.reset();
    });

    enviarButton.addEventListener("click", function() {
        let valid = true;
        let errorMessage = "";

        // Validar la instancia
        if (!instanciaSelect.value) {
            valid = false;
            errorMessage += "Por favor selecciona una instancia.\n";
        }

        if (valid) {
            Swal.fire({
                icon: 'success',
                title: 'Formulario enviado',
                text: '¡Gracias por completar el formulario!',
            }).then(() => {
                // Log the form data
                const formData = {
                    fecha: new Date().toLocaleString(),
                    instancia: instanciaSelect.value,
                    numeroIdentificacion: numeroIdentificacionInput.value,
                    oficina: oficinaInput.value,
                    pagaduria: pagaduriaInput.value,
                    planSeguro: planSeguroSelect.value,
                    lineaCredito: lineaCreditoSelect.value,
                };
                formLog.push(formData);
                digiCreditoForm.reset();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error en el formulario',
                text: errorMessage,
            });
        }
    });

    showLogButton.addEventListener("click", function() {
        logList.innerHTML = '';
        formLog.forEach((log, index) => {
            const logItem = document.createElement("li");
            logItem.textContent = `Formulario ${index + 1}: Fecha: ${log.fecha}, Instancia: ${log.instancia}, Identificación: ${log.numeroIdentificacion}, Oficina: ${log.oficina}, Pagaduría: ${log.pagaduria}, Plan Seguro: ${log.planSeguro}, Línea de Crédito: ${log.lineaCredito}`;
            logList.appendChild(logItem);
        });
        logContainer.style.display = "block";
    });

    downloadLogButton.addEventListener("click", function() {
        const ws = XLSX.utils.json_to_sheet(formLog);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Log");

        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        const fileName = `log_automatizador_${dateString}.xlsx`;

        XLSX.writeFile(wb, fileName);
    });

    oficinaInput.addEventListener("input", function() {
        const filtro = oficinaInput.value.toLowerCase();
        filtrarYMostrar(oficinaSelect, filtro);
    });

    pagaduriaInput.addEventListener("input", function() {
        const filtro = pagaduriaInput.value.toLowerCase();
        filtrarYMostrar(pagaduriaSelect, filtro);
    });

    function filtrarYMostrar(selectElement, filtro) {
        selectElement.style.display = "block";
        Array.from(selectElement.options).forEach(option => {
            if (filtro === '' || option.textContent.toLowerCase().includes(filtro)) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });
    }

    oficinaSelect.addEventListener("change", function() {
        oficinaInput.value = oficinaSelect.value;
        oficinaSelect.style.display = "none";
    });

    pagaduriaSelect.addEventListener("change", function() {
        pagaduriaInput.value = pagaduriaSelect.value;
        pagaduriaSelect.style.display = "none";
    });
});
