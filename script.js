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
    var getcity = $("#entercity").val()
    $("#Citydate").html(getcity)
    //Local Storage

    localStorage.setItem(count,getcity);


   // var aLength = storage.length


    adder()
    //Button LIst for city
    function adder(){
        event.preventDefault
        idcount=0;
        if ($("#entercity").html !== ("")) {
            $(".addcity").append("<tr>").append("<td class='obtain'>")
            $(".obtain").each(function(){
                $(this).attr("id", idcount);
                $("#"+(idcount)).html(getcity)
                idcount++
                
            })
            
            // .attr("id", idcount);
            // //$("<td>").attr("id", idcount)
            // event.preventDefault
        
            
            // console.log(getcity)
            // idcount++
        } 
          
    }
    

    //API
    var apikey = "a27727791952336f9341e78353fcabb3"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + getcity + "&appid=" + apikey
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
            //get t,h,w,u to main page with city
            var ftoc= ((response.current.temp) - 273.15) * (9/5) + 32;
            var round = Math.round(10*ftoc)/10;     // round X to tenths
            $("#humidity").html(response.current.humidity);
            $("#temp").html(round);
            $("#wind").html(response.current.wind_speed);
            $("#uv").html(response.current.uvi);
             //bring icon to current weather
            var iconcode = response.current.weather[0].icon;
            var weathersite="http://openweathermap.org/img/wn/"+iconcode+"@2x.png";
            $("#code").attr("src",weathersite);
            //five day forecast
            datos();    
            function datos(){
                counter=1
                $(".mb-0").each(function(){
                  $(this).html(month +"/"+(utcdate+counter)+"/" + fullyear)
                  //images
                  var lateweather=response.daily[counter].weather[0].icon;
                  var a = $("<img>");
                  a.attr("src","http://openweathermap.org/img/wn/"+lateweather+"@2x.png");
                  $(this).append(a);
                  //temp and humidity
                  var sm = $("<small>");
                  $(this).append("<div>");
                  $(this).append(sm);
                  $(this).append("<div>");
                  var temcon= ((response.daily[counter].temp.max) - 273.15) * (9/5) + 32
                  temround = Math.round(10*temcon)/10;
                  sm.html("Temp: " + temround+"°F"+"<br>"+"Humidity: "+response.daily[counter].humidity+"%");                 
                  counter++
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