
        // Weather Underground API data
        function getWeather(locationUrl) {
            $.ajax({
                url : 'http://api.wunderground.com/api/' + api + '/geolookup/conditions/forecast10day/q/' + locationUrl ,
                dataType : "jsonp",
                success : function(parsed_json) {
                    var city = parsed_json['location']['city'];
                    var state = parsed_json['location']['state'];
                    var country = parsed_json['location']['country'];
                    var countryName = parsed_json['location']['country_name'];
                    var temp_f = parsed_json['current_observation']['temp_f'];
                    var temp_c = parsed_json['current_observation']['temp_c'];
                    var feels_f = parsed_json['current_observation']['feelslike_f'];
                    var feels_c = parsed_json['current_observation']['feelslike_c'];
                    var weather = parsed_json['current_observation']['weather'];
                    var humidity = parsed_json['current_observation']['relative_humidity'];
                    var windDir = parsed_json['current_observation']['wind_dir'];
                    var windMPH = parsed_json['current_observation']['wind_mph'];
                    var windKPH = parsed_json['current_observation']['wind_kph'];
                    var icon = parsed_json['current_observation']['icon_url'];
                    var forPOP1 = parsed_json['forecast']['simpleforecast']['forecastday'][0]['pop'];

                    //This is from forecast High & Low Temps
                    var forTempHighF = parsed_json.forecast.simpleforecast.forecastday[0].high.fahrenheit;
                    var forTempHighC = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['celsius'];
                    var forTempLowF = parsed_json.forecast.simpleforecast.forecastday[0].low.fahrenheit;
                    var forTempLowC = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['celsius'];


                    //Non US countries without states will use their country name
                    if(!state || state == '') {
                        state = countryName;

                    }



                    //This is for the background image to change based on the current weather
                    var backImage;

                    if(weather == 'Partly Cloudy' || weather == 'Mostly Sunny' || weather == 'Partly Sunny' || weather == 'Scattered Clouds') {
                        backImage = 'partly-cloudy-fotonin-com.jpg';
                    } else if (weather == 'Cloudy' || weather == 'Mostly Cloudy' || weather == 'Overcast') {
                        backImage = 'cloudy-fotonin-com.jpg';
                    } else if (weather == 'Chance Tstorms' || weather == 'Tstorms') {
                        backImage = 't-storms-fotonin-com.jpg';
                    } else if (weather == 'Chance Snow' || weather == 'Snow') {
                        backImage = 'snow-fotonin-com.jpg';
                    } else if (weather == 'Chance Sleet' || weather == 'Sleet') {
                        backImage = 'sleet-fotonin-com.jpg';
                    } else if (weather == 'Chance Rain' || weather == 'Rain') {
                        backImage = 'rain-fotonin-com.jpg';
                    } else if (weather == 'Chance Flurries' || weather == 'Flurries') {
                        backImage = 'flurries-fotonin-com.jpg';
                    } else if (weather == 'Fog' || weather == 'Hazy'){
                        backImage = 'fog-fotonin-com.jpg';
                    } else {
                        backImage = 'sunny-fotonin-com.jpg';
                    }


                    $('body').css("background-image","url(../images/" + backImage + ")");


                    // Variables for the temp metric switch to change the C | && F |
                    var degreeF = '&deg;F &#124;';
                    var switchF = '&deg;F';

                    var degreeC = '&deg;C &#124;';
                    var switchC = '&deg;C';

                    // Variables
                    var temp, feels, tempHigh, tempLow, degreeSymbolBar, degreeSymbol, switchSymbol, unit;


                    // If in F country, use F, otherwise C
                    if(country == 'US'|| country == 'BS' || country == 'BH' || country == 'GC' || country == 'American Samoa') {
                        unit = "f";
                        temp = temp_f;
                        feels = feels_f;
                        tempHigh = forTempHighF;
                        tempLow = forTempLowF;
                        wind = windMPH + ' mph ';
                        degreeSymbolBar = degreeF;
                        degreeSymbol = switchF;
                        switchSymbol = switchC;
                        writeToPage();

                    } else {
                        unit = "c";
                        temp = temp_c;
                        feels = feels_c;
                        tempHigh = forTempHighC;
                        tempLow = forTempLowC;
                        wind = windKPH + ' kph ';
                        degreeSymbolBar = degreeC;
                        degreeSymbol = switchC;
                        switchSymbol = switchF;
                        writeToPage();
                    }

                    //Switch when clicking the linked temp metric to the other unit
                    $('#switchMetric').click(function() {
                        if(temp == temp_f) {
                            unit = "c";
                            temp = temp_c;
                            feels = feels_c;
                            degreeSymbol = switchC;
                            degreeSymbolBar = degreeC;
                            switchSymbol = switchF;
                            wind = windKPH + ' kph ';
                            tempHigh = forTempHighC;
                            tempLow = forTempLowC;
                            writeToPage();
                        } else {
                            unit = "f";
                            temp = temp_f;
                            feels = feels_f;
                            degreeSymbol = switchF;
                            degreeSymbolBar = degreeF;
                            switchSymbol = switchC;
                            wind = windMPH + ' mph ';
                            tempHigh = forTempHighF;
                            tempLow = forTempLowF;
                            writeToPage();
                        }



                    });

                    function writeToPage() {
                        $('#degree').html(degreeSymbolBar);
                        $('#degree2').html(degreeSymbol);
                        $('#temp').html(Math.round(temp));
                        $('#feelsLike').html(Math.round(feels));
                        $('#wind').html(wind + windDir);
                        $('#humidity').html(humidity);
                        $('#precip').html(forPOP1 + '%');
                        $('#icon').html('<img src="' + icon + '" />');
                        $('#location').html(city + ' ' + state);
                        $('#weather').html(weather);
                        $('#highLow').html('H' + tempHigh + ' | ' + 'L' + tempLow);
                        $('#switchMetric').html(switchSymbol);




                        // 5 day forcast

                        // i = 1 to start the forcast the day after today
                        for(var i = 1; i < 6; i++) {

                            futureTempHighF = parsed_json.forecast.simpleforecast.forecastday[i].high.fahrenheit;
                            futureTempHighC = parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius'];
                            futureTempLowF = parsed_json.forecast.simpleforecast.forecastday[i].low.fahrenheit;
                            futureTempLowC = parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['celsius'];
                            var futureWeather = parsed_json['forecast']['simpleforecast']['forecastday'][i]['conditions'];
                            var futureImage = parsed_json['forecast']['simpleforecast']['forecastday'][i]['icon_url'];
                            var futureDay = parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday_short'];
                            var futureMO = parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['month'];
                            var futureDY = parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['day'];
                            var futurePOP = parsed_json['forecast']['simpleforecast']['forecastday'][i]['pop'];

                            if (unit == "f") {
                                futureTempHigh = futureTempHighF;
                                futureTempLow = futureTempLowF;
                            } else {
                                futureTempHigh = futureTempHighC;
                                futureTempLow = futureTempLowC;
                            }

                            $('#forDate' + i).html(futureDay + '<br />' + futureMO + '/' + futureDY);
                            $('#forTemp' + i).html(futureTempHigh + ' | ' + futureTempLow);
                            $('#forImage' + i).html('<img src="' + futureImage + '" />');
                            $('#forWeather' + i).html(futureWeather);
                            $('#forPop' + i).html(futurePOP + '% Precip');

                        }
                    }

                },

                // Trying to figure out the error function on the api
                error : function(e) {
                    alert(e);
                },

                timeout: function(e) {
                    alert(e);
                }


            });



        }
        $(document).ready(function($) {
            // used to pass the location to the getWeather()
            var locationUrl;

            //gets location when entered in the location input field and passes into getweather()
            $('#addressForm').submit(function(){

                var location = $('#stateInput').val();
                // regex to replace spaces in city, state, country with %20 and add .json
                var locationUrl = location.replace(/,\s/g, "%20") + '.json';

                getWeather(locationUrl);

                //gets the value to clear what is in the field
                $('#stateInput').val('');

                //prevents the form from refreshing the page
                event.preventDefault();

            });



            //if no location set, pull auto ip and display weather
            if (!locationUrl) {

                //location pulled from weather undergrounds auto ip location and passes into getweather()
                var locationUrl = 'autoip.json';
                getWeather(locationUrl);

                // for smaller screens, change the css of the form
                if ( $(window).width() < 514) {
                    $('form').removeClass('pull-right');
                    $('form').addClass('center-block text-center');
                }

            }


            // wunderground.com autocomplete url https://www.wunderground.com/weather/api/d/docs?d=autocomplete-api&MR=1
            //Using http://easyautocomplete.com/guide#sec-data-remote

            //Auto complete shows when typing
            var options = {

                url: function(phrase) {
                    return "http://autocomplete.wunderground.com/aq?query=" + phrase + "&cb=call=?";
                },

                placeholder: "City, State or Zip Code",

                //json returned with RESULTS object
                listLocation: "RESULTS",

                getValue: "name",

                // delay in results by ms
                requestDelay: 300,

                //matches the query by putting text in bold
                list: {
                    match: {
                        enabled: true
                    }
                }
            };

            $("#stateInput").easyAutocomplete(options);

        });
