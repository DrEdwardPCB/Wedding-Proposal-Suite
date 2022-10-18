import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { IUpdateLocationDto, VUpdateLocationDto } from "../../apis/admin";
import { AxiosResponse } from "axios";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RootType } from "../../redux/reducers/rootReducers";
import { useSelector } from "react-redux";
import { baseResponse } from "../common/commonInterface";
import { Location } from "../common/entityInterface";
import { MapViewer } from "../common/mapViewer";
export interface IUpdateLocationProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    id: string;
    showWebRequest: (
        id: string,
        token: string
    ) => Promise<AxiosResponse<baseResponse<Location>, any>>;
    updateWebRequest: (
        id: string,
        value: any,
        token: string
    ) => Promise<AxiosResponse<baseResponse<Location>, any>>;
    deleteWebRequest: (
        id: string,
        token: string
    ) => Promise<AxiosResponse<baseResponse<any>, any>>;
    reload: () => void;
}
export const UpdateLocationForm = (props: IUpdateLocationProps) => {
    const { token } = useSelector((state: RootType) => state.user);
    const {
        id,
        open,
        handleClose,
        title,
        reload,
        updateWebRequest,
        showWebRequest,
        deleteWebRequest,
    } = props;
    const [loading, setLoading] = useState(false);
    const {
        watch,
        control,
        getValues,
        formState: { errors },
        reset,
        handleSubmit,
        setValue,
    } = useForm<IUpdateLocationDto>({
        resolver: joiResolver(VUpdateLocationDto),
        defaultValues: {
            displayName: "",
            message: "",
            location: {
                lat: 22.302711,
                long: 114.177216,
            },
            locationDescription: "",
        },
    });
    const resetToEntry = async () => {
        const response = await showWebRequest(id, token as NonNullable<string>);
        const entry = response.data.data;
        setValue("displayName", entry?.displayName ?? "");
        setValue("message", entry?.message ?? "");
        setValue(
            "location.lat",
            entry?.location?.coordinates?.[1] ?? 22.302711
        );
        setValue(
            "location.long",
            entry?.location?.coordinates?.[0] ?? 114.1777216
        );
        setValue("locationDescription", entry?.locationDescription ?? "");
    };
    useEffect(() => {
        if (open && id) {
            resetToEntry();
        }
    }, [open, id]);
    const localHandleSubmit = async (value: IUpdateLocationDto) => {
        setLoading(true);
        console.log(getValues());
        try {
            const result = await updateWebRequest(
                id,
                value,
                token as NonNullable<string>
            );
            console.log(result);
            handleClose(false);
        } catch (error) {
            toast.error(
                //@ts-ignore
                error?.error?.response?.data?.data?.name ??
                    //@ts-ignore
                    error?.error?.message ??
                    error
            );
        } finally {
            setLoading(false);
            reload();
        }
    };
    const localHandleDelete = async () => {
        setLoading(true);
        try {
            const result = await deleteWebRequest(
                id,
                token as NonNullable<string>
            );
            console.log(result);
            handleClose(false);
        } catch (error) {
            toast.error(
                //@ts-ignore
                error?.error?.response?.data?.data?.name ??
                    //@ts-ignore
                    error?.error?.message ??
                    error
            );
        } finally {
            setLoading(false);
            reload();
        }
    };
    const lat = watch("location.lat");
    const long = watch("location.long");
    return (
        <Dialog open={open} maxWidth='md' fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit(localHandleSubmit)}>
                <DialogContent>
                    <div className='flex flex-col gap-4 p-4'>
                        <Controller
                            control={control}
                            name='displayName'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextField
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        variant='outlined'
                                        label='display name'></TextField>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.displayName?.message ?? ""}
                        </p>
                        <Controller
                            control={control}
                            name='message'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextField
                                        value={value}
                                        multiline={true}
                                        minRows={3}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        variant='outlined'
                                        label='message'></TextField>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.message?.message ?? ""}
                        </p>
                        <Controller
                            control={control}
                            name='location.lat'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextField
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                        onBlur={(e) => {
                                            onChange(
                                                parseFloat(e.target.value)
                                            );
                                        }}
                                        variant='outlined'
                                        label='Lat'></TextField>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors?.location?.lat?.message ?? ""}
                        </p>
                        <Controller
                            control={control}
                            name='location.long'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextField
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                        onBlur={(e) => {
                                            onChange(
                                                parseFloat(e.target.value)
                                            );
                                        }}
                                        variant='outlined'
                                        label='Long'></TextField>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors?.location?.long?.message ?? ""}
                        </p>
                        <Controller
                            control={control}
                            name='locationDescription'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextField
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        variant='outlined'
                                        label='locationDescription'></TextField>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.locationDescription?.message ?? ""}
                        </p>
                    </div>
                    <div className='w-full h-[500px]'>
                        <MapViewer
                            showlines={false}
                            popups={[
                                {
                                    message: "",
                                    coordinate: [lat, long],
                                },
                            ]}></MapViewer>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        type='button'
                        color='error'
                        onClick={() => {
                            reset();
                            handleClose(false);
                        }}>
                        cancel
                    </Button>
                    <Button
                        type='button'
                        color='error'
                        onClick={() => {
                            resetToEntry();
                            handleClose(false);
                        }}>
                        reset
                    </Button>
                    <LoadingButton
                        type='button'
                        variant='contained'
                        color='error'
                        loading={loading}
                        onClick={() => {
                            localHandleDelete();
                        }}>
                        Delete
                    </LoadingButton>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        loading={loading}>
                        Submit
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
