const formulario = document.querySelector('#formulario');
const recordatorios = document.querySelector('#recordatorios');
const descripcion = document.querySelector('#descripcion');

let arrayRecordatorios = [];

const CrearItem = (actividad) =>{
    let item = {
        actividad: actividad,
        descripcion: descripcion,
        estado: false
    }

    arrayRecordatorios.push(item);

    return item;
}

const GuardarDB = (CrearItem) =>{
    localStorage.setItem('recordar', JSON.stringify(arrayRecordatorios));
    PintarDB();
}

const PintarDB = () =>{
    recordatorios.innerHTML = '';

    arrayRecordatorios = JSON.parse( localStorage.getItem('recordar'));

    if(arrayRecordatorios === null){
        arrayRecordatorios = [];
    }else{
        arrayRecordatorios.forEach(e =>{

            if(e.estado){
                recordatorios.innerHTML += `
                    <div class="alert alert-success" role="alert">
                        <b>${e.actividad}</b><span> - ${e.estado}</span>
                        <span class="float-right">
                            <i class="fas fa-trash">delete</i>
                        </span>
                    </div>
                    `;
            }else{
                recordatorios.innerHTML += `
                    <div class="alert alert-danger" role="alert">
                        <b>${e.actividad}</b><span> - ${e.estado}</span>
                        <span class="float-right">
                            <i class="fas fa-check" value="done">done</i>
                        </span>
                    </div>
                    `;
            }

            
        })
    }
}

const ElminiarDB = (actividad) =>{
    let indexArray;

    arrayRecordatorios.forEach((elemento, index) =>{
        if(elemento.actividad === actividad){
            indexArray = index;
        }
    });
    arrayRecordatorios.splice(indexArray, 1);
    GuardarDB();
}

const EditarDB = (actividad) =>{
    let indexArray = arrayRecordatorios.findIndex((elemento) =>{
        return elemento.actividad === actividad
    });

    arrayRecordatorios[indexArray].estado = true

    GuardarDB();
}


formulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    let recordatorios = document.querySelector('#recordatorio').value;

    CrearItem(recordatorios);
    GuardarDB();

    formulario.reset();
});

document.addEventListener('DOMContentLoaded', PintarDB);

recordatorios.addEventListener('click', (e) =>{
    e.preventDefault();
    
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
        let element = e.path[2].childNodes[1].innerHTML;

        if(e.target.innerHTML === 'delete'){
            //elminiar
            ElminiarDB(element);
        }
        if(e.target.innerHTML === 'done'){
            //editar
            EditarDB(element);
        }
    }
})