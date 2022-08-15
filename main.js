API_KEY =`d1cb84f88cf4a4a74bc01bf0c0c81404`
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#examples



let latlonlist = [];
function geoFindMe() {
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      // i added
      latlonlist.push(latitude)
      latlonlist.push(longitude)
      const weather_dict = getWeather(latlonlist[0], latlonlist[1])
      
      console.log(weather_dict)
      
      //
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
      
    }
    
    
  }
  document.querySelector('#find-me').addEventListener('click', geoFindMe);
////////////////





const getWeather = async (lat,lon)=> {
    
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
    const data = await res.json()
    if (data){
    
      const p = document.createElement('p')
      p.innerHTML = ''
      p.innerHTML = `
    <div class="row justify-content-md-center">
        <div class="card border-dark mb-3 mt-5 text-center" style="max-width: 35rem;">
        <div class="card-header display-5">${data.name}<p>${today_date}</p></div>
       
        <div class="card-body text-dark">
        
        <h6 class="card-title">${titleCase(data.weather[0].description)}</h6>
        <p><b>Hi:</b>${Math.round(data.main.temp_max)} <b>Lo:</b>${Math.round(data.main.temp_min)} <b>Humidity</b>:${Math.round(data.main.humidity)}%</p>
        <p class="card-text"><b>Current Temperature</b> ${Math.round(data.main.temp)} <br><b>Feels like</b> ${Math.round(data.main.feels_like)}</p>
        
        </div>
        </div>
    </div>
     `;
      document.querySelector('#get_weather').append(p)
      console.log(data)
    };
    
    return data
    };


    



const weather_form  = document.querySelector('#get_weather')
weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const cc_name =  e.path[0][0].value
    const my_array= cc_name.split(",")
    console.log(my_array)
    const city_name = my_array[0]
    console.log(city_name)
    const state_name = my_array[1].trim()
    console.log(state_name)
   
    console.log(city_name , state_name)
    const weather_info = getGeo(titleCase(city_name), titleCase(state_name))

    return 
});



const getGeo = async (city,state,country)=> {
      const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&limit=1&appid=${API_KEY}`)
      const data = await res.json()
      console.log(data)
      if (data){
      
        getWeather(data[0].lat, data[0].lon)}
      
        };
       

  
let date = new Date().getDate()
let month = new Date().getMonth()
let day = new Date().getDay()
console.log(day, month, date)
let t_day
let t_month

switch(day){
    case 0: t_day = 'Sunday'
    break;
    case 1: t_day = 'Monday'
        break;
    case 2: t_day = 'Tuesday'
        break;
    case 3: t_day = 'Wednesday'
        break;
    case 4: t_day = 'Thursday'
        break;
    case 5: t_day = 'Friday'
        break;
    case 6: t_day = 'Saturday'
        break;}

switch(month){
    case 0: t_month = 'January'
        break;
    case 1: t_month = 'February'
        break;
    case 2: t_month = 'March'
        break;
    case 3: t_month = 'April'
        break;
    case 4: t_month = 'May'
        break;
    case 5: t_month = 'June'
        break;
    case 6: t_month = 'July'
        break;
    case 7: t_month = 'August'
        break;
    case 8: t_month = 'September'
        break;
    case 9: t_month = 'October'
        break;
    case 10: t_month = 'November'
        break;
    case 11: t_month = 'December'
        break;

};
let today_date = `${t_day}, ${t_month} ${date}`




const testGeo = async (city,state)=> {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&limit=1&appid=${API_KEY}`)
    const data = await res.json()
    console.log(data)
    if (data){
    
      getWeather(data[0].lat, data[0].lon)}
    
      };

     



      function titleCase(str) {
        str = str.toLowerCase()
                 .split(' ') 
                 .map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
      });
       return str.join(' '); 
      }
      
      