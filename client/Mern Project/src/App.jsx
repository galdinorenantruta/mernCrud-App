import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [food, setFood] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        console.log(response.data);
        setFoodList(response.data.map(item => ({ ...item, newFood: "" }))); // Adicionando o estado newFood a cada item da lista
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: food,
      daysSinceIAte: days,
    })
      .then((response) => {
        console.log(response.data);
        // Limpar campos de input
        setFood("");
        setDays(0);
        // Atualiza a lista após a inserção bem-sucedida
        setFoodList([...foodList, { ...response.data, newFood: "" }]); // Adicionando o estado newFood ao novo item da lista
      })
      .catch((error) => {
        console.log(error); // Tratar erros
      });
  };

  const updateFood = (id, newFood) => {
    Axios.put("http://localhost:3001/update", { id: id, newFood: newFood })
      .then((response) => {
        console.log(response.data);
        // Atualiza a lista após a atualização bem-sucedida
        Axios.get("http://localhost:3001/read")
          .then((response) => {
            console.log(response.data);
            setFoodList(response.data.map(item => ({ ...item, newFood: "" }))); // Adicionando o estado newFood a cada item da lista
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error); // Tratar erros
      });
  };

  const deleteFood = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        // Remove o item da lista após a exclusão bem-sucedida
        setFoodList(foodList.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.log(error); // Tratar erros
      });
  };

  return (
    <>
      <div className="app">
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <h1 style={{ color: "#37703a" }}>Crud Application with Mern</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              width: "50vw",
            }}
          >
            <label>Food Name?</label>
            <input
              value={food}
              onChange={(e) => {
                setFood(e.target.value);
              }}
              style={{ padding: 10, fontSize: "20px", borderRadius: "5px" }}
              type="text"
            ></input>
            <label>Days that you ate this?</label>
            <input
              value={days}
              onChange={(e) => {
                setDays(e.target.value);
              }}
              style={{ padding: 10, fontSize: "20px", borderRadius: "5px" }}
              type="number"
            ></input>
            <div className="btn">
              <button
                onClick={handleSubmit}
                style={{
                  padding: 10,
                  fontSize: "20px",
                  borderRadius: "10px",
                  background: "#eeeeee",
                  cursor: "pointer",
                }}
              >
                Send!
              </button>
            </div>
          </div>
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
              Food List
            </h2>

            {foodList.map((item, index) => {
              return (
                <div style={{ marginTop: "10px", padding: "20px" }} key={index}>
                  <h2>Food</h2>
                  <h3>{item.foodName}</h3>
                  <h2>Days since I ate this</h2>
                  <h3>{item.daysSinceIAte}</h3>
                  <div>
                    <input
                      value={item.newFood}
                      onChange={(e) => {
                        const updatedFoodList = [...foodList];
                        updatedFoodList[index].newFood = e.target.value;
                        setFoodList(updatedFoodList);
                      }}
                      placeholder="New Food Name"
                      type="text"
                    ></input>{" "}
                    <button
                      onClick={() => updateFood(item._id, item.newFood)}
                      style={{
                        padding: 5,
                        fontSize: "14px",
                        borderRadius: "10px",
                        background: "#eeeeee",
                        cursor: "pointer",
                      }}
                    >
                      Change Name
                    </button>
                  </div>
                  <button
                    style={{
                      padding: 6,
                      marginBottom: "10px",
                      fontSize: "16px",
                      borderRadius: "10px",
                      background: "#eeeeee",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteFood(item._id)}
                  >
                    Delete
                  </button>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
