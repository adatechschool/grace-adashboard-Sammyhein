import { useState, useEffect } from 'react'
import './App.css'
import Themes from './components/Themes';
import BoutonAdd from './components/BoutonAdd';


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
