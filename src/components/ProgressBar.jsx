export default function ProgressBar({percent}){
    return (
    <div className="outer-container">
        <div className="inner-container" style={{'--witdh' : percent}}></div>

    </div>)
}