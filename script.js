let darkMode=localStorage.getItem('darkMode')
const cardContainer=document.querySelector('.card-container')
const filterByRegion=document.querySelector('.filter-container')
const inputData=document.querySelector('.Search-container input')
const themeChanger=document.querySelector('.theme-changer')
const modeContainer=document.querySelector('#mode-container')

let allCountriesData

fetch('https://restcountries.com/v3.1/all').then(res=> res.json()).then(data =>{
renderedCountries(data)
allCountriesData=data
})
//


filterByRegion.addEventListener( 'change', (e) => {
    // console.log(e.target.value);
    
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then(res=> res.json()).then(renderedCountries)
})


function  renderedCountries(data){
    cardContainer.innerHTML=''
    data.forEach(country => {
        // console.log(country);
         const cards=document.createElement('a')
cards.classList.add('cards')
cards.href=`/country.html?name=${country.name.common}`

cards.innerHTML=`
    <img class="flag" src=${country.flags.svg} alt="flag">
            <div class="text-container">
                <h3>${country.name.common}</h3>
                <p><b>Population:</b> ${(country.population).toLocaleString('en-IN')} </p>
                <p><b>Region:</b> ${country.region} </p>
                <p><b>Capital:</b> ${country.capital?.[0]} </p>
            
        </div>`
    // cards.innerHTML=cardHTML
    cardContainer.append(cards)
    });
}

inputData.addEventListener('input', (e)=>{
    // console.log(e.target.value);
   const filteredCountry= allCountriesData.filter((country) =>(country.name.common).toLowerCase().includes((e.target.value).toLowerCase()))
//    console.log(filteredCountry);
    renderedCountries(filteredCountry)
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
// function themeChangerFunction(){
//     if (document.body.className==='dark') {
//         themeChanger.innerHTML=`<i class="fa-solid fa-sun"></i> &nbsp;&nbsp;Light Mode`
//        }
//        else{
//             themeChanger.innerHTML`<i class="fa-regular fa-moon"></i> &nbsp;&nbsp;Dark Mode`
//        }
  
// }

    // we can also create element like below but this is very time taking

    // const countryFlag=document.createElement('img')
// countryFlag.src="https://flagcdn.com/gs.svg"
// countryFlag.classList.add('flag')
// cards.append(countryFlag)
// console.log(cards);
   