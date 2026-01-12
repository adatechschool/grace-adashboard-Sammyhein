import { useState, useEffect } from 'react'
import './App.css'
import Themes from './components/Themes';


function App() {

  const [data, setData] = useState(null)
  
  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:3000/themes");
      setData(await res.json())
      //console.log(data);
    }
    getData();
  }, [])

  const [themes, setThemes] = useState("")
  const [skills, setSkill] = useState("")

  if(!data){
    return <h1>Chargement...</h1>
  }

  console.log(data)

  return (
    <>
    <Themes data={data}/>
    </>
  )
}

export default App
