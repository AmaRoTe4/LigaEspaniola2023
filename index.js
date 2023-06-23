//equipos

let btnInputFiltro = document.getElementById("btn-input-filtro");
let TodosEquipos = [];
let EquiposRender = [];

const FiltroEquipos = (text, filtro) => {
  EquiposRender = [];
  EquiposRender = 
    TodosEquipos
      .filter((n) => 
        n.nameShow.toLowerCase().includes(text.toLowerCase()) 
        && (filtro === 0 || filtro === n.gender)
      );

  console.log(text)
  console.log(filtro)
};

const cargarEquipos = async () => {
  const data = await fetch("./data/index.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  if (data !== undefined) data.team.map((n) => TodosEquipos.push(n));
  EquiposRender = [...TodosEquipos];
};

const AgregarEquipos = () => {
  const listaDeEquipos = document.querySelector("#lista-equipos");

  while (listaDeEquipos.firstChild) {
    listaDeEquipos.removeChild(listaDeEquipos.firstChild);
  }

  EquiposRender.map((n, i) => {
    listaDeEquipos.insertAdjacentHTML(
      "beforeend",
      `
        <li
            id='equipos'
            data-equipo=${n.id}
            class='
              m-2 p-1 
              min-w-[100px] 
              h-auto min-h-[120px]
              border rounded-md border-slate-800 
              flex flex-col justify-center items-center
              hover:scale-110
              hover:bg-black
              hover:text-white
              hover:cursor-pointer
              hover:mx-7
              transition
              ease-linear
              duration-200
            '>
                <span class='flex justify-center items-center mb-2'>
                  <img
                    src=${n.shield_png}
                    alt=${n.short_name}
                    class='w-[50px] bg-inherit'
                  />
                </span>
                <h3 class='w-full text-center'>${n.nameShow}</h3>
      </li>
        `
    );
  });

  const lista = document.querySelectorAll("#equipos");

  lista.forEach((equipo) => {
    equipo.addEventListener("click", (e) => {
      mostrarInfoDeEquipo(equipo.dataset.equipo);
    });
  });
};

function isColorBlendableWithWhite(hexColor, contrastThreshold = 1.8) {
  const rgbColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  const r = parseInt(rgbColor[1], 16);
  const g = parseInt(rgbColor[2], 16);
  const b = parseInt(rgbColor[3], 16);
  const relativeBrightness = (r * 299 + g * 587 + b * 114) / 1000;
  const contrast = (relativeBrightness + 255) / (255 - relativeBrightness);

  return contrast >= contrastThreshold;
}

const mostrarInfoDeEquipo = (id) => {
  const render = document.querySelector("#render-main");
  const dataTeam = TodosEquipos.find((n) => n.id === id);

  if (dataTeam === undefined) return;

  //true = poner en negro
  //false = poner en blanco
  const renderColor = isColorBlendableWithWhite(dataTeam.color1);

  render.innerHTML = `
        <div class="w-full min-h-full h-auto flex flex-col md:flex-row">
            <div class="w-full md:w-[30%] min-h-full h-[40vh] md:h-auto  md:border-e border-black flex md:flex-col justify-center items-center my-4 md:m-0" >
                <span class="w-[150px] h-[150px] flex justify-center items-center mb-2">
                    <img 
                        class="w-[95%] h-[95%]"
                        src="${dataTeam.shield_png}" 
                    />
                </span>
                <span class="w-[150px] h-[150px] rounded-[100%] mt-2 flex justify-center items-center">
                    <img 
                        class="w-full h-full rounded-[100%]"
                        src="${dataTeam.flag}" 
                    />
                </span>
            </div>
            <div class="h-auto border-t md:border-0 w-full md:w-[70%] min-h-full flex flex-col" style="background-color: ${
              dataTeam.color1
            }">
                <div class="h-[40px] w-full flex justify-end">
                    <button id="btn-cerrarVista" class="h-[30px] w-[30px] m-2">
                        <img src="${
                          renderColor
                            ? "./images/cruzNegra.svg"
                            : "./images/cruzBlanca.svg"
                        }" class="h-full w-full">
                    </button>
                </div>
                <section class="pb-5 px-2 md:px-5 h-auto">
                    <div class="md:my-1 flex">
                        <p class="${
                          renderColor ? "text-black" : "text-white"
                        } text-[20px] min-w-[200px]">Nombre Comercial: </p>
                        <p class="${
                          renderColor ? "text-black" : "text-white"
                        } text-[20px] ms-3">${dataTeam.nameShow}</p>
                    </div>
                    <div class="md:my-1 flex">
                        <p class="${
                          renderColor ? "text-black" : "text-white"
                        } text-[20px] min-w-[200px]">Nombre Completo: </p>
                        <p class="${
                          renderColor ? "text-black" : "text-white"
                        } text-[20px] ms-3">${dataTeam.fullName}</p>
                    </div>
                    <div class="md:my-1 flex">
                        <p class="${
                          renderColor ? "text-black" : "text-white"
                        } text-[20px] min-w-[200px]">Nombre Corto: </p>
                        <p class="${
                          renderColor ? "text-black" : "text-white"
                        } text-[20px] ms-3">${dataTeam.short_name}</p>
                    </div>
                    <div class="md:my-1 flex">
                        <p class="${
                          renderColor ? "text-black" : "text-white"
                        } text-[20px] min-w-[200px]">Pais: </p>
                        <p class="${
                          renderColor ? "text-black" : "text-white"
                        } text-[20px] ms-3">${dataTeam.countryCode}</p>
                    </div>
                </section>
            </div>
        </div>
    `;

  const btnCerrar = document.querySelector("#btn-cerrarVista");

  btnCerrar.addEventListener("click", (e) => {
    e.preventDefault();

    render.innerHTML = `
        <h3 class="text-bold text-center text-[50px]">
            Seleccione algun Equipo de la barra superior!
        </h3>
    `;
  });
};

const Buscador = () => {
  const navBar = document.getElementById("navbar");
  const formBusqueda = document.getElementById("form-busqueda");

  const funcionDeCierre = () => {
    const formBusqueda = document.getElementById("form-busqueda");
    navBar.removeChild(formBusqueda);
    EquiposRender = [...TodosEquipos];
    AgregarEquipos();
  }

  if (formBusqueda) {
    funcionDeCierre()
    return;
  };

  navBar.insertAdjacentHTML(
    "afterbegin",
    `
        <form id="form-busqueda" class="h-[100px] md:h-[40px] w-full flex flex-col md:flex-row justify-center md:justify-around items-center">
            <div class="w-[100%] md:w-[40%] h-[40px] md:h-full flex justify-center items-center">
                <div class="w-[25%] h-[40px] md:h-full flex justify-center items-center">
                  <label class="text-sm mx-1 md:mx-1 md:mx-3">
                    Todos 
                  </label>
                  <input
                    checked
                    class="visualSelector"
                    type="radio" 
                    name="visualP" 
                    id="0" 
                  > 
                </div>
                <div class="w-[25%] h-[40px] md:h-full flex justify-center items-center">
                  <label class="text-sm mx-1 md:mx-3">
                    1 al 6 
                  </label>
                  <input
                    class="visualSelector"
                    type="radio" 
                    name="visualP" 
                    id="1" 
                  > 
                </div>
                <div class="w-[25%] h-[40px] md:h-full flex justify-center items-center">
                  <label class="text-sm mx-1 md:mx-3">
                    7 al 13
                  </label>
                  <input
                    class="visualSelector"
                    type="radio" 
                    name="visualP" 
                    id="2" 
                  >
                </div>
                <div class="w-[25%] h-[40px] md:h-full flex justify-center items-center">
                  <label class="text-sm mx-1 md:mx-3">
                    14 al 20
                  </label>
                  <input
                    class="visualSelector"
                    type="radio" 
                    name="visualP" 
                    id="3" 
                  >
                </div>
            </div>
            <div class="w-full md:w-[30%] h-full flex justify-center items-center">
                <input
                    class="text-[20px] max-w-[90%] border-b border-black h-full"
                    type="text" 
                    name="busqueda" 
                    id="text-busqueda" 
                    placeholder="Nombre del equipo"
                >
                <button id="btn-cerrarVista" class="min-h-[20px] min-w-[20px] m-2">
                    <img src="./images/cruzNegra.svg" class="h-full w-full">
                </button>
            </div>
        </form>
    `
  );

  const btnCierre = document.getElementById("btn-cerrarVista");
  const textBusqueda = document.getElementById("text-busqueda");
  const inputsRadio = document.querySelectorAll(".visualSelector");
  
  const obtenerFiltro = () => {
    let filtro = 0
    inputsRadio.forEach(n => {
      if(n.checked) filtro = Number(n.id);
    });
    return filtro
  }

  btnCierre.addEventListener("click", (e) => {
    e.preventDefault();
    funcionDeCierre();
  });
  
  textBusqueda.addEventListener("input", (e) => {
    let filtro = obtenerFiltro() 
    FiltroEquipos(e.target.value, filtro);
    AgregarEquipos();
  });

  inputsRadio.forEach(n => {
    n.addEventListener("change", (e) => {
      let filtro = obtenerFiltro() 
      FiltroEquipos(textBusqueda.value , filtro);
      AgregarEquipos();
    });
  })
};

btnInputFiltro.addEventListener("click", () => {
  Buscador();
});

document.addEventListener("DOMContentLoaded", async () => {
  if (TodosEquipos.length === 0) await cargarEquipos();
  AgregarEquipos();
});
