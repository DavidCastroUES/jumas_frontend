<template>
  <br>
  <div class="table-responsive mx-auto">
    <h2>Eliminando al cliente</h2>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Cliente</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody class="table-group-divider" id="contenido">
        <tr v-if="this.cargando">
          <td colspan="6"><h3>Cargando...</h3></td>
        </tr>
        <tr v-else v-for="cat, i in this.categoriaCli" :key="cat.id">
          <td v-text="(i+1)"></td>
          <td v-text="cat.NOMBRECATEGORIA"></td>
          <td>
            <!-- &nbsp;
            <button class="btn btn-danger" v-on:click="$event => eliminar(cat.IDCATEGORIACLIEN, cat.NOMBRECATEGORIA)">
              <i class="fa-solid fa-trash"></i>
            </button> -->
            <!-- <router-link to="{path:'edit/'+est.id}" class="btn btn-warnitg">
              <i class="fa-solid fa-edit"></i>
            </router-link> -->
          </td>
        </tr>  
     </tbody>
    </table>
  </div>

</template>