// const phone = () => {
//     fetch(' https://openapi.programming-hero.com/api/phones?search=iphone')
//         .then(res => res.json())
//         .then(data => console.log(data))
// }
// phone();
// ------------search phone----------
const searchPhone = () => {
        const searchField = document.getElementById('search-field');
        const error = document.getElementById('error');
        const searchText = searchField.value;
        // console.log(searchText);
        if (!isNaN(searchText) || searchText === '') {
            error.innerText = 'Please Enter a valid phone name';
            searchField.value = '';

        } else {


            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
            fetch(url)
                .then(res => res.json())
                .then(phonedata => displaySearchResult(phonedata.data, phonedata.status))
            searchField.value = '';
            error.innerText = '';
        }
    }
    // serch result-----------------

const displaySearchResult = (phones, status) => {
        const searchResult = document.getElementById('search-result');
        if (status == true) {
            phones.forEach(phone => {
                // console.log(phone);
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
            <div  class="card h-100 w-75">
                        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                         <div class="card-body">
                            <h5 class="card-title">${phone.brand}</h5>
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <button type="button" class="btn btn-success " onclick = "phoneDetails('${phone.slug}')">Details</button>
                            
                        </div>
                    </div>
            `;
                searchResult.appendChild(div);
            });

        } else {
            const error = document.getElementById('error');
            error.innerText = 'Please Enter a valid phone name';
            searchField.value = '';

        }

    }
    // ------phone details----

const phoneDetails = id => {


    const url = `https://openapi.programming-hero.com/api/phone/${id}

    `
    fetch(url)
        .then(res => res.json())
        .then(phonedata => dispalyPhoneDetails(phonedata.data))
}
const detailsShow = document.getElementById('phone-details');
const dispalyPhoneDetails = (details) => {
    console.log(details);
    error.textContent = '';
    detailsShow.innerHTML = `
  <div class="col">
      <div class="p-3 text-center">
          <img class="w-50" src="${details.image}" alt="">
      </div>
  </div>
  <div class="col">
      <div>
          <h1>${details.name}</h1>
          <h1>${details.brand}</h1>
              <h5>${details.releaseDate}</h5>
          <h5>Main Featrues</h5>
          <ul>
              <li><span class="fw-bold">chipSet:</span> ${details.mainFeatures.chipSet}</li>
              <li><span class="fw-bold">displaySize:</span> ${details.mainFeatures.displaySize}</li>
              <li><span class="fw-bold">memory:</span> ${details.mainFeatures.memory}</li>
          </ul>
          <h5>Sensors</h5>
          <ul>
              <li><span class="fw-bold">chipSet:</span> ${details.mainFeatures.sensors}</li>
          </ul>
          <h5>Others</h5>
          <ul>
              <li><span class="fw-bold">WLAN:</span> ${details.others.WLAN}</li>
              <li><span class="fw-bold">Bluetooth:</span> ${details.others.Bluetooth}</li>
              <li><span class="fw-bold">GPS:</span> ${details.others.GPS}</li>
              <li><span class="fw-bold">NFC:</span> ${details.others.NFC}</li>
              <li><span class="fw-bold">Radio:</span> ${details.others.Radio}</li>
              <li><span class="fw-bold">USB:</span> ${details.others.USB}</li>
          </ul>
      </div>
  </div>
  `;
};