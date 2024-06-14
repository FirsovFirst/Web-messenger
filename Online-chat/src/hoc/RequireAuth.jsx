import { useLocation, useNavigate } from "react-router-dom"
import { access } from "./Requests";

const RequireAuth = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    access().then(async (res) => {
        console.log(res);
    }).catch(err => {
        console.log(err);
        navigate('/login', {state: {from: location.state}});
    });

    return children;
}

export {RequireAuth}