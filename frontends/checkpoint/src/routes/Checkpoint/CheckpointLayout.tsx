import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect } from "react";
import { isNil } from "lodash";
export const CheckpointLayout = () => {
    const user = useSelector((state: RootType) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (isNil(user)) {
            handleUnauthorize;
        }
    }, [user]);
    const handleUnauthorize = () => {
        navigate("una");
    };
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};
