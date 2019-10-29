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
     },
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
     choices: ['Grande','Mediana','Chica']
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
    },
    {
     type:'checkbox',
     name: 'saborEmpanadas',
     message: '¿Que gusto de empanadas queres?',
     choices: ['Pollo','JyQ','Choclo','Carne Suave','Carne cortada a Cuchillo','Tomate y queso'],
     when: respuestas => respuestas.clienteHabitual
    }
]

inquirer
.prompt(preguntas)
.then(respuestas => [console.log(respuestas)]);