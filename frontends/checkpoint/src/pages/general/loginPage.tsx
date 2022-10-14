import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ILoginDto, VLoginDto } from "../../components/common/loginPageForm";
import { joiResolver } from "@hookform/resolvers/joi";
export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginDto>({
        resolver: joiResolver(VLoginDto),
        defaultValues: {
            loginName: "",
            password: "",
        },
    });
    return (
        <div className='flex flex-col items-center justify-center w-full h-screen gap-4'>
            <form className='rounded outline-1 outline-slate-300'>
                <div>
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
                </div>
                <hr></hr>
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
