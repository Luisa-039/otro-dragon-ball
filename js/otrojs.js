async function obtenerPersonaje(id) {
    const url = `https://dragonball-api.com/api/characters/${id}`;

    try {
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: { 'accept': '/' }
        });

        if (!respuesta.ok) {
            console.log("Respuesta de la API:", respuesta);
            throw new Error(`HTTP: ${respuesta.status}`);
        }

        const personaje = await respuesta.json();
        const personajes2 = personaje.transformations;

        if (personajes2 == ''){
            Swal.fire({
                title: `${personaje.name} no tiene transformación`,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
        }else{
            const contenedor = document.getElementById("card-container2");

        personajes2.forEach(transformation => {
            const card = document.createElement("div");
            card.classList.add("card");

            let img = document.createElement('img');
            img.src = transformation.image;
            let div1 = document.createElement("div");
            div1.classList.add("otroDiv");
            let h4 = document.createElement('h4');
            h4.textContent = transformation.name;
            let p = document.createElement('p');
            p.textContent = `Base ki: ${transformation.ki}`;

            card.appendChild(img);
            card.appendChild(div1);
            div1.appendChild(h4);
            div1.appendChild(p);
            contenedor.appendChild(card);
        });
        };

    } catch (error) {
        console.error('Error al obtener el personaje:', error.message);

    }
}

const parametros = new URLSearchParams(window.location.search);
const personajeId = parametros.get("id");

console.log(personajeId);

if (personajeId) {
    obtenerPersonaje(personajeId);
} else {
    console.error("No se proporcionó un ID de personaje.");
}

