
import './App.css'
import { useState } from 'react'
import Axios from 'axios'


function App() {
const [food, setFood] = useState('');
const [days, setDays] = useState(0)  

const handleSubmit = () => {

  Axios.post('http://localhost:3001/insert', {foodName: food, daysSinceIAte:days})
  console.log(`Food: ${food}, Days: ${days}`)

}

  return (  
    <>
     <div className='app'>
      <div style={{marginTop:'100px', display:'flex', flexDirection:'column', gap:'10px', alignItems:"center", paddingLeft:10}}>
      <h1 style={{color:'#37703a'}}>Crud Application with Mern</h1>
      <div style={{display:'flex', flexDirection:'column', gap:'10px', alignItems:"center", maxWidth:'50vw'}} >
        <label>Food Name?</label>
      <input onChange={(e) =>{setFood(e.target.value)}} style={{padding:10, fontSize:'20px',borderRadius:'5px'   }} type='text'></input>
      <label>Days that you ate this?</label>
      <input onChange={(e) =>{setDays(e.target.value)}} style={{padding:10, fontSize:'20px', borderRadius:'5px'   }} type='number'></input>
      <div className='btn'>
        <button  onClick={handleSubmit}style={{padding:10, fontSize:'20px', borderRadius:'10px', background:'#eeeeee', cursor:'pointer'   }}>Send!</button>
      </div>
      </div>
     

      </div>
     

      
     </div>
    </>
  )
}

export default App
