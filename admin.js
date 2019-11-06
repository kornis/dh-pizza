const fs = require('fs');

const path = __dirname + '/pedidos.json';
const contFile = fs.readFileSync(path,'utf8');
let pizzaMuzza = 0;
let pizzaNapo = 0;
let pizzaJYM = 0;
let pizzaGrande = 0;
let pizzaMediana = 0;
let pizzaPersonal = 0;
let paraLlevar = 0;
let bebidas = 0;
let clienteHabitual = 0;
let contenidoRepote;
let pedidos = contFile.length > 0 ? JSON.parse(contFile) : null;


//let pizza_muzza = pedidos.filter(pedido => pedido.gustoPizza == 'Muzza');

//Lo hice de esta forma para probar cambiar con lo que se hizo en clase
//Aunque quiza el .filter sea mas eficiente

for(pedido of pedidos)
{ 
    switch(pedido.gustoPizza)
    {
        case 'Muzza':
            pizzaMuzza++;
            break;
        case 'Napo':
            pizzaNapo++;
            break;
        case 'Jamon y Morrones':
            pizzaJYM++;
            break;
    }
    switch(pedido.tipoPizza)
    {
        case 'Grande':
            pizzaGrande++;
            break;
        case 'Mediana':
            pizzaMediana++;
            break;
        case 'Personal':
            pizzaPersonal++;
            break;    
    }
    if(pedido.paraLlevar)
    {
        paraLlevar ++;
    }
    if(pedido.bebida)
    {
        bebidas++;
    }
    if(pedido.clienteHabitual)
    {
        clienteHabitual++;
    }
}
let fecha = new Date().toLocaleDateString();
let hora = new Date().toLocaleTimeString();

console.log('¡Reporte generado con éxito!');
console.log('\n|===*** Reporte de ventas ***====|');
console.log('Fecha de generacion: ' + fecha);
console.log('Hora: ' + hora);
console.log('\n|===*** Cantidad de pedidos realizados ***====|');
console.log('Total: '+pedidos.length);
console.log('\n|===*** Cantidad de pedidos para delivery ***====|');
console.log('Total: ' + paraLlevar);
console.log('\n|===*** Cantidad de pizzas vendidas por gusto ***====|');
console.log('Total Muzzarella: ' + pizzaMuzza);
console.log('Total Jamon y Morron: ' + pizzaJYM);
console.log('Total Napolitana: ' + pizzaNapo);
console.log('\n|===*** Cantidad de pizzas vendidas por tamaño ***====|');
console.log('Total Personal: ' + pizzaPersonal);
console.log('Total Mediana: ' + pizzaMediana);
console.log('Total Grande: ' + pizzaGrande);
console.log('\n|===*** Cantidad de pedidos con bebida ***====|');
console.log('Total: ' + bebidas);
console.log('\n|===*** Cantidad de clientes habituales ***====|');
console.log('Total: ' + clienteHabitual);
console.log('\n|===*** Cantidad de empanadas regaladas ***====|');
console.log('Total: ' + (clienteHabitual*3));

contenidoReporte = 
`
¡Reporte generado con éxito!
\n|===*** Reporte de ventas ***====|
Fecha de generacion: ${fecha}
Hora: ${hora}
\n|===*** Cantidad de pedidos realizados ***====|
Total: ${pedidos.length}
\n|===*** Cantidad de pedidos para delivery ***====|
Total: ${paraLlevar}
Total Muzzarella: ${pizzaMuzza}
\n|===*** Cantidad de pizzas vendidas por gusto ***====|
Total Jamon y Morron: ${pizzaJYM}
Total Napolitana: ${pizzaNapo}
\n|===*** Cantidad de pizzas vendidas por tamaño ***====|
Total Personal: ${pizzaPersonal}
Total Mediana: ${pizzaMediana}
Total Grande: ${pizzaGrande}
\n|===*** Cantidad de pedidos con bebida ***====|
Total: ${bebidas}
\n|===*** Cantidad de clientes habituales ***====|
Total: ${clienteHabitual}
\n|===*** Cantidad de empanadas regaladas ***====|
Total: ${(clienteHabitual*3)}
`;

hora = hora.replace(/:/g,"");
let pathReporte = __dirname + '\\'+'reporte-'+fecha+'-'+hora+'.txt';

fs.writeFileSync(pathReporte,contenidoReporte);

