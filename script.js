document.addEventListener("DOMContentLoaded", () => {
    let contador = 0;
    const botonDescargar = document.getElementById("descargar");

    function crearFlor() {
        let flor = document.createElement("img");
        flor.src = "flor.png";
        flor.className = "flor";
        flor.style.left = Math.random() * window.innerWidth + "px";
        flor.style.top = "-50px";
        document.getElementById("juego").appendChild(flor);
        
        let velocidad = Math.random() * 3 + 2;
        let intervalo = setInterval(() => {
            let topPos = parseFloat(flor.style.top);
            if (topPos < window.innerHeight - 50) {
                flor.style.top = (topPos + velocidad) + "px";
            } else {
                clearInterval(intervalo);
                flor.remove();
                crearFlor();
            }
        }, 30);

        flor.addEventListener("click", () => {
            flor.remove();
            contador++;
            document.getElementById("contador").innerText = contador;
            if (contador === 10) {
                botonDescargar.style.display = "block";
            }
        });
    }

    setInterval(crearFlor, 1000);
});
