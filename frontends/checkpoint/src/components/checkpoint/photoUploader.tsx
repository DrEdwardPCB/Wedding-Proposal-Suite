import { get, isNil } from "lodash";
import { toast } from "react-toastify";
import { Location } from "../common/entityInterface";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { env } from "../../env";
import { AxiosResponse } from "axios";
import { baseResponse } from "../common/commonInterface";
import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
export interface IPhotoUploaderProps {
    location: Location;
    photoKey: "photoone" | "phototwo" | "photothree";
    reload: () => void;
    uploadWebRequest: (
        payload: FormData,
        token: string
    ) => Promise<AxiosResponse<baseResponse<any>, any>>;
    deleteWebRequest: (
        token: string
    ) => Promise<AxiosResponse<baseResponse<any>, any>>;
}
export const PhotoUploader = (props: IPhotoUploaderProps) => {
    const { location, photoKey, reload, uploadWebRequest, deleteWebRequest } =
        props;
    const { token } = useSelector((state: RootType) => state.user);
    const [images, setImages] = useState<File[]>([]);
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    useEffect(() => {
        if (images.length < 1) return;

        const newImageUrls: string[] = [];
        images.forEach((image: File) =>
            newImageUrls.push(URL.createObjectURL(image))
        );
        setImageURLs(newImageUrls);
    }, [images]);

    const reset = () => {
        setImages([]);
        setImageURLs([]);
    };
    const uploadPhoto = async () => {
        try {
            const form = new FormData();
            images.forEach((image) => {
                form.append("photo", image);
            });
            const response = await uploadWebRequest(form, token as string);
            toast.success("successflly uploaded photo");
        } catch (err) {
            console.error(err);
            toast.error("an error has occured while uplaoding photos");
        } finally {
            reset();
            reload();
        }
    };
    const removePhoto = async () => {
        try {
            const response = await deleteWebRequest(token as string);
            toast.success("delete photo success");
        } catch (err) {
            toast.error("an error has occur while deleting photo");
            console.error(err);
        } finally {
            reload();
        }
    };
    if (isNil(get(location, photoKey, null))) {
        //no photo
        return (
            <div className='self-stretch p-5 rounded outline outline-1 outline-slate-500'>
                <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                        if ((e?.target?.files?.length ?? 0) <= 1) {
                            //@ts-ignore
                            setImages(
                                //@ts-ignore
                                e.target.files ? [...e.target.files] : []
                            );
                        } else {
                            toast.error("can only support uploading 1 file");
                        }
                    }}></input>
                {imageURLs.map((imageSrc, i) => (
                    <img src={imageSrc} key={i} className='w-28 aspect-auto' />
                ))}
                <Button
                    onClick={() => {
                        uploadPhoto();
                    }}>
                    upload
                </Button>
            </div>
        );
    }
    return (
        <div>
            <img
                src={`${env.REACT_APP_DATAMGMT_BASEURL}${get(
                    location,
                    photoKey
                )}`}
                className='w-28 aspect-auto'
            />
            <Button
                color='error'
                onClick={() => {
                    removePhoto();
                }}>
                remove
            </Button>
        </div>
    );
};
