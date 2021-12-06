let api_url = 'https://api-mobilespecs.azharimm.site/v2';
let brand_id = document.getElementById('brand_id');
let phones_grid = document.getElementById('phones_grid');

window.onload = function() {
    displayBrandNameOptions();
}

async function displayBrandNameOptions() {
    let brands = await fetch(`${api_url}/brands`).then(res => res.json());
    console.log(brands);
    let names = brands.data;
    console.log(names);
    names.forEach(element => {
        brand_id.innerHTML = brand_id.innerHTML + `<option value="${element.brand_slug}">${element.brand_name}</option>`;
    });
    brand_details = await fetch(`${api_url}/top-by-fans`).then(res => res.json()); 
    console.log(brand_details);
    getPhonesData(brand_details.data.phones);
}

brand_id.addEventListener('change', async () => {
    selected_brand = brand_id.selectedOptions[0].value;
    brand_details = await fetch(`${api_url}/brands/${selected_brand}`).then(res => res.json());
    getPhonesData(brand_details.data.phones);
})

function getPhonesData(phones) {
    phones_grid.innerHTML = '';
    phones.forEach(async (phone) => {

        if(phone.image === undefined) {
            phone.image = await fetch(`${api_url}/${phone.slug}`).then(res => res.json()).then(description => description.data.phone_images[0]);
            console.log(phone.image);
        }
        
        phones_grid.innerHTML = phones_grid.innerHTML + `
        <div class="col-sm-6 col-md-4 col-lg-3 card-deck p-2 mb-5">
            <div class="card text-center">
                <div class="card-body text-center m-3 p-2">
                    <h4 class="card-title">${phone.phone_name.toUpperCase()}</h4>
                </div>
                <img src="${phone.image}" class="card-img p-3" alt="${phone.phone_name}">
                <div class="text-center m-3 p-2 bg-white">
                    <button onClick="getPhoneDetails('${phone.detail}')" class="btn detail-btn text-white">Details</button>
                </div>
            </div>
        </div>`;  
    })
}

async function getPhoneDetails(getPhoneDetailsUrl) {

    details = await fetch(getPhoneDetailsUrl).then(res => res.json()).then(phone => phone.data);
    phones_grid.innerHTML = `
        <div class="imgAndDetails">
            <div class="card-fluid">
                <div class="d-flex flex-wrap">
                    <div class="col-md-6 p-5">
                        <div class="card-body pl-5 m-5">
                            <h5 class="card-title mt-5 mb-5">${details.phone_name}</h5>
                            <p class="card-text mb-4">${details.dimension}</p>
                            <p class="card-text mb-4">${details.os}</p>
                            <p class="card-text mb-4">${details.storage}</p>
                            <p class="card-text"><small class="text-muted">${details.release_date}</small></p>
                        </div>
                    </div>
                    <div class="col-md-6 p-5 bg-white phone-img">
                        <img class="img-fluid" src="${details.phone_images[0]}" alt="...">
                    </div>
                </div>
            </div>
        </div>`;
    console.log(getPhoneDetailsUrl)
}