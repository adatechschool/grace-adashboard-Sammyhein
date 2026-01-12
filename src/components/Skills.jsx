export default function Skills({theme}){
    return(
        <>
        {theme.skills.map((skill) => {
                return(
                  <div key={crypto.randomUUID()}>
                    <label htmlFor="validation">{skill.label}</label>
                    <select id="validation" name="validation">
                        <option>--Statut de Validation--</option>
                        <option>KO</option>
                        <option>PROGRESS</option>
                        <option>OK</option>
                    </select>
                  </div>
                )
              })}
        </>
    )
}