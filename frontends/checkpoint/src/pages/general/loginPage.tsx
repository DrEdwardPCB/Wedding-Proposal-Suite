import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ILoginDto, VLoginDto } from "../../components/common/loginPageForm";
import { joiResolver } from "@hookform/resolvers/joi";
import { RootType } from "../../redux/reducers/rootReducers";
import { ClearErrorAction, LoginAction } from "../../redux/actions/userActions";
import { useEffect } from "react";
import { toast } from "react-toastify";
export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token, isLoading, isSuccess, isError, error } = useSelector(
        (state: RootType) => state.user
    );
    const {
        control,
        getValues,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ILoginDto>({
        resolver: joiResolver(VLoginDto),
        defaultValues: {
            loginName: "",
            password: "",
        },
    });
    const handleFormSubmission = (value: ILoginDto) => {
        dispatch(LoginAction(value));
    };
    useEffect(() => {
        if (isSuccess && user) {
            toast.success("login success");
            if (user.isAdmin) navigate("/admin");
            else {
                navigate("/checkpoint");
            }
        } else if (isError) {
            console.log(error);
            //@ts-ignore
            toast.error(
                //@ts-ignore
                error?.error?.response?.data?.data?.name ??
                    //@ts-ignore
                    error?.error?.message ??
                    error
            );
            dispatch(ClearErrorAction());
        }
    }, [isSuccess, isError, error, user]);
    useEffect(() => {
        console.log(user);
        console.log(token);
    }, [user, token]);
    return (
        <div className='flex flex-col items-center justify-center w-full h-screen gap-4'>
            <h3 className='text-xl'>Login</h3>
            <form
                className='p-4 rounded outline outline-1 outline-slate-300'
                onSubmit={handleSubmit(handleFormSubmission)}>
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
                </div>
                <hr></hr>
                <div className='flex justify-end'>
                    <Button
                        type='button'
                        onClick={() => {
                            reset();
                        }}>
                        reset
                    </Button>
                    <Button
                        type='submit'
                        onClick={() => {
                            console.log(getValues());
                        }}>
                        submit
                    </Button>
                </div>
            </form>
            <Button
                variant='contained'
                onClick={() => {
                    navigate(-1);
                }}>
                Back
            </Button>
        </div>
    );
};
