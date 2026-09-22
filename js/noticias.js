async function cargarNoticias() {
            const contenedor = document.getElementById("lista-noticias");

            try {
                const respuesta = await fetch("./noticias.json");

                if (!respuesta.ok) {
                    throw new Error("Error HTTP: " + respuesta.status);
                }

                const noticias = await respuesta.json();

                console.log("Noticias cargadas:", noticias);

                contenedor.innerHTML = "";

                noticias.forEach(noticia => {
                    const articulo = document.createElement("article");
                    articulo.className = "noticia";

                    articulo.innerHTML = `
                        <img src="${noticia.image}" alt="${noticia.title}">

                        <div class="noticia-contenido">
                            <h3>${noticia.title}</h3>

                            <p class="noticia-info">
                                ${noticia.source.name}
                            </p>

                            <p class="noticia-descripcion">
                                ${noticia.description}
                            </p>

                            <a href="${noticia.url}"
                               target="_blank"
                               rel="noopener noreferrer">
                                Leer noticia
                            </a>
                        </div>
                    `;

                    contenedor.appendChild(articulo);
                });

            } catch (error) {
                console.error("ERROR:", error);
                contenedor.innerHTML =
                    "<p>No se pudieron cargar las noticias.</p>";
            }
        }

        cargarNoticias();
