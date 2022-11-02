import { useEffect, useState } from "react";
export const PiMapPage = () => {
    const [locations, setLocation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    async function getLocation() {
        try {
        } catch (err) {}
    }
    function reload() {
        getLocation();
    }
    useEffect(() => {
        reload();
    }, []);

    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'></div>
    );
};
