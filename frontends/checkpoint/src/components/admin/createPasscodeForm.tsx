import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ICreatePasscodeDto, VCreatePasscodeDto } from "../../apis/admin";
import {
    Button,
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
export interface ICreatePasscodeFormProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    createWebRequest: (value: any, token: string) => Promise<any>;
    reload: () => void;
}
export const CreatePasscodeForm = (props: ICreatePasscodeFormProps) => {
    const { token } = useSelector((state: RootType) => state.user);
    const { open, handleClose, title, createWebRequest, reload } = props;
    const [loading, setLoading] = useState(false);
    const {
        control,
        getValues,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<ICreatePasscodeDto>({
        resolver: joiResolver(VCreatePasscodeDto),
        defaultValues: {
            passcode: "",
        },
    });
    const localHandleSubmit = async (value: ICreatePasscodeDto) => {
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
