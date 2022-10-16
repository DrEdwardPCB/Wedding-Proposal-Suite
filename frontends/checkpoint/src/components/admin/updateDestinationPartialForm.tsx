import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
    IUpdateDestinationPartialDto,
    VUpdateDestinationPartialDto,
} from "../../apis/admin";
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
import { DestinationPartial } from "../common/entityInterface";
export interface IUpdateDestinationPartialFormProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    id: string;
    showWebRequest: (
        id: string,
        token: string
    ) => Promise<AxiosResponse<baseResponse<DestinationPartial>, any>>;
    updateWebRequest: (
        id: string,
        value: any,
        token: string
    ) => Promise<AxiosResponse<baseResponse<DestinationPartial>, any>>;
    deleteWebRequest: (
        id: string,
        token: string
    ) => Promise<AxiosResponse<baseResponse<any>, any>>;
    reload: () => void;
}
export const UpdateDestinationPartialForm = (
    props: IUpdateDestinationPartialFormProps
) => {
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
        control,
        getValues,
        formState: { errors },
        reset,
        handleSubmit,
        setValue,
    } = useForm<IUpdateDestinationPartialDto>({
        resolver: joiResolver(VUpdateDestinationPartialDto),
        defaultValues: {
            message: "",
        },
    });
    const resetToEntry = async () => {
        const response = await showWebRequest(id, token as NonNullable<string>);
        const entry = response.data.data;
        setValue("message", entry.message);
    };
    useEffect(() => {
        if (open && id) {
            resetToEntry();
        }
    }, [open, id]);
    const localHandleSubmit = async (value: IUpdateDestinationPartialDto) => {
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
                            name='message'
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
                            {errors.message?.message ?? ""}
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
