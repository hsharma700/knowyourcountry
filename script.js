const darkLightMode = document.querySelector(".dark-light-mode")
const moonSun = document.querySelector(".fa-regular")
const modeName = document.querySelector(".mode-name")
//countries
const countriesContainer = document.querySelector(".countries-container");
const searchInput = document.querySelector("#searchInput")
const titleLogo = document.querySelector(".title-logo")
const regionSelect = document.querySelector(".region-select")




document.body.classList.add(localStorage.getItem("page-mode"))
modeName.innerText = localStorage.getItem("page-mode") == "dark" ? "Light Mode" : "Dark Mode"; 
moonSun.className = localStorage.getItem("page-mode") == "dark"?"fa-regular fa-sun":"fa-regular fa-moon";
if(localStorage.getItem("region")){
  regionSelect.value = localStorage.getItem("region")
}
if(localStorage.getItem("input-value")){
  searchInput.value = localStorage.getItem("input-value")
}

// dark light mode
darkLightMode.addEventListener('click',()=>{
  document.body.classList.toggle('dark')
  if(localStorage.getItem("page-mode") == "dark"){
  localStorage.setItem('page-mode',"light")
  }else{
  localStorage.setItem('page-mode',"dark")
  }
  modeName.innerText = localStorage.getItem("page-mode") == "dark" ? "Light Mode" : "Dark Mode"; 
  moonSun.className = localStorage.getItem("page-mode") == "dark"?"fa-regular fa-sun":"fa-regular fa-moon";
})


//cards generate function
function cards(countries){
  countriesContainer.innerHTML = ""
  countries.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `./profile.html?search=${country.name.common}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="">
              <h3>${country.name.common}</h3>
              <p><b>Population : </b>${country.population.toLocaleString()}</p>
              <p><b>Region : </b>${country.region}</p>
              <p><b>Capital : </b>${country.capital}</p>
      `
    countriesContainer.append(countryCard);
  });
}

//filter object function
const filterFunctions = {
  filterByInput(countries,inputValue){ return countries.filter((country)=>{
    return ((country.name.common).toLowerCase()).includes(inputValue.toLowerCase()) 
  })},
  filterByRegion(countries,localRegion){return countries.filter((country)=>{
    return ((country.region).toLowerCase()).includes(localRegion.toLowerCase())
 })},
 filterInputAndRegion(countries,inputValue,localRegion){return countries.filter((country)=>{
  return ((country.region).toLowerCase()).includes(localRegion.toLowerCase()) && ((country.name.common).toLowerCase()).includes(inputValue.toLowerCase()) 
})}
}
     




//default card
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((countries) => {
      const localRegion = localStorage.getItem("region")
      const inputValue = localStorage.getItem("input-value")
      searchInput.value = inputValue;
      regionSelect.value = localRegion;

      //on loading cards
     if(inputValue && localRegion){
      cards(filterFunctions.filterInputAndRegion(countries,inputValue,localRegion))
     }else if(inputValue){
      cards(filterFunctions.filterByInput(countries,inputValue))
     }else if(localRegion){
      cards(filterFunctions.filterByRegion(countries,localRegion))
     }else{
      cards(countries)
     }
    }   
  );





//search filter
  searchInput.addEventListener('input',(input)=>{
    if(input.target.value === ""){
      console.log('clear')
    }
    const currRegion = localStorage.getItem('region')
    localStorage.setItem('input-value',input.target.value)
    fetch("https://restcountries.com/v3.1/all")
    .then((res)=>res.json())
    .then(countries=>{
      if(input.target.value && currRegion){
        cards(filterFunctions.filterInputAndRegion(countries,input.target.value,currRegion))
      }else if(input.target.value){
        cards(filterFunctions.filterByInput(countries,input.target.value))
      }else if(input.target.value === "" && currRegion){
        cards(filterFunctions.filterByRegion(countries,currRegion))
      }else if(input.target.value === ""){
        cards(countries)
      }
    })
  })


//region filter
  regionSelect.addEventListener('change',()=>{
    console.log(regionSelect.value)
    const currInput = localStorage.getItem("input-value")
    localStorage.setItem('region',regionSelect.value)
    fetch("https://restcountries.com/v3.1/all")
    .then(res=>res.json())
    .then(countries=>{
      if(regionSelect.value && currInput){
        cards(filterFunctions.filterInputAndRegion(countries,currInput,regionSelect.value))
      }else if(regionSelect.value){
        cards(filterFunctions.filterByRegion(countries,regionSelect.value))
      }
    })
  })










