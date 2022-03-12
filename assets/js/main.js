//Recomendación:

$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();

    //Capturar la información ingresada mediante eventos del DOM con jQuery.
    let valueInput = $("#superHeroInput").val();

    /*Validar que usuario ingrese sólo números. Intenté hacerlo con RegExp pero fallé, 
    por lo que lo haré con estructuras condicionales*/
    if(isNaN(valueInput)||(valueInput)>731||(valueInput)<1){
      alert("Por favor ingrese un número válido: \n Entre 1 y 731 inclusive. \n Muchas gracias")
      
      //Refrescar la página 
      location.reload();
    }else{
      alert("El número ingresado es válido.")
    }

    //Realizar petición por método AJAX de jQuery
    $.ajax({
      type: "GET",
      url:
        "https://superheroapi.com/api.php/10228033133558739/" +
        valueInput +
        "/",

      // "https://superheroapi.com/api.php/10228033133558739/character-id/"+valueInput, //.8739/"+valueInput+"/"
      //concatenar valor ingresado por usuario
      dataType: "json",
      success: function (data) {
        console.log(data);

        //datos que recibiremos de nuestra petición en caso de ser exitosa
        let imagen = data.image.url;
        let nombre = data.name;
        let conexiones = data.connections["group-affiliation"];
        let publicadoPor = data.biography.publisher;
        let ocupacion = data.work.occupation;
        let primeraAparicion = data.biography["first-appearance"];
        let altura = data.appearance.height;
        let peso = data.appearance.weight;
        let alias = data.biography.aliases;

        $("#superHeroInfo").html(`
          <div class="card mb-3 red">
              <div class="row">
                  <div class="col-md-6 my-auto">
                      <img src="${imagen}" class="card-img text-white" alt="IMAGEN NO DISPONIBLE">
                  </div>
                  <div class="col-md-6">
                      <div class="card-body text-white">
                          <h5 class="card-title">Nombre: ${nombre}</h5>
                          <p class="card-text">Conexiones: ${conexiones}</p>
                      </div>
                      <ul class="list-group list-group-flush p-3">
                          <li class="list-group-item">Publicado por: ${publicadoPor}</li>
                          <li class="list-group-item">Ocupación: ${ocupacion}</li>
                          <li class="list-group-item">Primera Aparición: ${primeraAparicion}</li>
                          <li class="list-group-item">Altura: ${altura}</li>
                          <li class="list-group-item">Peso: ${peso}</li>
                          <li class="list-group-item">Alias: ${alias} </li>
                      </ul>
                  </div>
              </div>
          </div>
        `);
        //Renderizar gráfica interactiva mediante Canvas JS usando jQuery

        //declaro  arreglo estadisticas para adecuar mis datos a lo solicitado
        let estadisticas = [];
        console.log(Object.entries(data.powerstats)[2]);
        //Propiedades
        Object.entries(Object.entries(data.powerstats)).forEach(([key, value]) => {
          estadisticas.push({
            name: key,
            y: value

          })
          console.log([key, value]);
        });



        
        
        /*declarar un objeto de configuracion con la propiedad animationEnabled para generar la pequeña animacion cuando
          se renderiza la animacion por primera vez, aunque lo más importante es preparar endpoints con powerstats del json.*/

        let config = {
          animationEnabled: true,
          title: {
            text: `Estadísticas de poder para ${nombre}`,
          },
          legend: {
            cursor: "pointer",
            itemclick: explodePie,
          },
          data: [
            {
              type: "pie",
              showInLegend: true,
              toolTipContent: "{name}: <strong>{y}%</strong>",
              indexLabel: "{name} - {y}%",
              dataPoints: estadisticas,
            },
          ],
        };
      },
      //Aquí ingresamos la función para alertar en caso de que ocurra un error con la petición
      error: function(error) {
        if(error){
          alert("Por favor Intente nuevamente con otro ID o Número.  =( \n Ha ocurrido un error " +error)
        }else{
          console.log("No hay error!")
        }
        }
                   
      
    });
  });
});

