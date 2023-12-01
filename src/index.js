import axios from 'axios';

const breedSelect = document.querySelector('.breed-select');
const load = document.querySelector('.loader');
const fail = document.querySelector('.error');
const infoCat = document.querySelector('.cat-info');

fail.style.display = 'none';
load.style.display = 'none';

const fetchBreeds = async () => {
  const response = await fetch(
    'https://api.thecatapi.com/v1/breeds?api_key=live_MLktqQ19jStPH3IF1EIfPNYJPjvXVQbD17osTKpGLLDOB33gmte96Cp1XRiEtyyC'
  );
  console.log(response);

  const body = await response.json();
  console.log(body);

  body.forEach(element => {
    udpateList(element.id, element.name);
  });
};

fetchBreeds();

const udpateList = (id, nameCat) => {
  const option = document.createElement('option');
  option.value = id;
  option.textContent = nameCat;
  breedSelect.append(option);
};

breedSelect.addEventListener('change', async event => {
  try {
    const response = await fetchCatByBreed(event.target.value);
  } catch (error) {
    fail.style.display = 'block';
    console.log(error);
  }
});

const fetchCatByBreed = async breedId => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
  const data = await response.json();
  console.log(data);

  const newFetch = await fetch(
    `https://api.thecatapi.com/v1/images/${data[0].id}`
  );

  const newData = await newFetch.json();
  console.log(newData);

  const nameCat = newData.breeds[0].name;
  console.log(nameCat);

  const catDesc = newData.breeds[0].description;
  console.log(catDesc);

  const catTemp = newData.breeds[0].temperament;
  console.log(catTemp);

  const catUrl = newData.url;
  console.log(catUrl);

  createCard(nameCat, catDesc, catUrl, catTemp);
};

function createCard(nameCat, description, url, temperament) {
  infoCat.innerHTML = `
            <img class="cat-info__cat-image" src=${url} alt="" />
            <div class="cat-description">
                <h2 class="cat-description__cat-breed> ${nameCat} </h2>
                <p class="cat-description__cat-temperament"> ${description} </p>
                <h3 class="cat-description__cat-temperament"> Temperament </h3>
                <p class="cat-description__cat-temperament"> ${temperament} </p>
            </div>`;
}
