const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const argv = require('yargs').argv;
const app = express()

const apiKey = '0d2f4281dc7fce54bbefa851b1baf1ca';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
//   res.send(/views/)
})

app.post('/', function (req, res) {
    console.log(req.body.city);
    // res.render('index');
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
    if(err){
        // console.log('error:', error);
        res.render( 'index', {weather: null, error: 'Error, please try again'});
    } else {
        let weather = JSON.parse(body);
        if( weather.main == undefined ){
            res.render('index', {weather: null, error: 'Error, please try again'});
        }
        else{
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render( 'index', {weather: weatherText, error: null });
        }
        // console.log(message);
        // console.log('body:', body);
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
