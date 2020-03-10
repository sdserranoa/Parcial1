let socket = io.connect("http://localhost:3000", { "forceNew": true });

var bloqueo = false;

socket.on("licitaciones", data => {
    render(data);
});

socket.on("licitaciones-aceptado", data => {
    bloqueo = true;
    document.getElementById("ofertarbtn").disabled = true;
});

function render(data) {
    let html = data.map((e, i) => {
        if (e.aceptada) {
            bloqueo = true;
            return (`
                <div>
                    <p>${e.razon} [<strong>Oferta aceptada. Valor: $${e.oferta}]</strong></p>
                </div>
            `);
        } else {
            return (`
                <div>
                    <p>${e.razon} [Oferta no aceptada]</>
                </div>
            `);
        }

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

    console.log("Inscrito correctamente");

    document.getElementById("myBtn").disabled = true;
    if(!bloqueo){
        document.getElementById("ofertarbtn").disabled = false;
    }
    document.getElementById("nit").disabled = true;
    document.getElementById("razonsocial").disabled = true;

    return false;
}

function addOferta() {
    console.log("Ofertando");
    let oferta = {
        nit: document.getElementById("nit").value,
        razon: document.getElementById("razonsocial").value,
        oferta: 0,
        aceptada: false
    }
    socket.emit("new-licitacion", oferta);

    document.getElementById("ofertarbtn").disabled = true;
    setTimeout(() => {
        if(bloqueo){
            document.getElementById("ofertarbtn").disabled = true;
        } else {
            document.getElementById("ofertarbtn").disabled = false;
        }
    }, 30000);

    return false;
}


