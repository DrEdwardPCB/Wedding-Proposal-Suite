import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { baseResponse } from "../common/commonInterface";
import { Photo } from "../common/entityInterface";
import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { env } from "../../env";
export interface ICreatePhotoFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => void;
    createWebRequest: (
        payload: FormData,
        token: string
    ) => Promise<AxiosResponse<baseResponse<any>, any>>;
}
export const CreatePhotoForm = (props: ICreatePhotoFormProps) => {
    const { token } = useSelector((state: RootType) => state.user);
    const { open, setOpen, createWebRequest, reload } = props;

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
    const createPhoto = async () => {
        try {
            const form = new FormData();
            images.forEach((image) => {
                form.append("photos", image);
            });
            const response = await createWebRequest(form, token as string);
            toast.success("successflly uploaded photo");
        } catch (err) {
            console.error(err);
            toast.error("an error has occured while uplaoding photos");
        } finally {
            reset();
            reload();
            setOpen(false);
        }
    };
    return (
        <Dialog open={open}>
            <DialogTitle>Create Photo</DialogTitle>
            <DialogContent>
                <input
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={(e) => {
                        if ((e?.target?.files?.length ?? 0) < 12) {
                            //@ts-ignore
                            setImages(
                                //@ts-ignore
                                e.target.files ? [...e.target.files] : []
                            );
                        } else {
                            toast.error(
                                "can only support uploading 12 files at once"
                            );
                        }
                    }}></input>
                {imageURLs.map((imageSrc, i) => (
                    <img src={imageSrc} key={i} className='w-10 aspect-auto' />
                ))}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpen(false);
                        reset();
                    }}>
                    cancel
                </Button>
                <Button
                    onClick={() => {
                        createPhoto();
                    }}>
                    submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};
