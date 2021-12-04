const moment = require("moment-timezone");

exports.handler = async (event, context) => {
    var timezone = decodeURIComponent(event.pathParameters.tz);

    var today = moment().tz(timezone).format('MM/DD/YYYY');
    var thisYear = moment().tz(timezone).format('YYYY');
    var nextYear = moment().tz(timezone).add(1, 'y').format('YYYY');
    var thisFestivus = moment(thisYear + '-12-23').format('MM/DD/YYYY');
    var correctFestivus = '';
    var isFestivus = false;
    if (moment(today).tz(timezone).isBefore(thisFestivus)) {
      correctFestivus = thisFestivus;
    } else {
      correctFestivus = moment(nextYear + '-12-23').tz(timezone).format('MM/DD/YYYY');
    }
    if (moment(today + " " + moment().tz(timezone).format('h:mm:ss A')).isBetween(moment(correctFestivus + " 12:00:00 AM"), moment(correctFestivus + " 11:59:59 PM"))) {
    	isFestivus = true;
    }
    var responseBody = {
        "currentDate": today,
        "currentDateTime": today + " " + moment().tz(timezone).format('h:mm:ss A'),
        "festivusDate": correctFestivus,
        "festivusDateTimeStart": correctFestivus + " 12:00:00 AM",
        "isFestivus": isFestivus
    };
    var response = {
        "headers": {
            "Access-Control-Allow-Origin": "https://festivusfortherestof.us",
        },
        "statusCode": 200,
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false,
    };
    return response;
};
