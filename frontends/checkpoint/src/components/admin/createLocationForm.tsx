import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
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
import { useState } from "react";
import { toast } from "react-toastify";
import { RootType } from "../../redux/reducers/rootReducers";
import { useSelector } from "react-redux";
import {
    ILocation,
    ICreateLocationDto,
    VCreateLocationDto,
} from "../../apis/admin";
export interface ICreateLocationFormProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    createWebRequest: (value: any, token: string) => Promise<any>;
    reload: () => void;
}
export const CreateLocationForm = (props: ICreateLocationFormProps) => {
    const { token } = useSelector((state: RootType) => state.user);
    const { open, handleClose, title, createWebRequest, reload } = props;
    const [loading, setLoading] = useState(false);
    const {
        register,
        control,
        getValues,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<ICreateLocationDto>({
        resolver: joiResolver(VCreateLocationDto),
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
    const localHandleSubmit = async (value: ICreateLocationDto) => {
        setLoading(true);
        console.log(getValues());
        try {
            const result = await createWebRequest(
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
                                        type='number'
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
                                        type='number'
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
