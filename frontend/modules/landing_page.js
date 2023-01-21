import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  console.log(config);
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let citiesData = await fetch(config.backendEndpoint+'/cities');
    return citiesData.json();
  }catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // <div class="col-12 col-sm-6 col-lg-3 mb-4">
  //   <a href="pages/adventures/">
  //     <div class="tile">
  //       <img src="assets/bengaluru.jpg" />
  //       <div class="tile-text text-center">
  //         <h5>Bengaluru</h5>
  //         <p>100+ places</p>
  //       </div>
  //     </div>
  //   </a>
  // </div>
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let rowEle = document.getElementById('data');

  let divEle = document.createElement('div');
  let classListData = ['col-12', 'col-sm-6', 'col-lg-3', 'mb-4'];
  classListData.forEach((className) => divEle.classList.add(className));  

  let aEle = document.createElement('a');
  aEle.setAttribute('href',`pages/adventures/?city=${id}`);
  aEle.setAttribute('id',id);

  let divTileEle = document.createElement('div');
  divTileEle.classList.add('tile');
  let imgEle = document.createElement('img');
  imgEle.setAttribute('src',image);
  divTileEle.append(imgEle);

  let divInnerTileEle = document.createElement('div');
  divInnerTileEle.classList.add('tile-text');
  divInnerTileEle.classList.add('tile-center');
  let h5Ele = document.createElement('h5');
  h5Ele.innerText = city;
  let pEle = document.createElement('p');
  pEle.innerText = description;
  divInnerTileEle.append(h5Ele, pEle);

  divTileEle.append(divInnerTileEle);
  aEle.append(divTileEle);
  divEle.append(aEle);
  rowEle.append(divEle);
  console.log(rowEle);

}

export { init, fetchCities, addCityToDOM };
