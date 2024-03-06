
import './App.css'
import { useState, useEffect } from 'react'
import Axios from 'axios'


function App() {
const [food, setFood] = useState('');
const [days, setDays] = useState(0)  
const [foodList, setFoodList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/read')
    .then(response => {
      console.log(response.data);
      setFoodList(response.data)
    })
    .catch(error => {
      console.log(error);
    });
    },[])
   

const handleSubmit = () => {

  Axios.post('http://localhost:3001/insert', {foodName: food, daysSinceIAte:days})
  console.log(`Food: ${food}, Days: ${days}`)

}

  return (  
    <>
     <div className='app'>
      <div style={{marginTop:'100px', display:'flex', flexDirection:'column', gap:'10px', alignItems:"center", paddingLeft:10}}>
      <h1 style={{color:'#37703a'}}>Crud Application with Mern</h1>
      <div style={{display:'flex', flexDirection:'column', gap:'10px', alignItems:"center", width:'50vw'}} >
        <label>Food Name?</label>
      <input onChange={(e) =>{setFood(e.target.value)}} style={{padding:10, fontSize:'20px',borderRadius:'5px'   }} type='text'></input>
      <label>Days that you ate this?</label>
      <input onChange={(e) =>{setDays(e.target.value)}} style={{padding:10, fontSize:'20px', borderRadius:'5px'   }} type='number'></input>
      <div className='btn'>
        <button  onClick={handleSubmit}style={{padding:10, fontSize:'20px', borderRadius:'10px', background:'#eeeeee', cursor:'pointer'   }}>Send!</button>
      </div>
      </div>
      <div style={{marginBottom:'60px'}} >
        <h2 style={{marginTop:'40px', marginBottom:'20px'}}>Food List</h2>
        
          {foodList.map((value, index)=>{
            return (
              <div style={{marginTop:'10px', padding:'20px'}} key={index}>
                <h2>Food</h2>
                 <h3>{value.foodName}</h3>
                 <h2>Days since I ate this</h2>
              <h3>{value.daysSinceIAte}</h3>
              <hr />
               </div>
            )

          })}
        
      </div>
     

      </div>
     

      
     </div>
    </>
  )
}

export default App
