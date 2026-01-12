import { useState } from "react";
import Skills from "./Skills"

export default function Themes({data}) {
    const[themes, setThemes] = useState(data)
    //console.log(themes[0])

    async function removeTheme(id){
        await fetch(`http://localhost:3000/themes/${id}`, {method : "DELETE"})
        //console.log / Splice / filter 
        // à partir du moment où mon id n'existe plus, j'ai envie que tu disparaisses
        
        setThemes(themes.filter((theme) =>theme.id !== id))
   }

    return(
        <div>
            {themes.map((theme) => {
                return(
                    <div key={theme.id}>
                    <h1>{theme.name}</h1>
                    <Skills theme = {theme}/>
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