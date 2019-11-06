const inquirer = require('inquirer');
var fs = require('fs');
console.log('Bienvenidos a DH-Pizzas... Se tomará su pedido.');

let preguntas = [
    {
        type: 'confirm',
        name: 'paraLlevar',
        message: 'La pizza es para llegar?'
    },
    {type:'input',
     name: 'nombreCliente',
     message: 'Ingresá tu nombre',
     validate: function(value)
     {
         
         if( value.trim() == '')
         {
            return 'El nombre no puede quedar vacio';
         }
        return true;
     }
    },
    {
        type:'input',
        name: 'dirCliente',
        message: 'Ingresá domicilio',
        when: respuestas => respuestas.paraLlevar,
        validate: value => {
            if(value.trim() == '')
            {
                return 'La dirección no puede quedar vacia.';
            }
            return true;
        }
       },

       {
        type:'input',
        name: 'telefonoCliente',
        message: 'Ingresá tu numero de telefono',
        validate: value => {
           
            if(value.trim() =='')
            {
                return 'EL telefono no puede quedar vacío';
            }
            if(isNaN(value) || value.length <8)
            {
                return 'Ingrese un numero valido y mayor a 8 caracteres';
            }
            return true;
        }
       },
    
    {
     type:'rawlist',
     name: 'gustoPizza',
     message: 'Elegí el gusto de la pizza',
     choices: ['Muzza','Napo','Jamon y Morrones']
    },
    {type:'list',
     name: 'tipoPizza',
     message: 'Elegí el tamaño de la pizza',
     choices: ['Grande','Mediana','Personal']
    },
    {
        type: 'confirm',
        name: 'queresBebida',
        message: '¿Queres agregar alguna bebida?',
    },
    {
     type:'list',
     name: 'bebida',
     message: 'Elegí el gusto de la bebida',
     choices: ['Pepsi','Mirinda','7Up'],
     when: function(respuestas)
        {
            return respuestas.queresBebida === true;
        }
    },
    {
        type: 'confirm',
        name: 'clienteHabitual',
        message: '¿Sos cliente habitual?',
        default: false
    },
    {
     type:'checkbox',
     name: 'saborEmpanadas',
     message: '¿Que gusto de empanadas queres?',
     choices: ['Pollo','JyQ','Choclo','Carne Suave','Carne cortada a Cuchillo','Tomate y queso'],
     when: respuestas => respuestas.clienteHabitual,
     validate: value => value.length > 3 ? 'Puede elegir hasta 3 gustos' : true,
    }
];

function ticket(respuestas)
{
    let total = 0;
    let descuento = 0;
    let totalProd = 1;
    let delivery = 0;

console.log('=== Resumen de tu pedido ===');
console.log('Tus datos son - Nombre: ' + respuestas.nombreCliente + ' | Teléfono: ' + respuestas.telefonoCliente);
if(respuestas.paraLlevar)
{
    console.log('Tu pedido será entregado en: '+ respuestas.dirCliente);
    delivery = 20;
}
else
{
    console.log('Nos indicaste que pasarás a retirar tu pedido');

}

console.log('=== Productos solicitados ===');
console.log('Pizza: ' + respuestas.gustoPizza);
switch(respuestas.tipoPizza)
{
    case 'Grande': 
    console.log('Tamaño: '+ respuestas.tipoPizza);
    total = total+650;
    break;
    case 'Mediana': 
    console.log('Tamaño: '+ respuestas.tipoPizza);
    total = total+560;
    break;
    case 'Personal': 
    console.log('Tamaño: '+ respuestas.tipoPizza);
    total = total+430;
    break;
}

if(respuestas.queresBebida)
{
    totalProd = totalProd +1;
    console.log('Bebida: '+ respuestas.bebida);
    total = total + 80;
    switch(respuestas.tipoPizza)
{
    case 'Grande': 
    
    descuento = (total *8) /100;
    break;
    case 'Mediana': 
    
    descuento = (total *5) /100;
    break;
    case 'Personal': 
    
    descuento = (total *3) /100;
    break;
}
}
if(respuestas.clienteHabitual)
{
    totalProd = totalProd + 3;
    console.log('Tus tres empanadas de regalo serán de: ');
for(let i = 0; i< respuestas.saborEmpanadas.length; i++ ){
    console.log('\t● '+ respuestas.saborEmpanadas[i]);
}
}

console.log('===============================');
console.log('Total productos: '+ totalProd +'un.');
if(delivery > 0)
{
    console.log('Total delivery: $'+ delivery)
}
 else{
    console.log('Total delivery: No delivery');
 } 
console.log('Descuentos: $' + descuento);
console.log('TOTAL: $' + (total-descuento+delivery));
console.log('===============================') 


var fecha = new Date().toLocaleString().slice(0,10);
var hora = new Date().toLocaleString().slice(11,19);
console.log('Fecha: '+fecha);
console.log('Hora: '+hora);
respuestas.totalProductos = total;
respuestas.descuento = descuento;
respuestas.fecha = fecha;
respuestas.hora = hora;


const rutaArchivo = __dirname+'\\'+ 'pedidos.json';

var infoArchivo = fs.readFileSync(rutaArchivo,'utf8');

var contenidoPedidos = infoArchivo.length == 0 ? contenidoPedidos = [] : JSON.parse(infoArchivo);

respuestas.idPedido = parseInt(contenidoPedidos.length) +1;

contenidoPedidos.push(respuestas);

fs.writeFileSync(rutaArchivo,JSON.stringify(contenidoPedidos,null," "));

}

inquirer
.prompt(preguntas)

.then(respuestas => [ticket(respuestas)]);

