import { useState, useEffect } from 'react'
import './App.css'
import Themes from './components/Themes';
import BoutonAdd from './components/BoutonAdd';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';


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

  //console.log(data)

  return (
    <>
    <div className='chart'>
      <Doughnut data={{
        labels: ["KO", "PROGRESS", "OK"],
        datasets:[
          {
            label: "Progression",
            data: [200,300,400],
          },
        ]
      }}/>
    </div>
    <Themes data={data}/>
    </>
  )
}

export default App
