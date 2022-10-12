import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
export const AdminLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};
