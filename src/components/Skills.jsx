import { useState } from "react"

export const STATUS = ["KO", "PROGRESS", "OK"]

export default function Skills({theme , update}){
  // const [statut, setStatut] = useState(["KO", "PROGRESS", "OK"])

  async function changeStatut(skillIndex, newValidation) {
    try{
      await fetch(`http://localhost:3000/themes/${theme.id}/skills/${skillIndex}/${newValidation}`, {method:"PUT"}
      )
      console.log('Statut mis à jour avec succès')

      //l'update est lié à mon themes qui va être utilisé pour mon pourcentage de progression
      update?.()
    }catch(error){
      console.error('Erreur dans les validations', error)
    }
    
  }
    return(
        <>
        {theme.skills.map((skill, index) => {
          //console.log(`le ${skill.label} à la validation ${skill.validation}`)
                return(
                  <div key={skill.id || index}>
                    <label htmlFor={index}>{skill.label}</label>
                    <select id={index} /*name="validation"*/ defaultValue={skill.validation} onChange={(e) => changeStatut(index, e.target.value)}>
                        {/* <option>--Statut de Validation--</option> */}
                        {/* <option>{skill.validation}</option>
                        {statut.map((validation) => {
                          return(
                            <option>{validation}</option>
                          )
                        })}  */}
                        {STATUS.map((validation) => {
                          return(
                            <option key = {validation} value={validation}>{validation}</option>
                          )
                        })

                        }
                    </select>
                  </div>
                )
              })}
        </>
    )
}