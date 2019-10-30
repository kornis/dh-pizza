const inquirer = require('inquirer');
var fs = require('fs');

let preguntas = [
    {
        type: 'confirm',
        name: 'paraLlevar',
        message: 'La pizza es para llegar?'
    },
    {type:'input',
     name: 'nombreCliente',
     message: 'Ingresá tu nombre',
     /*when: function(respuestas)
     {
         return respuestas.paraLlevar === true;
     },*/
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
        //when: respuestas => respuestas.paraLlevar,
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
    let txtString = '';

console.log('=== Resumen de tu pedido ===');
txtString = txtString + '=== Resumen de tu pedido ===\n';
console.log('Tus datos son - Nombre: ' + respuestas.nombreCliente + ' | Teléfono: ' + respuestas.telefonoCliente);
txtString = txtString + 'Tus datos son - Nombre: ' + respuestas.nombreCliente + ' | Teléfono: ' + respuestas.telefonoCliente + '\n';
if(respuestas.paraLlevar)
{
    console.log('Tu pedido será entregado en: '+ respuestas.dirCliente);
    delivery = 20;
    txtString = txtString + 'Tu pedido será entregado en: '+ respuestas.dirCliente + '\n';
}
else
{
    console.log('Nos indicaste que pasarás a retirar tu pedido');
    txtString = txtString + 'Nos indicaste que pasarás a retirar tu pedido\n';

}

console.log('=== Productos solicitados ===\n');
txtString+= '=== Productos solicitados ===\n';
console.log('Pizza: ' + respuestas.gustoPizza);
txtString+= 'Pizza: ' + respuestas.gustoPizza+'\n';
switch(respuestas.tipoPizza)
{
    case 'Grande': 
    console.log('Tamaño: '+ respuestas.tipoPizza);
    txtString+='Tamaño: '+ respuestas.tipoPizza+'\n';
    total = total+650;
    break;
    case 'Mediana': 
    console.log('Tamaño: '+ respuestas.tipoPizza);
    txtString+='Tamaño: '+ respuestas.tipoPizza+'\n';
    total = total+560;
    break;
    case 'Personal': 
    console.log('Tamaño: '+ respuestas.tipoPizza);
    txtString+='Tamaño: '+ respuestas.tipoPizza+'\n';
    total = total+430;
    break;
}

if(respuestas.queresBebida)
{
    totalProd = totalProd +1;
    console.log('Bebida: '+ respuestas.bebida);
    txtString+='Bebida: '+ respuestas.bebida+'\n';
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
    txtString+= 'Tus tres empanadas de regalo serán de: \n'
for(let i = 0; i< respuestas.saborEmpanadas.length; i++ ){
    console.log('\t● '+ respuestas.saborEmpanadas[i]);
    txtString+='\t● '+ respuestas.saborEmpanadas[i]+'\n';
}
}

console.log('===============================');
txtString+= '===============================\n';
console.log('Total productos: '+ totalProd +'un.');
txtString+='Total productos: '+ totalProd +'un.\n';
if(delivery > 0)
{
    console.log('Total delivery: $'+ delivery)
    txtString+= 'Total delivery: $'+ delivery +'\n';
}
 else{
    console.log('Total delivery: No delivery');
    txtString+= 'Total delivery: No delivery\n';
 } 
console.log('Descuentos: $' + descuento);
txtString+='Descuentos: $' + descuento +'\n';
console.log('TOTAL: $' + (total-descuento+delivery));
txtString+= 'TOTAL: $' + (total-descuento+delivery) +'\n';
console.log('===============================') 
txtString+='===============================\n';
var utc = new Date().toLocaleString().slice(0,19).replace(/-|:/gi,'');
let nameFile = 'pedido-'+respuestas.nombreCliente+'-'+ utc + '.txt';
fs.writeFile(nameFile,txtString,(err) => {
    if (err) throw err;
    console.log('El pedido se guardó correctamente.');
    console.log(nameFile);
  });
}


inquirer
.prompt(preguntas)

.then(respuestas => [ticket(respuestas)]);

