import { useRef, useState } from "react"
import { STATUS } from "./Skills"

export default function BoutonAdd({themes, setThemes}) {
const [themeName, setThemeName] = useState("")
const [skillLabel, setSkillLabel] = useState("")
const [skillValidation, setSkillValidation] = useState(STATUS[0])
const dialogRef = useRef(null)

async function newTheme(e) {
    e.preventDefault()
    
    try{
    await fetch(`http://localhost:3000/themes`, {method:"POST",
        headers: {
            "Content-Type": "application/json" //Obligatoire pour dire au BACKEND qu'on lui envoie du JSON
        },
        body: JSON.stringify({ //Obligatoire pour envoyer les données, il convertit l'objet JS en JSON, sans ça on envoie rien 
            name: themeName,
            skills:[
                {
                    label: skillLabel,
                    validation: skillValidation //validation par défaut
                }
            ]
        })
    })

    const response = await fetch('http://localhost:3000/themes')
    const updatedThemes = await response.json()
    setThemes(updatedThemes)

    console.log("Thème ajouté avec succès")
    dialogRef.current.close()
    setThemeName("")
    setSkillLabel("")
    setSkillValidation(STATUS[0])

    }catch(error){
    console.error("Erreur dans l'ajout du thème")
    alert("Impossible d'ajouter le thème")
    }
}

    return(
        <>
        <button onClick={()=>{dialogRef.current.showModal()}}>Ajouter un thème</button>
        <dialog ref={dialogRef}>
            <form method="dialog" onSubmit={newTheme}>
            <h1>Ajouter un thème</h1>
            <h2>Nom du Thème</h2>
            <input type="text" value={themeName} onChange={(e) => setThemeName(e.target.value)} required/>
            <h2>Compétences</h2>
            <input type="text"  placeholder="Je sais..." value={skillLabel} onChange={(e) => setSkillLabel(e.target.value)} required/>
            <h2>Statut de validation</h2>
            <select value={skillValidation} onChange={(e) => setSkillValidation(e.target.value)}>
                {STATUS.map((validation) => {
                    return(
                            <option key = {validation} value={validation}>{validation}</option>
                          )
                })}
            </select>
            <div>
            <button type="submit">Ajouter</button>
            <button type="button" onClick={() =>{dialogRef.current.close()}}>Annuler</button>
            </div>
            </form>
        </dialog>
        </>
    )
    
}