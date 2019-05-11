const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2f63ccb144935bec672706807f6fb3d8/${latitude},${longitude}?units=si`;
    request({ url,  json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect weather service !", undefined);
        } else if (body.error) {
            console.log("Unable to Find Location", undefined);
        }
        else {
            console.log(body.daily.data[0]);
            const {temperature,precipProbability} = body.currently;
            const {daily} = body;
            callback(undefined,`${daily.data[0].summary} it is currently ${temperature} degrees out.  the high todaay is :${daily.data[0].temperatureHigh}% with low :${daily.data[0].temperatureLow}% , there is ${precipProbability}% chance of Rain..`);
        }
    })
}


module.exports = forecast;