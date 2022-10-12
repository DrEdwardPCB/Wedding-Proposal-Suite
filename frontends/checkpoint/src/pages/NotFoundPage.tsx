import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className='flex-col items-center justify-center'>
            <p className='text-xl font-bold'>
                {`location ${location} not found`}
            </p>
            <Button
                onClick={() => {
                    navigate(-1);
                }}>
                previous page
            </Button>
            <Button
                onClick={() => {
                    navigate("/login");
                }}>
                login page
            </Button>
        </div>
    );
};
