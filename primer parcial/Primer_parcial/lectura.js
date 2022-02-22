Vue.component('lectura', {
    data:()=>{
        return {
            lecturas: [],
            buscar: '',
            lectura: {
                accion: 'nuevo',
                msg : '',
                idlectura: '',
                fecha: '',
                idCliente: '',
                Ianterior: '',
                Iactual: '',
                pago: ''

            }
        }
    },
    methods: {
        buscarlectura(){
            this.obtenerDatos(this.buscar);
        },
        guardarlectura(){
            this.obtenerDatos();
            let lecturas = this.lecturas || [];
            if(this.lectura.accion == 'nuevo'){
                this.lectura.idlectura = idUnicoFecha();
                lecturas.push(this.lectura);
            }else if(this.lectura.accion == 'modificar'){
                let index = lecturas.findIndex(lectura=>lectura.idlectura==this.lectura.idlectura);
                lecturas[index] = this.lectura;
            }else if(this.lectura.accion == 'eliminar'){
                let index = lecturas.findIndex(lectura=>lectura.idlectura==this.lectura.idlectura);
                lecturas.splice(index,1);
            }
            localStorage.setItem('lecturas', JSON.stringify(this.lectura));
            this.lectura.msg = 'lectura procesado con exito';
            this.nuevolectura();
            this.obtenerDatos();
        },
        modificarlectura(data){
            this.lectura = JSON.parse(JSON.stringify(data));
            this.lectura.accion = 'modificar';
        },
        eliminarlectura(data){
            if( confirm(`¿Esta seguro de eliminar el lectura ${data.idCliente}?`) ){
                this.lectura.idlectura = data.idlectura;
                this.lectura.accion = 'eliminar';
                this.guardarlectura();
            }
        },
        obtenerDatos(busqueda=''){
            this.lecturas = [];
            if( localStorage.getItem('lecturas')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('lecturas')).length; i++){
                    let data = JSON.parse(localStorage.getItem('lecturas'))[i];
                    if( this.buscar.length>0 ){
                        if( data.idCliente.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ){
                            this.lecturas.push(data);
                        }
                    }else{
                        this.lecturas.push(data);
                    }
                }
            }
        },
        nuevolectura(){
            this.lectura.accion = 'nuevo';
            this.lectura.idlectura = '';
            this.lectura.fecha = '';
            this.lectura.idCliente = '';
            this.lectura.msg = '';
            console.log(this.lectura);
        }
    }, 
    created(){
        this.obtenerDatos();
    },
    template: `
        <div id='applectura'>
            <form @submit.prevent="guardarlectura" @reset.prevent="nuevolectura" method="post" id="frmlectura">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de lecturas

                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmlectura" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">fecha</div>
                            <div class="col col-md-2">
                                <input v-model="lectura.fecha" placeholder="fecha" pattern="[0-2]{8}-[0-2]{1}" required title="fecha de lectura" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">idCliente</div>
                            <div class="col col-md-2">
                                <input v-model="lectura.idCliente" placeholder="escribe tu idCliente" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="idCliente de lectura" class="form-control" type="text">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    {{ lectura.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <button type="submit" class="btn btn-primary">Guardar</button>
                                <button type="reset" class="btn btn-warning">Nuevo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="card mb-3" id="cardBuscarlectura">
                <div class="card-header text-white bg-dark">
                    Busqueda de lecturas

                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarlectura" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarlectura" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>fecha</th>
                                <th>idCliente</th>
                                <th>idCliente</th>
                                <th>Ianterior</th>
                                <th>Iactual</th>
                                <th>pago</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in lecturas" :key="item.idlectura" @click="modificarlectura(item)">
                                <td>{{item.fecha}}</td>
                                <td>{{item.idCliente}}</td>
                                <td>{{item.Ianterior}}</td>
                                <td>{{item.Iactual}}</td>
                                <td>{{item.pago}}</td>


                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarlectura(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});