const arregloMiembro = [
    new Miembro ('Nayib', 'De la cruz Marquez'),
    new Miembro ('Ruben Arturo', 'Canul Cordova'),
    new Miembro ('Kaleb', 'Alejandro Carrillo')
]

function mostrarMiembros(){
    let texto = ''
    for (let item of arregloMiembro){
        texto += `<li>${item.nombre} ${item.apellido}`
    }
    document.getElementById('Miembros').innerHTML = texto
}

function agregarMiembros(){
    const formulario = document.forms["formulario"]
    const nombre = formulario["nombre"]
    const apellido = formulario["apellido"]
    const objMiembro = new Miembro(nombre.value, apellido.value)
    arregloMiembro.push(objMiembro)
    mostrarMiembros()
    
}