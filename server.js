'use strict'


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const weatherData = require('./data/weather.json');

server.use(cors());
const PORT = process.env.PORT;

//http://localhost:3010/
server.get('/',(req,res)=>{
    res.send('Hello from the home route')
})

//http://localhost:3010/weather?cityName=Seattle&lat=47.6038321&lon=-122.3300624
server.get('/weather',(req,res)=>{
    const cityName = req.query.cityName;
    const lat = req.query.lat;
    const lon = req.query.lon;
    
    try{
        if(cityName == 'Amman' || cityName == 'Seattle' || cityName =='Paris')
        {
            const result = weatherData.find(item=>{
                if(item.city_name == cityName && item.lat == lat && item.lon == lon){
                    return item;
                }
                else{
                    return 'nothing-found';
                }
            });
            
            const finalResult = [];
            if(result != 'nothing-found'){
                result.data.forEach(item=>{
                    finalResult.push(
                    {
                        description: `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`,
                        date: item.datetime
                    }
                );
            })
            }
            res.send(finalResult);
        }
        else{
            throw '404';
        }
    }
    catch(error){
        const errorData = {
            error: 'Something went wrong',
            status: 500
        }
        res.send(errorData);
    }
    
    // console.log(finalResult);
    
});

server.get('*',(req,res)=>{
    res.status(404).send('PAGE NOT FOUND');
})

server.listen(PORT, () => {
    console.log(`Listening on port....${PORT}`);
})