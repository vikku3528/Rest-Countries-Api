let darkMode=localStorage.getItem('darkMode')
const countriesName=new URLSearchParams(location.search).get('name')
const countryDetails=document.querySelector('.country-details-container')
const flag=document.querySelector('.country-details-container  img')
const countryName=document.querySelector('.country-name')
const capital=document.querySelector('.capital')
const nativeName=document.querySelector('.native-name')
const population=document.querySelector('.population')
const region=document.querySelector('.region')
const subRigion=document.querySelector('.sub-region')
const currency=document.querySelector('.currency')
const language=document.querySelector('.language')
const tld=document.querySelector('.tld')
const themeChanger=document.querySelector('.theme-changer')
const modeContainer=document.querySelector('#mode-container')

const borderCountries=document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${countriesName}?fullText=true`).then((res) =>res.json())
.then(([country]) => {
    // console.log(country);
    flag.src=country.flags.svg;
    countryName.innerText=country.name.common;
  if (country.name.nativeName) {
    nativeName.innerText= Object.values(country.name.nativeName)[0].common
  } else{
    nativeName.innerText=country.name.common
  };
 population.innerText=country.population.toLocaleString('en-IN')
 if (country.capital) {
    capital.innerText=country.capital[0]
 } 
 region.innerText=country.region
 if (country.subregion) {
  subRigion.innerText=country.subregion
 }
 if (country.currencies) {
  currency.innerText=(Object.values(country.currencies).map((currency) => currency.name).join(', '));
 }
 if (country.languages) {
  language.innerText= Object.values(country.languages).join(', ')
 }
 tld.innerText=country.tld.join(', ')
 if (country.borders) {
  country.borders.forEach((border) => {
    fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json()).then(([borderCountry]) => {
      // console.log(borderCountry);
      const border=document.createElement('a')
      border.innerText=borderCountry.name.common
      border.href=`http://127.0.0.1:5500/country.html?name=${borderCountry.name.common}`
      borderCountries.append(border)
      
      // console.log(border);
    })
  });
  
 }

})
if(darkMode==='enabled'){
  enableDarkMode()
}

function enableDarkMode(){
  document.body.classList.add('dark')
  modeContainer.innerHTML=`<i class="fa-solid fa-sun"></i> &nbsp;&nbsp;Light Mode`
  localStorage.setItem('darkMode',"enabled")

}
function disableDarkMode(){
  document.body.classList.remove('dark')
  modeContainer.innerHTML=`<i class="fa-regular fa-moon"></i> &nbsp;&nbsp;Dark Mode`
  localStorage.setItem('darkMode',null)
}

themeChanger.addEventListener(('click'),()=>{
  darkMode=localStorage.getItem('darkMode')
if (darkMode !=='enabled') {
  enableDarkMode()
}
else{
  disableDarkMode()
}
  
})