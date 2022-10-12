import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect } from "react";
import { IUser } from "../../redux/reducers/userReducer";
import { isNil } from "lodash";
export const HomePage = () => {
    const user = useSelector((state: RootType) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isNil(user)) {
            handleLoggedin(user);
        }
    }, [user]);
    const handleLoggedin = (user: IUser) => {
        if (user.isAdmin) {
        } else if (user.isCameraMan) {
        } else {
            navigate("/");
        }
    };
    return <div></div>;
};
