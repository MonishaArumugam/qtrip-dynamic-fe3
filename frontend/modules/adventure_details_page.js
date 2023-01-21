import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const adventureId = urlParams.get('adventure');
  console.log(adventureId);
  return adventureId;


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
    try{
      let adventureDetails = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
      let finalData = await adventureDetails?.json();
     return finalData;
       
    }catch(err){
      return null;
    }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let titleEle = document.getElementById('adventure-name');
  titleEle.textContent = adventure?.name;

  let subTitleEle = document.getElementById('adventure-subtitle');
  subTitleEle.textContent = adventure?.subtitle;

  let contentEle = document.getElementById('adventure-content');
  contentEle.textContent = adventure?.content;

  let imgEle = document.getElementById('photo-gallery');
  adventure?.images?.map((imageEle, index) => {
    let newDivEle = document.createElement('div');
    newDivEle.innerHTML = `<img src="${imageEle}" alt="${adventure?.name}-${index}" class="activity-card-image"/>`;
    imgEle.append(newDivEle);
  })


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let parentEle = document.getElementById('photo-gallery');
  parentEle.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

let carousalEle = document.querySelector('.carousel-inner');
images?.map((imageEle, index) => {
  let newDivEle = document.createElement('div');
  let activeClass = index === 0 ? " active" : '';
  newDivEle.classList = `carousel-item${activeClass}`;
  newDivEle.innerHTML = `<img src="${imageEle}" alt="image-${index}" class="activity-card-image d-block w-100"/>`;
  carousalEle.append(newDivEle);
});

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log("adventure",adventure);
  let soldOutEle = document.getElementById('reservation-panel-sold-out');
  let formEle = document.getElementById('reservation-panel-available');
  let costperHead = document.getElementById('reservation-person-cost');
  if(adventure?.available){
    formEle.style.display = 'block';
    soldOutEle.style.display = 'none';
    costperHead.textContent = adventure?.costPerHead;
  }else{
    soldOutEle.style.display = 'block';
    formEle.style.display = 'none';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalEle = document.getElementById('reservation-cost');
  totalEle.textContent = adventure?.costPerHead * persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById('myForm').addEventListener('submit',async (e) => {
    e.preventDefault();
    let formData = {
      adventure : adventure.id,
      name : e.target.name?.value ? e.target.name?.value : '' ,
      date : e.target.date?.value ? e.target.date?.value : '',
      person : e.target.person?.value ? e.target.person?.value : '',
    };
    try{
      let response = await fetch(`${config.backendEndpoint}/reservations/new`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
  
      let result = await response.json();
      return result;
    }catch(e){
      return null;
    }
    if( result?.success ) alert("Success!");
    else alert("Failed!");
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let bannerEle = document.getElementById('reserved-banner');
  if(adventure?.reserved){
    bannerEle.style.display = 'block';
  }else{
    bannerEle.style.display = 'none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
