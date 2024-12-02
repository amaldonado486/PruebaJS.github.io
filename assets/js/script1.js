//import { mindicador } from 'mindicador'
var monedas = []
var monto = document.querySelector("#montoCLPZ")
var selectedMoneda = document.querySelector("#monedas")
var ResConvert = document.querySelector("#resultado")
const btnBuscar = document.querySelector("#btnBuscar")


async function getConexion(){
    try
    {
        const res = await fetch("https://mindicador.cl/api/")
        let data = await res.json()
        return data;
        
    }catch(error){
        return null;
    }
}

async function RenderMonedas()
{

    try{
        
        const res = await fetch("https://mindicador.cl/api/")
        var data = await res.json()   
        
    }catch(error){
        data= null
    }

    //llenar arreglo
    var html=""

    if (data!=null){
        monedas.push(data.uf)
        monedas.push(data.dolar)
        monedas.push(data.euro)

        console.log(monedas)
   
        for (let mon of monedas ) {
            html+= `<option value="${mon.codigo}">${mon.nombre}</option>`
        }
        selectedMoneda.innerHTML = html
    }
            
}

RenderMonedas()

btnBuscar.addEventListener("click", () => {
    const montoinput = monto.value
    const seleccion = selectedMoneda.value;
    const nf = new Intl.NumberFormat("es-CL");
    try{

        var getId = monedas.findIndex((moneda) =>(moneda.codigo == seleccion))
        var valor = monedas[getId].valor
        
        if ((montoinput!="") && (!isNaN(montoinput))){
            resultado=  parseInt(montoinput) * valor
        }

    }catch(error){
        console.log(error)
        resultado=0; 
    }

    ResConvert.innerHTML=  nf.format(resultado)   
    }    
)

//https://api.gael.cloud/general/public/monedas

async function getMonedas() {
    const endpoint = "https://api.gael.cloud/general/public/monedas";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}
    

function prepararConfiguracionParaLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.map((moneda) => moneda.Codigo);
    const titulo = "Monedas";
    const colorDeLinea = "red";
    const valores = monedas.map((moneda) => {
    const valor = moneda.Valor.replace(",", ".");
    return Number(valor);
    });
    const config = {
        type: tipoDeGrafica,
        data: {
        labels: nombresDeLasMonedas,
        datasets: [
            {
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores
            }
        ]
        }
    };
    return config;
}        

async function renderGrafica() {
    
    const monedas = await getMonedas();
    console.log('new arreglo ', monedas);
    const config = prepararConfiguracionParaLaGrafica(monedas);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
}

renderGrafica()