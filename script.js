$("#CitySearch").click(city)

function city(){
    event.preventDefault;
    var getcity = $("#entercity").val()
    var apikey = "a27727791952336f9341e78353fcabb3"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + getcity + "&appid=" + apikey
    var lat =""
    var lon =""
    var wait = false
    $.ajax({
        url: queryURL,
        method: "GET",
        async: true
      }).then(function(response) {
        wait=true
        //console.log(response);
        lat = (response.city.coord.lat)
        lon = (response.city.coord.lon)

       
    var weatherurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon="+ lon +"&appid=" + apikey

        $.ajax({
            url: weatherurl,
            method: "GET",
            async: true
        }).then(function(response) {
            console.log(response);
            var ftoc= ((response.current.temp) - 273.15) * (9/5) + 32
            $("#humidity").html(response.current.humidity)
            $("#temp").html(ftoc)
            
        })
     

    });
    
    
}

//do calcs for rest of them
//five separate  cards wit hdiffernt ids 
//use daily array and append
//on click function save the city name with unique id (maybe length of local storage)
//loop through local storage after every enter button 
//as well as beginning of rendering so every local storgae has a button with name of city in it
//on click of city take the name of the city and complete an ajax call and do cards 