import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const NotAuthorizePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className='flex-col justify-center items-center'>
            <p className='text-xl font-bold'>
                {`you are not authorize to goto ${location}`}
            </p>
            <Button
                onClick={() => {
                    navigate("/login");
                }}>
                login page
            </Button>
        </div>
    );
};
