let botonseleccionado = 0;

window.onload = function () {

    document.getElementById("cmdverificar").disabled = true;
    document.getElementById("cmdgenerar").disabled = true;
    document.getElementById("cmdborrar").disabled = true;

    document.getElementById("txtoct1").disabled = true;
    document.getElementById("txtoct2").disabled = true;
    document.getElementById("txtoct3").disabled = true;
    document.getElementById("txtoct4").disabled = true;
    document.getElementById("txtsub").disabled = true;
};

function cmdclaseA_Click(){

    habilitarOctetos();

    botonseleccionado = 1;

    document.getElementById("cmdverificar").disabled = false;
    document.getElementById("cmdclaseB").disabled = true;
    document.getElementById("cmdclaseC").disabled = true;
    document.getElementById("cmdborrar").disabled = false;

    document.getElementById("lbldesde").innerText = "0.0.0.0";
    document.getElementById("lblhasta").innerText = "127.255.255.255";
}

function cmdclaseB_Click(){

    habilitarOctetos();

    botonseleccionado = 2;

    document.getElementById("cmdverificar").disabled = false;
    document.getElementById("cmdclaseA").disabled = true;
    document.getElementById("cmdclaseC").disabled = true;
    document.getElementById("cmdborrar").disabled = false;

    document.getElementById("lbldesde").innerText = "128.0.0.0";
    document.getElementById("lblhasta").innerText = "191.255.255.255";
}

function cmdclaseC_Click(){

    habilitarOctetos();

    botonseleccionado = 3;

    document.getElementById("cmdverificar").disabled = false;
    document.getElementById("cmdclaseA").disabled = true;
    document.getElementById("cmdclaseB").disabled = true;
    document.getElementById("cmdborrar").disabled = false;

    document.getElementById("lbldesde").innerText = "192.0.0.0";
    document.getElementById("lblhasta").innerText = "223.255.255.255";
}

function habilitarOctetos(){
    document.getElementById("txtoct1").disabled = false;
    document.getElementById("txtoct2").disabled = false;
    document.getElementById("txtoct3").disabled = false;
    document.getElementById("txtoct4").disabled = false;
}

function verificarIP()
{
    let o1 = parseInt(document.getElementById("txtoct1").value);
    let o2 = parseInt(document.getElementById("txtoct2").value);
    let o3 = parseInt(document.getElementById("txtoct3").value);
    let o4 = parseInt(document.getElementById("txtoct4").value);

    let errores = [];

    if (isNaN(o1) || o1 < 0 || o1 > 255) {
        errores.push("Primer octeto (" + o1 + ")");
        document.getElementById("txtoct1").value = "";
    }

    if (isNaN(o2) || o2 < 0 || o2 > 255) {
        errores.push("Segundo octeto (" + o2 + ")");
        document.getElementById("txtoct2").value = "";
    }

    if (isNaN(o3) || o3 < 0 || o3 > 255) {
        errores.push("Tercer octeto (" + o3 + ")");
        document.getElementById("txtoct3").value = "";
    }

    if (isNaN(o4) || o4 < 0 || o4 > 255) {
        errores.push("Cuarto octeto (" + o4 + ")");
        document.getElementById("txtoct4").value = "";
    }

    if (errores.length > 0) {

        let mensaje = "Los siguientes octetos están fuera del rango permitido (0 - 255):\n\n";

        for (let i = 0; i < errores.length; i++) {
            mensaje += errores[i] + "\n";
        }

        alert(mensaje);
        return;
    }

    // Validar la clase seleccionada
    if (botonseleccionado === 1) {

        if (o1 < 0 || o1 > 127) {
            alert("La IP ingresada no pertenece a la Clase A");
            return;
        }

    } else if (botonseleccionado === 2) {

        if (o1 < 128 || o1 > 191) {
            alert("La IP ingresada no pertenece a la Clase B");
            return;
        }

    } else if (botonseleccionado === 3) {

        if (o1 < 192 || o1 > 223) {
            alert("La IP ingresada no pertenece a la Clase C");
            return;
        }
    }

    alert("IP Verificada Correctamente");

    document.getElementById("cmdgenerar").disabled = false;
    document.getElementById("txtsub").disabled = false;
}

