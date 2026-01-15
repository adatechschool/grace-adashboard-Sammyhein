import { useState, useEffect } from 'react'
import './App.css'
import Themes from './components/Themes';
import BoutonAdd from './components/BoutonAdd';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { STATUS } from './components/Skills';


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
    {/* <div className='chart'>
      <Doughnut data={{
        labels: ["KO", "PROGRESS", "OK"],
        datasets:[
          {
            label: "Progression",
            data: [
              (data.map((theme) =>{
                let countKO = 0;
                let countTotalSkills = 0;
                theme.map((skill) =>{
                  if(skill.validation === STATUS[0]){countKO += 1}
                  if(skill.validation){countTotalSkills += 1}
                })
                totalProgress = Math.round(countKO/countTotalSkills*100)
                return totalProgress
              })),
              3,
              4],
          },
        ]
      }}/>
    </div> */}
    <Themes data={data}/>
    </>
  )
}

export default App
