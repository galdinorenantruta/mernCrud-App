// server.js
const express = require('express');
const mongoose = require('mongoose');
const FoodModel = require('./models/Food');
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

    const foodModel = new FoodModel({ foodName:foodName, daysSinceIAte: daysSinceIAte });
    try {
        const savedFood = await foodModel.save();
        console.log("resposta:", savedFood)
        resp.send(savedFood);
    } catch (error) {
        console.log(error);
        resp.status(500).send('Erro ao salvar o alimento.');
    }
});

app.delete('/delete/:id', async (req, res) =>{

const id = req.params.id

await FoodModel.findOneAndDelete(id).exec()
res.send("Item deletado" )
})

app.get('/read', async (req, res) => {
    try {
        const result = await FoodModel.find({});
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/update', async (req, res) => {
    const newFood = req.body.newFood
    const id = req.body.id
    
    try {
      const updateFood = await FoodModel.findById(id);
      updateFood.foodName = newFood;
      await updateFood.save();
      res.status(200).send('Alimento atualizado com sucesso.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao salvar o alimento.');
    }
});

const PORT = process.env.PORT || 3001; 

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
