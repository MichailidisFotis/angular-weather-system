import axios from "axios"
import dotenv from "dotenv"
import userModel from "../users/models/userModel.js"



dotenv.config()


const get_current_forecasts =  async(req ,res)=>{

    var user_id  =  req.session.user_id



    var forecasts  = []

    var api_key =  process.env.WEATHER_API_KEY


    const user_preferences =  await userModel.findOne({
        _id :user_id
    } , 'preferences')



   for(var preference of user_preferences.preferences){
        await axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${preference}&aqi=no`)
        .then((response)=>{

              forecasts.push({
                "name":response.data.location.name ,
                "time":  ""+response.data.location.localtime.split(" ")[1],
                "temperature_celc":response.data.current.temp_c,
                "condition":response.data.current.condition,
                "wind_kph":response.data.current.wind_kph,
                "humidity":response.data.current.humidity
            });
            


        })

    
    }


    return res.send({
        forecasts:forecasts
    })


    


}









export default{get_current_forecasts}