const botoncito = document.getElementById('boton');

let paginaActual = 1;
let totalPaginas = 12;

const opciones = {
    method: 'GET',
    headers: {
        'accept': '*/*'
    }
};

function cambiarPagina(pagina){

    let urldragon = `https://dragonball-api.com/api/characters?page=${pagina}&limit=5`;

    fetch(urldragon, opciones)
    .then(response => {

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        const contenedor = document.getElementById("card-container");

        paginaActual = pagina; // Actualizar la página actual
        totalPaginas = data.meta.totalPages; // Actualizar el total de páginas

        botoncito.textContent = '';
        contenedor.textContent = '';
        
        let boton1 = document.createElement('button');
        boton1.textContent = "Anterior";
        boton1.disabled = paginaActual === 1;
        boton1.addEventListener('click', () => {
            if (paginaActual > 1) cambiarPagina(paginaActual - 1);
        });
        botoncito.appendChild(boton1);


        for (let i = 1; i<totalPaginas+1; i++ ){
            let botones = document.createElement('button');
                botones.textContent = i;
                botones.id = i;
                botones.disabled = i === paginaActual;
                
                botones.addEventListener('click', () => cambiarPagina(i));
                botoncito.appendChild(botones);

            botoncito.appendChild(botones);
        };

            let boton2 = document.createElement('button');

            boton2.textContent = "Siguiente";
            boton2.disabled = paginaActual === totalPaginas;

            boton2.addEventListener('click', () => {
                if (paginaActual < totalPaginas) cambiarPagina(paginaActual + 1);
            });
            botoncito.appendChild(boton2);

            data.items.forEach(personaje => {
                const card = document.createElement("div");
                card.classList.add("card");

                let img = document.createElement('img');
                img.src = personaje.image;
                let div1 = document.createElement("div");
                div1.classList.add("otroDiv");
                let h3 = document.createElement('h3');
                h3.textContent = personaje.name;
                let h4 = document.createElement('h4');
                h4.textContent = `${personaje.race} - ${personaje.gender}`;
                let p = document.createElement('p');
                p.textContent = "Base ki:";
                let h1 = document.createElement('h4');
                h1.textContent = personaje.ki;
                let titulo2 = document.createElement('p');
                titulo2.textContent = "Total Ki:";
                let titulo3 = document.createElement('h4');
                titulo3.textContent = personaje.maxKi;
                let titulo4 = document.createElement('p');
                titulo4.textContent = "Afiliación:";
                let titulo5 = document.createElement('h4');
                titulo5.textContent = personaje.affiliation;
                let buton = document.createElement('a');
                buton.href = `otroindex.html?id=${personaje.id}`;
                buton.classList.add('btn', 'btn-primary');
                buton.textContent = "Transformaciones";

                card.appendChild(img);
                div1.appendChild(h3);
                div1.appendChild(h4);
                div1.appendChild(p);
                div1.appendChild(h1);
                div1.appendChild(titulo2);
                div1.appendChild(titulo3);
                div1.appendChild(titulo4);
                div1.appendChild(titulo5);
                div1.appendChild(buton);
                card.appendChild(div1);
                contenedor.appendChild(card);
            });

        console.log('Personajes:', data);
    })
    .catch(error => {
        console.error('Error al obtener los personajes:', error.message);
    })
    .finally(() => {
        console.log("Petición de dragon ball finalizada");
    });
};

cambiarPagina(paginaActual);
