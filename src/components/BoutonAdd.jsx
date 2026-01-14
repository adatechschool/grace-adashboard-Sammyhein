import { useRef, useState } from "react"
import { STATUS } from "./Skills"

export default function BoutonAdd({themes, setThemes}) {
const [themeName, setThemeName] = useState("")
// const [skillLabel, setSkillLabel] = useState("")
// const [skillValidation, setSkillValidation] = useState(STATUS[0])
const [skills, setSkills] = useState([{label: "", validation: STATUS[0]}])
const dialogRef = useRef(null)

const addSkill = () => {
    setSkills([...skills, {label: "", validation: STATUS[0] }]) //validation par défaut
}

const removeSkill = (index) => {
    if(skills.length > 1){
        setSkills(skills.filter((_, i) => i !== index))
    }
}

const updateSkill = (index, where, value) => {
    const updatedSkills = [...skills]
    updatedSkills[index][where] = value
    setSkills(updatedSkills)
}

async function newTheme(e) {
    e.preventDefault()
    
    try{
    await fetch(`http://localhost:3000/themes`, {method:"POST",
        headers: {
            "Content-Type": "application/json" //Obligatoire pour dire au BACKEND qu'on lui envoie du JSON
        },
        body: JSON.stringify({ //Obligatoire pour envoyer les données, il convertit l'objet JS en JSON, sans ça on envoie rien 
            name: themeName,
            skills: skills 
        })
    })

    const response = await fetch('http://localhost:3000/themes')
    const updatedThemes = await response.json()
    setThemes(updatedThemes)

    console.log("Thème ajouté avec succès")
    dialogRef.current.close()
    setThemeName("")
    //setSkillLabel("")
    //setSkillValidation(STATUS[0])
    setSkills([{label: "", validation: STATUS[0]}])

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
            <h2>Compétences <button type="button" onClick={() => {addSkill()}}>+</button></h2>
                
                {/* Ce que j'ai besoin pour mon bouton "+" 
                <div>
                <input type="text"  placeholder="Je sais..." value={skillLabel} onChange={(e) => setSkillLabel(e.target.value)} required/>
                <select value={skillValidation} onChange={(e) => setSkillValidation(e.target.value)}>
                    {STATUS.map((validation) => {
                        return(
                                <option key = {validation} value={validation}>{validation}</option>
                            )
                    })}
                </select>
                <button type="button">-</button>
                </div> */}

                {skills.map((skill, index) => {
                    return(
                        <div key ={index}>
                            <input type="text" placeholder="Je sais..." value={skill.label || ""} onChange={(e) => updateSkill(index, 'label', e.target.value)} required />
                            <select value={skill.validation} onChange={(e) => updateSkill(index, 'validation', e.target.value)}>
                                {STATUS.map((validation => {
                                    return(
                                        <option key ={validation} value={validation}>{validation}</option>
                                    )
                                }))}
                            </select>

                            {/* Le bouton Remove que quand y'a plus d'une skill */}

                            {skills.length > 1 && (
                                <button type="button" onClick={() => removeSkill(index)}> - </button>
                            )}

                        </div>
                    )
                })}

            <div>
            <button type="submit">Créer</button>
            <button type="button" onClick={() =>{dialogRef.current.close()}}>Annuler</button>
            </div>
            </form>
        </dialog>
        </>
    )
    
}