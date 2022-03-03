// search phone through api
const searchPhone = () => {
    const searchInputField = document.getElementById('input-search-text');
    const error = document.getElementById('error');
    const searchText = searchInputField.value;
    if (!isNaN(searchText) || searchText === '') {
        error.innerText = 'Please Enter a valid phone name';
        searchInputField.value = '';
        detailsShow.textContent = '';
        displaySearchResult.textContent = '';
    } else {
        spinnerToggle('block');
        fetch(
                https: //openapi.programming-hero.com/api/phones?search=${searchText}
            )
            .then((res) => res.json())
            .then((phoneData) => displayPhone(phoneData.data));
        searchInputField.value = '';
        detailsShow.textContent = '';
        error.textContent = '';


    }
};
// display phones
const displaySearchResult = document.getElementById('display-phone');
const displayPhone = (phones) => {
    displaySearchResult.textContent = '';
    phones.forEach((phone) => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
      <div class="phone-container h-100 w-75 m-auto">
          <img src="${phone.image}" class=" img-fluid" alt="${phone.phone_name}">
          <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
                  <h4 class="badge bg-success">${phone.brand}</h4>
                  </br>
              <button onclick="phoneDetails('${phone.slug}')" class="btn btn-info details-btn mt-2">View Details</button>
          </div>
      </div>
      `;
        displaySearchResult.appendChild(div);
        spinnerToggle('none');
    });


};

// phone details
const phoneDetails = (id) => {
        fetch(https: //openapi.programming-hero.com/api/phone/${id})
            .then((res) => res.json())
            .then((phoneData) => displayPhoneDetails(phoneData.data));

        };

        // view details of individual phone

        const detailsShow = document.getElementById('phone-details');
        const displayPhoneDetails = (details) => {
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
          <h5>Main Features</h5>
          <ul>
              <li><span class="fw-bold">ChipSet:</span> ${details.mainFeatures.chipSet}</li>
              <li><span class="fw-bold">DisplaySize:</span> ${details.mainFeatures.displaySize}</li>
              <li><span class="fw-bold">Memory:</span> ${details.mainFeatures.memory}</li>
          </ul>
          <h5>Sensors</h5>
          <ul>
              <li><span class="fw-bold">ChipSet:</span> ${details.mainFeatures.sensors}</li>
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

        // spinner toggle function
        const spinnerToggle = (displaySearchResult) =>
            (document.getElementById('spinner').style.display = displaySearchResult);