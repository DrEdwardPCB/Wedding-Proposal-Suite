import { useEffect, useState } from "react";
import { Photo } from "../../../components/common/entityInterface";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { isNil } from "lodash";
import { getPhotos } from "../../../apis/admin";
import { useSelector } from "react-redux";
import { RootType } from "../../../redux/reducers/rootReducers";
import { CircularProgress } from "@mui/material";
import { env } from "../../../env";
import dayjs from "dayjs";
export const PiSlidesshowPage = () => {
    const { token } = useSelector((state: RootType) => state.user);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    async function fetchPhotos() {
        setLoading(true);
        setError(false);
        try {
            const response = await getPhotos(token as string);
            const rawPhoto = response.data.data as Photo[];
            const availablePhoto = rawPhoto.filter((e) => isNil(e.deletedAt));
            setPhotos(availablePhoto);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }
    function reload() {
        fetchPhotos();
    }
    useEffect(() => {
        reload();
    }, []);
    function onChange(e: any) {
        console.log(e);
    }
    function onClickItem(e: any) {
        console.log(e);
    }
    function onClickThumb(e: any) {
        console.log(e);
    }
    function renderLowerPart() {
        if (loading) {
            return <CircularProgress></CircularProgress>;
        } else if (photos.length > 0) {
            return (
                <Carousel
                    showArrows={true}
                    onChange={onChange}
                    onClickItem={onClickItem}
                    onClickThumb={onClickThumb}
                    autoPlay={true}>
                    {photos.map((e) => (
                        <div>
                            <img
                                className='max-h-[70vh] object-contain'
                                src={`${env.REACT_APP_DATAMGMT_BASEURL}${e.photo}`}></img>
                            <p className='legend'>
                                {dayjs(e.createdAt)
                                    .add(8, "hours")
                                    .toDate()
                                    .toLocaleString()}
                            </p>
                        </div>
                    ))}
                </Carousel>
            );
        } else if (error) {
            return <p className='text-red'>an error has occured</p>;
        } else {
            return <p>no data found</p>;
        }
    }
    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            {renderLowerPart()}
        </div>
    );
};
