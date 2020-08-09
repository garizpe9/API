$("#CitySearch").click(city)

//dates
var timedate = $("#timedate").html("("+(moment().format('l')+")"));
var newdate =(new Date());
var month = parseInt(newdate.getMonth()+1);
var utcdate=parseInt(newdate.getUTCDate());
var fullyear=parseInt(newdate.getFullYear());
count=0;
//onclick API Grab
function city(){
    event.preventDefault;
    console.log(month)
    var getcity = $("#entercity").val()
    $("#Citydate").html(getcity)
    var apikey = "a27727791952336f9341e78353fcabb3"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + getcity + "&appid=" + apikey
    var lat =""
    var lon =""
    $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response) {
        lat = (response.city.coord.lat)
        lon = (response.city.coord.lon)
    var weatherurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon="+ lon +"&appid=" + apikey
        $.ajax({
            url: weatherurl,
            method: "GET",
        }).then(function(response) {
            var ftoc= ((response.current.temp) - 273.15) * (9/5) + 32;
            var round = Math.round(10*ftoc)/10;     // round X to tenths
            $("#humidity").html(response.current.humidity);
            $("#temp").html(round);
            $("#wind").html(response.current.wind_speed);
            $("#uv").html(response.current.uvi);
            datos();    
            function datos(){
                $(".mb-0").each(function(){
                  $(this).html(month +"/"+(utcdate+count)+"/" + fullyear)                
                  var sm = $("<small>");
                  $(this).append("<div>");
                  $(this).append(sm);
                  var temcon= ((response.daily[count].temp.max) - 273.15) * (9/5) + 32
                  temround = Math.round(10*temcon)/10;
                  sm.html("Temp: " + temround+"°F"+"<br>"+"Humidity: "+response.daily[count].humidity+"%");                 
                  count++
                })
            }  
        })
    });
}





//do calcs for rest of them

//on click function save the city name with unique id (maybe length of local storage)
//loop through local storage after every enter button 
//as well as beginning of rendering so every local storgae has a button with name of city in it
//on click of city take the name of the city and complete an ajax call and do cards 