import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ICreateUserDto, VCreateUserDto } from "../../apis/admin";
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
export interface ICreateUserFormProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    createWebRequest: (value: any, token: string) => Promise<any>;
    reload: () => void;
}
export const CreateUserForm = (props: ICreateUserFormProps) => {
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
    } = useForm<ICreateUserDto>({
        resolver: joiResolver(VCreateUserDto),
        defaultValues: {
            loginName: "",
            password: "",
            isCameraMan: false,
            isAdmin: false,
            isApp: false,
        },
    });
    const localHandleSubmit = async (value: ICreateUserDto) => {
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
