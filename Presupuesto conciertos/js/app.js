const ingresos = [
    new Ingreso('20x Feuer Zone', 47100.00),
    new Ingreso('15x Zona General A',25200.00),
    new Ingreso('36x Zona General B',35000.00),       
    new Ingreso('10x Zona Verde A',22800.00) ,    
    new Ingreso('15x Zona Verde B',17700.00) ,    
    new Ingreso('13x Zona Verde C',8450.00) ,   
    new Ingreso('28x Zona Naranja A',38640.00) , 
    new Ingreso('23x Zona Naranja B',18400.00) , 
    new Ingreso('36x Zona Naranja C',16200.00) 
]
const egresos =[
    new Egreso('Alquiler del lugar', 890.00),
    new Egreso('Escenario', 2500.00),
    new Egreso('Servicios', 7500.00),
    new Egreso('Desecho de residuos', 12000.00),
    new Egreso('Marketing', 10000.00),
    
]
let cargarApp = ()=>{
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()

}
let totalIngresos= ()=>{
    let totalIngreso = 0
    for(let ingreso of ingresos){
        totalIngreso+= ingreso.valor
    } 
    return totalIngreso  
}
let totalEgresos= ()=>{
    let totalEgresos = 0
    for(let egreso of egresos){
        totalEgresos+= egreso.valor
    } 
    return totalEgresos
}
let cargarCabecero= ()=>{   
    let presupuesto = totalIngresos() - totalEgresos()
    let porcentajeEgreso = totalEgresos()/totalIngresos()
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto)
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso)
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos())
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos())
}
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2})
}  
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2})
}  
const cargarIngresos= ()=>{
    let ingresosHTML = ''
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso)
    }
    document.getElementById("lista-ingresos").innerHTML =  ingresosHTML
}
const cargarEgresos= ()=>{
    let egresosHTML = ''
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso)
    }
    document.getElementById("lista-egresos").innerHTML =  egresosHTML
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline"
                            onclick='eliminarIngreso(${ingreso.id})'>
                            </ion-icon>                            
                        </button>
            </div>
        </div>                
    </div>
    `
    return ingresoHTML
}
const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">                
                <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline"
                            onclick='eliminarEgreso(${egreso.id})'>
                            </ion-icon>                            
                        </button>
            </div>
        </div>                
    </div>
    `
    return egresoHTML
}

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso=>ingreso.id === id)
    ingresos.splice(indiceEliminar,1)
    cargarCabecero()
    cargarIngresos()
}
const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso=>egreso.id === id)
    egresos.splice(indiceEliminar,1)
    cargarCabecero()
    cargarEgresos()
}
let agregarDato = ()=>{
    let forma = document.forms['forma']
    let tipo = forma['tipo']
    let descripcion = forma['descripcion']
    let valor = forma['valor']
    if(descripcion.value === ''|| valor.value === ''){
        alert("Llena los dos campos")
    }else{
    if(tipo.value === "ingreso"){
        ingresos.push(new Ingreso(descripcion.value, +valor.value))
        cargarCabecero()
        cargarIngresos()
        }else{
        egresos.push(new Egreso(descripcion.value, +valor.value))
        cargarCabecero()
        cargarEgresos()
        }
    }
    document.getElementById("descripcion").value = ''
    document.getElementById("valor").value = ''
}