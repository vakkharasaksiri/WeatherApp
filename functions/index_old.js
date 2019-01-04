'use strict'
const requestPromise = require('request-promise');

//Import Dialogflow from Action on Google
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

app.intent('City', (conv, {geocity}) => {
    // Argument which we are going to pass
    const options = {
        url : `https://api.chucknorris.io/jokes/random`,
        header : {
            'User-Agent' : 'Request-Promise'
        },
        json : true
    }

    return requestPromise.get(options).then((res) =>{
        console.log(res);
        conv.close(`<speak> ${res.value} </speak>`)
    }).catch((err) => {
        conv.close(`<speak> API server isn't responding </speak>`)
    })
});


//Set Dialog flow to handle HTTP post request
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

//API KEY = cc25719c4ad588df98d2a006cc429a3a