// server.js
const express = require('express');
const mongoose = require('mongoose');
const Food = require('./models/Food');
const cors = require('cors')

const app = express();


app.use(express.json());
app.use(cors())

mongoose.connect("mongodb+srv://renan:26305698@crud.l9ezevy.mongodb.net/fooddata?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true // Adicione esta linha para evitar warnings de depreciação
});

app.post('/insert', async (req, resp) => {
    const foodName = req.body.foodName
    const daysSinceIAte = req.body.daysSinceIAte

    const food = new Food({ foodName:foodName, daysSinceIAte: daysSinceIAte });
    try {
        const savedFood = await food.save();
        console.log("resposta:", savedFood)
        resp.send(savedFood);
    } catch (error) {
        console.log(error);
        resp.status(500).send('Erro ao salvar o alimento.');
    }
});


app.get('/read', async (req, res) => {
    try {
        const result = await Food.find({});
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3001; 

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
