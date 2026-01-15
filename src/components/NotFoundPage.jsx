import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return(
        <div>
            <h1>This Page Doesn't Exist Puta</h1>
            <Link to={"/"}>
            <button>Back to Dashboard</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;