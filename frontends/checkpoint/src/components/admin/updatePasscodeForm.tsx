import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { IUpdatePasscodeDto, VUpdatePasscodeDto } from "../../apis/admin";
import { AxiosResponse } from "axios";
import {
    Button,
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
import { Passcode } from "../common/entityInterface";
export interface IUpdatePasscodeFormProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    showWebRequest: (
        token: string
    ) => Promise<AxiosResponse<baseResponse<Passcode>, any>>;
    updateWebRequest: (
        value: any,
        token: string
    ) => Promise<AxiosResponse<baseResponse<Passcode>, any>>;
    deleteWebRequest: (
        token: string
    ) => Promise<AxiosResponse<baseResponse<any>, any>>;
    reload: () => void;
}
export const UpdatePasscodeForm = (props: IUpdatePasscodeFormProps) => {
    const { token } = useSelector((state: RootType) => state.user);
    const {
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
        control,
        getValues,
        formState: { errors },
        reset,
        handleSubmit,
        setValue,
    } = useForm<IUpdatePasscodeDto>({
        resolver: joiResolver(VUpdatePasscodeDto),
        defaultValues: {
            passcode: "",
        },
    });
    const resetToEntry = async () => {
        const response = await showWebRequest(token as NonNullable<string>);
        const entry = response.data.data;
        setValue("passcode", entry.passcode);
    };
    useEffect(() => {
        if (open) {
            resetToEntry();
        }
    }, [open]);
    const localHandleSubmit = async (value: IUpdatePasscodeDto) => {
        setLoading(true);
        console.log(getValues());
        try {
            const result = await updateWebRequest(
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
            const result = await deleteWebRequest(token as NonNullable<string>);
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
                            name='passcode'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextField
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        variant='outlined'
                                        label='Message'></TextField>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.passcode?.message ?? ""}
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
                    <Button
                        type='button'
                        color='error'
                        onClick={() => {
                            resetToEntry();
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
