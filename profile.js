const darkLightMode = document.querySelector(".dark-light-mode")
const moonSun = document.querySelector(".fa-regular")
const modeName = document.querySelector(".mode-name")


document.body.classList.add(localStorage.getItem("page-mode"))
modeName.innerText = localStorage.getItem("page-mode") == "dark" ? "Light Mode" : "Dark Mode"; 
moonSun.className = localStorage.getItem("page-mode") == "dark"?"fa-regular fa-sun":"fa-regular fa-moon";


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

// countryProfile
const mainContainer = document.querySelector(".main-container");
const profileContainer = document.querySelector(".profile-container");
const serachUrl = new URLSearchParams(location.search).get("search");
const image = document.querySelector(".image");
const countryTitle = document.querySelector(".country-title");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const profileBorderCountry = document.querySelector(".profile-border-country")
const backBtnContainer = document.querySelector(".btn-container")

backBtnContainer.addEventListener('click',()=>{
  history.back()
})

fetch(`https://restcountries.com/v3.1/name/${serachUrl}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
      image.src = country.flags.svg;
      countryTitle.innerText = country.name.common;
      nativeName.innerText = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common  
      population.innerText = country.population ? country.population.toLocaleString() : "Not Found";
      region.innerText = country.region ? country.region : "No Region";
      subRegion.innerText = country.subregion ? country.subregion : subRegion.parentElement.remove();
      capital.innerText = country.capital? country.capital.join(", ") : capital.parentElement.remove();
      topLevelDomain.innerText = country.tld ? country.tld.join(", ") : 'Not Found';
      currencies.innerText = country.currencies ?  Object.values(country.currencies).map(values=>values.name).join(", "): currencies.parentElement.remove();
      languages.innerText = country.languages ?  Object.values(country.languages).join(", ") : languages.parentElement.remove();
      if(country.borders){
        country.borders.forEach(border=>{
          const aHref = document.createElement('a')
          aHref.classList.add('border-aHref')
          fetch(`https://restcountries.com/v3.1/alpha/${border}`).then(res=>res.json())
          .then(([country])=>{
            aHref.innerText = country.name.common;
            aHref.href = `./profile.html?search=${country.name.common}`
          })
          profileBorderCountry.append(aHref)
        })
      }else{
        profileBorderCountry.remove()
      }
  })
