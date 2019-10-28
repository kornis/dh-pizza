listado = ['mercadolibre.com','alpha.com','pepe.com'];

function agregarHttp(url) {
    return 'http://'+url;
}

function procesar(lista,funcion){
    listaNueva = [];
    for(let i =0;i<lista.length;i++)
    {
        listaNueva.push(funcion(lista[i]));
    }
    return listaNueva;
}

console.log(procesar(listado,agregarHttp));