function cmdgenerar_Click() {

    let o1 = parseInt(document.getElementById("txtoct1").value);
    let o2 = parseInt(document.getElementById("txtoct2").value);
    let o3 = parseInt(document.getElementById("txtoct3").value);
    let o4 = parseInt(document.getElementById("txtoct4").value);
    let subredes = parseInt(document.getElementById("txtsub").value);

    if (isNaN(subredes) || subredes <= 0) {
        alert("Ingrese el número de subredes");
        return;
    }

    limpiarListas();

    let bits = 0;

    while (Math.pow(2, bits) < subredes) {
        bits++;
    }

    let salto = 256 / Math.pow(2, bits);

    for (let i = 0; i < subredes; i++) {

        agregarLista("listIP", i + 1);

        // ===== CLASE A =====
        if (botonseleccionado === 1) {

            let red = i * salto;

            agregarLista(
                "listdireccionip",
                `${o1}.${red}.0.0`
            );

            agregarLista(
                "listMS",
                `${o1}.${red}.0.1`
            );

            agregarLista(
                "listPE",
                `${o1}.${red + salto - 1}.255.254`
            );

            agregarLista(
                "listbro",
                `${o1}.${red + salto - 1}.255.255`
            );
        }

        // ===== CLASE B =====
        else if (botonseleccionado === 2) {

            let red = i * salto;

            agregarLista(
                "listdireccionip",
                `${o1}.${o2}.${red}.0`
            );

            agregarLista(
                "listMS",
                `${o1}.${o2}.${red}.1`
            );

            agregarLista(
                "listPE",
                `${o1}.${o2}.${red + salto - 1}.254`
            );

            agregarLista(
                "listbro",
                `${o1}.${o2}.${red + salto - 1}.255`
            );
        }

        // ===== CLASE C =====
        else if (botonseleccionado === 3) {

            let red = i * salto;

            agregarLista(
                "listdireccionip",
                `${o1}.${o2}.${o3}.${red}`
            );

            agregarLista(
                "listMS",
                `${o1}.${o2}.${o3}.${red + 1}`
            );

            agregarLista(
                "listPE",
                `${o1}.${o2}.${o3}.${red + salto - 2}`
            );

            agregarLista(
                "listbro",
                `${o1}.${o2}.${o3}.${red + salto - 1}`
            );
        }
    }

    document.getElementById("txtsub").disabled = true;
    document.getElementById("cmdgenerar").disabled = true;
}

function agregarLista(id, valor) {
    let lista = document.getElementById(id);
    let item = document.createElement("option");
    item.text = valor;
    lista.add(item);
}

function limpiarListas() {
    document.getElementById("listIP").innerHTML = "";
    document.getElementById("listdireccionip").innerHTML = "";
    document.getElementById("listMS").innerHTML = "";
    document.getElementById("listPE").innerHTML = "";
    document.getElementById("listbro").innerHTML = "";
}
function borrar(){

    botonseleccionado = 0;

    // Limpiar octetos
    document.getElementById("txtoct1").value = "";
    document.getElementById("txtoct2").value = "";
    document.getElementById("txtoct3").value = "";
    document.getElementById("txtoct4").value = "";
    document.getElementById("txtsub").value = "";

    // Limpiar listas
    limpiarListas();

    // Habilitar botones de clase
    document.getElementById("cmdclaseA").disabled = false;
    document.getElementById("cmdclaseB").disabled = false;
    document.getElementById("cmdclaseC").disabled = false;

    // Deshabilitar controles
    document.getElementById("cmdverificar").disabled = true;
    document.getElementById("cmdgenerar").disabled = true;
    document.getElementById("txtsub").disabled = true;

    document.getElementById("txtoct1").disabled = true;
    document.getElementById("txtoct2").disabled = true;
    document.getElementById("txtoct3").disabled = true;
    document.getElementById("txtoct4").disabled = true;

    // Limpiar rango mostrado
    document.getElementById("lbldesde").innerText = "";
    document.getElementById("lblhasta").innerText = "";
}