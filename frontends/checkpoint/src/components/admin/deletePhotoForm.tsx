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
export interface IDeletePhotoFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => void;
    id: string | null;
    showWebRequest: (
        id: string,
        token: string
    ) => Promise<AxiosResponse<baseResponse<Photo>, any>>;
    deleteWebRequest: (
        id: string,
        token: string
    ) => Promise<AxiosResponse<baseResponse<any>, any>>;
}
export const DeletePhotoForm = (props: IDeletePhotoFormProps) => {
    const { token } = useSelector((state: RootType) => state.user);
    const { open, setOpen, showWebRequest, deleteWebRequest, id, reload } =
        props;
    useEffect(() => {
        localReload();
    }, [id, open]);
    const localReload = () => {
        if (id && open) {
            fetchPhoto();
        }
    };
    const [localPhoto, setPhoto] = useState<Photo | null>(null);
    const fetchPhoto = async () => {
        if (!id) return;
        try {
            const response = await showWebRequest(id, token as string);
            setPhoto(response.data.data);
        } catch (err) {
            toast.error("an error has occured while getting photo");
            console.error(err);
        }
    };
    const deletePhoto = async () => {
        if (!id) return;
        try {
            const response = await deleteWebRequest(id, token as string);
            toast.success("delete photo success");
        } catch (err) {
            toast.error("an error has occur while deleting photo");
            console.error(err);
        } finally {
            setOpen(false);
            reload();
        }
    };
    return (
        <Dialog open={open}>
            <DialogTitle>Photo Viewer and Delete Confirmation</DialogTitle>
            <DialogContent>
                {localPhoto && (
                    <div>
                        <p>{`id:${localPhoto.id}`}</p>
                        <p>{`createdAt:${dayjs(localPhoto.createdAt)
                            .toDate()
                            .toLocaleString()}`}</p>
                        <p>{`deletedAt:${dayjs(localPhoto.deletedAt)
                            .toDate()
                            .toLocaleString()}`}</p>
                        <img
                            src={`${env.REACT_APP_DATAMGMT_BASEURL}${localPhoto.photo}`}
                            className='w-40 aspect-auto'></img>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpen(false);
                    }}>
                    cancel
                </Button>
                <Button
                    onClick={() => {
                        deletePhoto();
                    }}
                    color='error'>
                    delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
