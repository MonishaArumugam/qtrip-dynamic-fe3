import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let response = await fetch(`${config.backendEndpoint}/reservations/`);
    let result = await response.json();
    return result;
  }catch(e){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  let noBanner = document.getElementById('no-reservation-banner');
  let banner = document.getElementById('reservation-table-parent');
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations?.length > 0){
    banner.style.display = 'block';
    noBanner.style.display =  'none';
  }else{
    banner.style.display = 'none';
    noBanner.style.display =  'block';
  }

  if(reservations?.length>0){
    let parentEle = document.getElementById('reservation-table');
    reservations?.forEach(row => {
      let trEle = document.createElement('tr');
      trEle.innerHTML = `
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.adventureName}</td>
        <td>${row.person}</td>
        <td>${new Date(row.date).toLocaleDateString('en-IN')}</td>
        <td>${row.price}</td>
        <td>${(new Date(row.time).toLocaleString('en-IN'
        ,{
          year:"numeric",
          day:'numeric',
          month:'long',
          hour:'numeric',
          minute:'numeric',
          second:'numeric',
          hour12:true
        }
        )).replace(' at',',')}</td>
        <td>
        <div class="reservation-visit-button" id=${row.id}>
        <a href="../detail/?adventure=${row.adventure}">Visit Adventure</a>
        </div>
        </td>
      `;
      parentEle.append(trEle);
    });

  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

  

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
