import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export const PiLayout = () => {
    const navigate = useNavigate();
    const navItem: { name: string; nav: string }[] = [
        { name: "home", nav: "/admin/pi" },
        { name: "map", nav: "/admin/pi/map" },
        { name: "photos", nav: "/admin/pi/photos" },
    ];
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
            </div>
            <hr className='border-slate-500'></hr>
            <Outlet></Outlet>
        </div>
    );
};
