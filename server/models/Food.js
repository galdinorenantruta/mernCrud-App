const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    foodName: {
        type:String,
        required: true
    },
    daysSinceIAte:{
        type:Number,
        required: true
    }

})

const Food = mongoose.model("fooddata", foodSchema)

module.exports = Food