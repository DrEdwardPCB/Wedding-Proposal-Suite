import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { isNil } from "lodash";
import { LogoutAction } from "../../redux/actions/userActions";

export const CheckpointLayout = () => {
    const { user, token, isLoggedin } = useSelector(
        (state: RootType) => state.user
    );
    const navigate = useNavigate();
    const navItem: { name: string; nav: string }[] = [];
    //filter out non admin non login user
    useEffect(() => {
        if (!isLoggedin || isNil(user)) {
            navigate("/");
        }
    }, [user, isLoggedin, token]);
    const dispatch = useDispatch();
    return (
        <div className='flex flex-col w-full min-h-screen'>
            <div className='min-h-[50px] py-2 w-full flex-wrap flex gap-4 justify-center items-center'>
                {navItem.map((e) => (
                    <Button
                        variant='contained'
                        key={e.name + e.nav}
                        onClick={() => {
                            navigate(e.nav);
                        }}>
                        {e.name}
                    </Button>
                ))}
                <Button
                    variant='contained'
                    onClick={() => {
                        dispatch(LogoutAction());
                    }}>
                    logout
                </Button>
            </div>
            <hr className='border-slate-500'></hr>
            <Outlet></Outlet>
        </div>
    );
};
