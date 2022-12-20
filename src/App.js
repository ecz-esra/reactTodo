import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App() {

const[todolar,setTodolar]=useState(null)
const[title,setTitle]=useState("")
const [result,setResult]=useState(false)
const [resultMessage,setResultMessage]=useState("")
const [duzenlemevarMi,setDuzenlemeVarMi]=useState(false)
const [duzenlenecekTodo,setDuzenlenecekTodo]=useState(null)
const [duzenlenecekTitle,setDuzenlenecekTitle]=useState("")
 //const deleteTodo=(id)=>{
  //const filteredTodos= todolar.filter((i)=> i.id !== id)
  //setTodolar(filteredTodos);
 //}
 const deleteTodo=(id)=>{
axios.delete(`http://localhost:3004/todos/${id}`)
.then((response)=>{
  setResult(true)
  setResultMessage("Delete is successful")
})
.catch((error)=>{
  setResult(true)
  setResultMessage("An error occured while saving")
})
 }

 const changeTodosCompleted=(todo)=>{
 console.log(todo)
 const updatedTodo={
  ...todo,
  completed:!todo.completed
 }
   axios.put(`http://localhost:3004/todos/${todo.id}`,updatedTodo)
   .then((response)=>{
    setResult(true)
    setResultMessage("Todo is successfully updated.")
   })
   .catch((error)=>{
    setResult(true)
    setResultMessage("Someting has gone wrong!")
   })
 }

 
 useEffect(()=>{
  axios.get("http://localhost:3004/todos")
   .then((response)=>{
    console.log(response.data)
    setTodolar(response.data)
    
   })
   .catch((error)=>{
    console.log(error)
   })
},[result])


const handleForm=(event)=>{
 event.preventDefault()
 if(title === ""){
  alert("Can't be empty!")
  return
 }
  const newTodo={
    id:String(new Date().getTime()),
    title:title,
    date:new Date(),
    completed:false
  }
  axios.post("http://localhost:3004/todos", newTodo)
  .then((response)=>{
    //setTodolar([...todolar,newTodo])
    setTitle("")
    setResult(true)
    setResultMessage('Enrolment successful')
  
  })
  .catch((error)=>{
    setResult(true)
    setResultMessage('An error occured while saving.')
    
  })
 }
 const updatedForm=(event)=>{
  event.preventDefault()
  if(duzenlenecekTitle === ''){
    alert('Title bos birakilamaz!')
  
  return
 }
 const updatedTodo={
  ...duzenlenecekTodo,
  title:duzenlenecekTitle
}
axios.put(`http://localhost:3004/todos/${updatedTodo.id}`,updatedTodo)
.then((response)=>{
   setResult(true)
   setResultMessage("Guncelleme islemi basarili")
   setDuzenlemeVarMi(false)
   })
   .catch((error)=>{
     setResult(true)
     setResultMessage("Guncelleme islemi sirasinda bir hata olustu!")
   })
  }


if(todolar === null){
  return(
    <h1>Loading...</h1>
  )
}



  return (
    <div className="container">
      {
        result === true && (
          <div style={{
            position:'absolute',
            top:0,
            left:0,
            width:"100%",
            height:"100vh",
            backgroundColor:"rgba(0,0,0,0.3)",
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            zIndex:1
          }}>
        <div className="alert alert-success" role="alert">
          <p>{resultMessage}</p>
          <div className='d-flex justify-content-center'>
            <button onClick={()=>setResult(false)} className='btn btn-sm btn-outline-primary'>Close</button>
          </div>
         </div>
         </div>
        )
      }
     <div  className="row my-5">
      <form onSubmit={(handleForm)}> 
      <div className="input-group mb-3">
  <input
  value={title} 
  onChange={(event)=>setTitle(event.target.value)}
  type="text" 
  className="form-control" 
  placeholder="Type your todo..." />
  <button className='btn btn-primary' type='submit'>ADD</button>
 
</div>
      </form>
</div>
 {
  duzenlemevarMi === true && (
    <div className='row my-5'>
<form onSubmit={updatedForm}>
<div className="input-group mb-3">
  <input
  value={duzenlenecekTitle} 
  onChange={(event)=>setDuzenlenecekTitle(event.target.value)}
  type="text" 
  className="form-control" 
  placeholder="Type your todo..." />
  <button onClick={()=>setDuzenlemeVarMi(false)} className='btn btn-danger'>GiveUp</button>
  <button className='btn btn-primary' type='submit'>Update</button>
 </div>
</form>
</div>
  )
 }
     { todolar.map((todo)=>(
     <div key={todo.id} className="alert alert-secondary d-flex justify-content-between align-items-center" role="alert">
       <div>
       <h1 style={{
        textDecoration:todo.completed === true ? "line-through" : "none" ,
        color:todo.completed === true ? "red" : "black"}}>{todo.title}</h1>
       <p>{new Date(todo.date).toLocaleString()}</p>
       </div>
       <div>
       <div className="btn-group" role="group" aria-label="Basic example">
  <button onClick={()=>{
    setDuzenlemeVarMi(true)
   setDuzenlenecekTodo(todo)
   setDuzenlenecekTitle(todo.title)
  }}
   type="button" className="btn btn-sm btn-warning">Edit</button>
  <button onClick={()=>{deleteTodo(todo.id)}} type="button" className="btn btn-sm btn-danger">Delete</button>
  <button onClick={()=>changeTodosCompleted(todo)} type="button" className="btn btn-sm btn-primary">
    {todo.completed === true ? "Undone" : "Done"}
  </button>
</div>
       </div>
    </div>
    ))}
    </div>
  );
}

export default App;
