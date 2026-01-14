import { useEffect, useState } from "react";
import Skills from "./Skills"
import BoutonAdd from "./BoutonAdd";
import { STATUS } from "./Skills";
import ProgressBar from "./ProgressBar";

export default function Themes({data}) {
    const[themes, setThemes] = useState(data)
    //console.log(themes[0])
    //const[progress, setProgess] = useState(0)

    const [percent, setPercent] = useState(0)

    //Cet async me permet de mettre à jour par rapport au pourcentage de progression
    async function refreshThemes() {
        const response = await fetch('http://localhost:3000/themes')
        const updatedThemes = await response.json()
        setThemes(updatedThemes)
        
    }

    async function removeTheme(id){
        await fetch(`http://localhost:3000/themes/${id}`, {method : "DELETE"})
        //console.log / Splice / filter 
        // à partir du moment où mon id n'existe plus, j'ai envie que tu disparaisses
        
        setThemes(themes.filter((theme) =>theme.id !== id))
   }
   //il faut que je compte le nombre de skills , pour voir si il sont en "OK"
   //console.log(themes[0].skills[0].validation)

   

    return(
        <div>
            <BoutonAdd themes={themes} setThemes={setThemes}/>
            {themes.map((theme) => {
                //console.log(theme.skills[0].validation)
                //console.log(theme.skills.filter((skill) => skill.validation === STATUS[2]).length)
                const progressOK = theme.skills.filter((skill) => skill.validation === STATUS[2]).length
                //console.log(theme.skills.length)
                const totalSkills = theme.skills.length
                //console.log(Math.round((theme.skills.filter((skill) => skill.validation === STATUS[2]).length)/(theme.skills.length)*100))
                const totalProgress = Math.round(progressOK/totalSkills*100)
                return(
                    <div key={theme.id}>
                        <div>
                        <h1>{theme.name}</h1>
                        <h2>{totalProgress}%</h2>
                        </div>
                        <ProgressBar percent={`${totalProgress}%`}/>
                        <Skills theme = {theme} update={refreshThemes}/>
                        <button onClick={() => {
                            console.log(theme.id)
                            removeTheme(theme.id)
                            
                        }}>Remove</button>
                    </div>
                 )
             })
            }
        </div>
    )
}