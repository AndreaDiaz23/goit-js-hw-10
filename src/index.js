import axios from "axios";
axios.defaults.headers.common["x-api-key"] = live_MLktqQ19jStPH3IF1EIfPNYJPjvXVQbD17osTKpGLLDOB33gmte96Cp1XRiEtyyC;


const breedSelect = document.querySelector ('.breed-select');
const load = document.querySelector('.loader');
const fail = document.querySelector('.error');
const infoCat = document.querySelector('.cat-info');


function fetchBreeds() {
    fetch(
        'https://api.thecatapi.com/v1/breeds?api_key=live_MLktqQ19jStPH3IF1EIfPNYJPjvXVQbD17osTKpGLLDOB33gmte96Cp1XRiEtyyC'
    ).then(response =>{
        response
        .json()
        .then(data => {
            data.map(breed =>{ 
                breedSelect.innerHTML += `<breedSelect value=${breed.reference_image_id}>${brees.name}</breedSelect>`;
            });
            console.log(data);

            return data;
        })
        .catch(error =>{
            infoCat.innerHTML = `<p class="error"> Error: ${error}</p>`;
            console.log(error);
        });
    });   
}

const dataApi = fetchBreeds();

breedSelect.addEventListener('change', event =>{
    fetchImage(event.target.value)
    .then(response => {
        load.style.display = 'none';
        response.json().then(data => {
            console.log(data);

            infoCat.innerHTML = `
            <img class="cat-info__cat-image" src=${data.url} alt="" />
            <div class="cat-description">
                <h2 class="cat-description__cat-breed> ${data.breeds[0].name} </h2>
                <p class="cat-description__cat-temperament"> ${data.breeds[0].description} </p>
                <h3 class="cat-description__cat-temperament"> Temperament </h3>
                <p class="cat-description__cat-temperament"> ${data.breeds[0].temperament} </p>
            </div>`;
        });
    })
    .catch(error => {
        console.log(error);
    });
});

function fetchImage(id) {
    load.style.display = 'inline-block';
    fail.style.display = 'none';
    infoCat.innerHTML ='';

    return fetch(`https://api.thecatapi.com/v1/images/${id}`);
}