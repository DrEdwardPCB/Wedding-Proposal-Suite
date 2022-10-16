import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
    ICreateUserDto,
    IUpdateUserDto,
    VCreateUserDto,
    VUpdateUserDto,
} from "../../apis/admin";
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
import { User } from "../common/entityInterface";
export interface ICreateUserFormProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    id: string;
    showWebRequest: (
        id: string,
        token: string
    ) => Promise<AxiosResponse<baseResponse<Partial<User>>, any>>;
    updateWebRequest: (
        id: string,
        value: any,
        token: string
    ) => Promise<AxiosResponse<baseResponse<Partial<User>>, any>>;
    deleteWebRequest: (
        id: string,
        token: string
    ) => Promise<AxiosResponse<baseResponse<any>, any>>;
    reload: () => void;
}
export const UpdateUserForm = (props: ICreateUserFormProps) => {
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
        register,
        control,
        getValues,
        formState: { errors },
        reset,
        handleSubmit,
        setValue,
    } = useForm<IUpdateUserDto>({
        resolver: joiResolver(VUpdateUserDto),
        defaultValues: {
            loginName: "",
            password: "",
            isCameraMan: false,
            isAdmin: false,
            isApp: false,
        },
    });
    const resetToEntry = async () => {
        const response = await showWebRequest(id, token as NonNullable<string>);
        const entry = response.data.data;
        setValue("loginName", entry.loginName);
        setValue("isAdmin", entry.isAdmin as NonNullable<boolean>);
        setValue("isCameraMan", entry.isCameraMan as NonNullable<boolean>);
        setValue("isApp", entry.isApp as NonNullable<boolean>);
    };
    useEffect(() => {
        if (open && id) {
            resetToEntry();
        }
    }, [open, id]);
    const localHandleSubmit = async (value: IUpdateUserDto) => {
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
    return (
        <Dialog open={open} maxWidth='md' fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit(localHandleSubmit)}>
                <DialogContent>
                    <div className='flex flex-col gap-4 p-4'>
                        <Controller
                            control={control}
                            name='loginName'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextField
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        variant='outlined'
                                        label='Login name'></TextField>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.loginName?.message ?? ""}
                        </p>
                        <Controller
                            control={control}
                            name='password'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <TextField
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        variant='outlined'
                                        type={"password"}
                                        label='password'></TextField>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.password?.message ?? ""}
                        </p>
                        <Controller
                            control={control}
                            name='isAdmin'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <div className='flex items-center'>
                                        <p>is admin?</p>
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => {
                                                onChange(e.target.checked);
                                            }}></Checkbox>
                                    </div>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.isAdmin?.message ?? ""}
                        </p>
                        <Controller
                            control={control}
                            name='isApp'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <div className='flex items-center'>
                                        <p>is app?</p>
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => {
                                                onChange(e.target.checked);
                                            }}></Checkbox>
                                    </div>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.isApp?.message ?? ""}
                        </p>
                        <Controller
                            control={control}
                            name='isCameraMan'
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <div className='flex items-center'>
                                        <p>is camera man?</p>
                                        <Checkbox
                                            checked={value}
                                            onChange={(e) => {
                                                onChange(e.target.checked);
                                            }}></Checkbox>
                                    </div>
                                );
                            }}></Controller>
                        <p className='text-red-400'>
                            {errors.isCameraMan?.message ?? ""}
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
