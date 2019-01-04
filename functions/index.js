'use strict'
const requestPromise = require('request-promise');

//Import Dialogflow from Action on Google
const {dialogflow, 
    BasicCard, 
    Image} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

//Image URL
const clearImg = 'http://tmglive.tv/wp-content/uploads/2017/06/Sunny-clear-weather.jpeg';
const cloudsImg = 'https://www.theglobeandmail.com/resizer/BGOzSdJP1VNRXJ9GCYbW9-VYtAk=/1200x0/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/5EG236O7RVH4LKH7RRD4SR5NPI';
const drizzleImg = 'http://www.whitneydrake.com/wp-content/uploads/2012/11/drizzle-11292012.jpg';
const thunderstormImg = 'http://images.skymetweather.com/content/wp-content/uploads/2016/04/Thundershowers-2.jpg';
const hazeImg = 'https://www.healthhub.sg/sites/assets/Assets/Article%20Images/respiratory_haze.jpg?Width=970&Height=405';
const mistImg = 'https://graffitiwallpaper.com/pics/listings/139_wide.jpg';
const rainImg = 'https://www.scienceabc.com/wp-content/uploads/2015/05/Walking-in-Rain.jpg';

app.intent('City', (conv, {geocity}) => {
    // Argument which we are going to pass
    const options = {
        url : `http://api.openweathermap.org/data/2.5/weather?q=${geocity}&appid=cc25719c4ad588df98d2a006cc429a3a`,
        header : {
            'User-Agent' : 'Request-Promise'
        },
        json : true
    }

    return requestPromise.get(options).then((res) =>{
        console.log(res);
        //conv.ask(`<speak> Here's the weather of ${geocity} </speak>`);
        conv.ask(`<speak> Here's the weather of ${geocity}. 
        Temperature is ${Math.floor(res.main.temp - 273)} degree Celsius
        <break time = "200ms"/> ${res.weather[0].main} in ${geocity} 
        <break time = "300ms"/> Check another city</speak>`);

        
        if(res.weather[0].main === 'Clear'){
            conv.ask(new BasicCard({
                text : `${res.weather[0].main}`,
                image : new Image({
                    url : `${clearImg}`,
                    alt : 'Clear'
                })
            }));
        }

        else if(res.weather[0].main === 'Clouds'){
            conv.ask(new BasicCard({
                text : `${res.weather[0].main}`,
                image : new Image({
                    url : `${cloudsImg}`,
                    alt : 'Clouds'
                })
            }));
        }

        else if(res.weather[0].main === 'Drizzle'){
            conv.ask(new BasicCard({
                text : `${res.weather[0].main}`,
                image : new Image({
                    url : `${drizzleImg}`,
                    alt : 'Drizzle'
                })
            }));
        }

        else if(res.weather[0].main === 'Thunderstorm'){
            conv.ask(new BasicCard({
                text : `${res.weather[0].main}`,
                image : new Image({
                    url : `${thunderstormImg}`,
                    alt : 'Thunderstorm'
                })
            }));
        }

        else if(res.weather[0].main === 'Haze'){
            conv.ask(new BasicCard({
                text : `${res.weather[0].main}`,
                image : new Image({
                    url : `${hazeImg}`,
                    alt : 'Haze'
                })
            }));
        }

        else if(res.weather[0].main === 'Mist'){
            conv.ask(new BasicCard({
                text : `${res.weather[0].main}`,
                image : new Image({
                    url : `${mistImg}`,
                    alt : 'Mist'
                })
            }));
        }

        else if(res.weather[0].main === 'Rain'){
            conv.ask(new BasicCard({
                text : `${res.weather[0].main}`,
                image : new Image({
                    url : `${rainImg}`,
                    alt : 'Rain'
                })
            }));
        }

    }).catch((err) => {
        conv.close(`<speak> API server isn't responding </speak>`)
    })
});


//Set Dialog flow to handle HTTP post request
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

//API KEY = cc25719c4ad588df98d2a006cc429a3a

//Calling http://api.openweathermap.org/data/2.5/weather?q=${geocity}&appid=cc25719c4ad588df98d2a006cc429a3a