let socket = io.connect("http://localhost:3000", { "forceNew": true });

socket.on("licitaciones", data => {
    document.getElementById("ofertarbtn").disabled = true;
    render(data);
});

function render(data) {
    let html = data.map((e, i) => {
        return (`
            <div>
                <p>${e.razon} ${e.oferta}</>
            </div>
        `);
    }).join(" ");
    console.log("Renderizando licitaciones");
    document.getElementById("licitaciones").innerHTML = html;
}

function addLicitacion() {
    let licitacion = {
        nit: document.getElementById("nit").value,
        razon: document.getElementById("razonsocial").value,
        oferta: 0
    };
    console.log("Emitting new licitacion");
    socket.emit("new-licitacion", licitacion);
    document.getElementById("nit").value = "";
    document.getElementById("razonsocial").value = "";

    document.getElementById("myBtn").disabled = true;
    document.getElementById("ofertarbtn").disabled = false;

    return false;
}