const formulario =
            document.getElementById("formularioPresupuesto");

        const producto =
            document.getElementById("producto");

        const plazo =
            document.getElementById("plazo");

        const extras =
            document.querySelectorAll('input[name="extras"]');

        const presupuesto =
            document.getElementById("presupuesto");

        const descuentoTexto =
            document.getElementById("descuento");

        const mensajeFormulario =
            document.getElementById("mensajeFormulario");

        const errorProducto =
            document.getElementById("errorProducto");

        const errorPlazo =
            document.getElementById("errorPlazo");

        const errorCondiciones =
            document.getElementById("errorCondiciones");


        function calcularPresupuesto() {

            const opcionProducto =
                producto.options[producto.selectedIndex];

            const precioProducto =
                Number(opcionProducto.dataset.precio);

            let precioExtras = 0;

            extras.forEach(function(extra) {
                if (extra.checked) {
                    precioExtras += Number(extra.dataset.precio);
                }
            });

            const subtotal =
                precioProducto + precioExtras;

            const meses =
                Number(plazo.value);

            let porcentajeDescuento = 0;

            if (meses >= 7) {
                porcentajeDescuento = 10;
            } else if (meses >= 4) {
                porcentajeDescuento = 5;
            }

            const cantidadDescuento =
                subtotal * porcentajeDescuento / 100;

            const precioFinal =
                subtotal - cantidadDescuento;

            descuentoTexto.textContent =
                porcentajeDescuento + "%";

            presupuesto.textContent =
                precioFinal.toFixed(2) + " €";
        }


        producto.addEventListener(
            "change",
            calcularPresupuesto
        );

        plazo.addEventListener(
            "input",
            calcularPresupuesto
        );

        extras.forEach(function(extra) {
            extra.addEventListener(
                "change",
                calcularPresupuesto
            );
        });


        formulario.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                const nombre =
                    document.getElementById("nombre").value.trim();

                const apellidos =
                    document.getElementById("apellidos").value.trim();

                const telefono =
                    document.getElementById("telefono").value.trim();

                const email =
                    document.getElementById("email").value.trim();

                let formularioValido = true;

                const soloLetras =
                    /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;

                const soloNumeros =
                    /^[0-9]{9}$/;

                const formatoEmail =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                document.getElementById("errorNombre").textContent = "";
                document.getElementById("errorApellidos").textContent = "";
                document.getElementById("errorTelefono").textContent = "";
                document.getElementById("errorEmail").textContent = "";
                errorProducto.textContent = "";
                errorPlazo.textContent = "";
                errorCondiciones.textContent = "";

                mensajeFormulario.textContent = "";
                mensajeFormulario.className = "mensaje-formulario";


                if (
                    nombre === "" ||
                    nombre.length > 15 ||
                    !soloLetras.test(nombre)
                ) {
                    document.getElementById("errorNombre").textContent =
                        "El nombre debe contener solo letras y tener máximo 15 caracteres.";

                    formularioValido = false;
                }


                if (
                    apellidos === "" ||
                    apellidos.length > 40 ||
                    !soloLetras.test(apellidos)
                ) {
                    document.getElementById("errorApellidos").textContent =
                        "Los apellidos deben contener solo letras y tener máximo 40 caracteres.";

                    formularioValido = false;
                }


                if (!soloNumeros.test(telefono)) {
                    document.getElementById("errorTelefono").textContent =
                        "El teléfono debe contener exactamente 9 números.";

                    formularioValido = false;
                }


                if (!formatoEmail.test(email)) {
                    document.getElementById("errorEmail").textContent =
                        "Introduce un correo electrónico válido.";

                    formularioValido = false;
                }


                if (producto.value === "") {
                    errorProducto.textContent =
                        "Selecciona un producto.";

                    formularioValido = false;
                }

                if (plazo.value === "" || Number(plazo.value) < 1) {
                    errorPlazo.textContent =
                        "Indica un plazo válido de al menos 1 mes.";

                    formularioValido = false;
                }

                if (!document.getElementById("condiciones").checked) {
                    errorCondiciones.textContent =
                        "Debes aceptar las condiciones de privacidad.";

                    formularioValido = false;
                }


                if (formularioValido) {

                    mensajeFormulario.textContent =
                        "El presupuesto se ha enviado correctamente.";

                    mensajeFormulario.classList.add(
                        "mensaje-exito"
                    );

                    formulario.reset();

                    calcularPresupuesto();

                } else {

                    mensajeFormulario.textContent =
                        "Revisa los campos del formulario antes de enviarlo.";

                    mensajeFormulario.classList.add(
                        "mensaje-error"
                    );
                }
            }
        );


        formulario.addEventListener(
            "reset",
            function() {

                setTimeout(function() {

                    descuentoTexto.textContent = "0%";
                    presupuesto.textContent = "0,00 €";

                }, 0);
            }
        );


        calcularPresupuesto();
