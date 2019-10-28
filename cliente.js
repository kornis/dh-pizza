const inquirer = require('inquirer');

let preguntas = [
    {
        type: 'confirm',
        name: 'paraLlevar',
        message: 'La pizza es para llegar?',
    },
    {type:'input',
     name: 'nombreCliente',
     message: 'Ingresá tu nombre',
     when: function(respuestas)
     {
         return respuestas.paraLlevar === true;
     }
    },
    {
     type:'input',
     name: 'telefonoCliente',
     message: 'Ingresá tu numero de telefono'
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
     choices: ['Grande','Mediana','Chica']
    },
    {
     type:'list',
     name: 'bebida',
     message: 'Elegí el gusto de la bebida',
     choices: ['Pepsi','Mirinda','7Up']
    },
    {
     type:'checkbox',
     name: 'saborEmpanadas',
     message: '¿Que gusto de empanadas queres?',
     choices: ['Pollo','JyQ','Choclo','Carne Suave','Carne cortada a Cuchillo','Tomate y queso']
    }
]

inquirer
.prompt(preguntas)
.then(respuestas => [console.log(respuestas)]);