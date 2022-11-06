import { Location } from "../common/entityInterface";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { IUpdateLocationDto, VUpdateLocationDto } from "../../apis/admin";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    updateLocation,
    createLocationOne,
    deleteLocationOne,
    createLocationTwo,
    deleteLocationTwo,
    createLocationThree,
    deleteLocationThree,
} from "../../apis/checkpoint";
import { RootType } from "../../redux/reducers/rootReducers";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import WYSIWYGEditor from "../common/wysiwygeditor/wysiwygeditor";
import { PhotoUploader } from "./photoUploader";

export interface ICheckpointEditFormProps {
    location: Location;
    reload: () => void;
}
export const CheckpointEditForm = (props: ICheckpointEditFormProps) => {
    const { location, reload } = props;
    const { token } = useSelector((state: RootType) => state.user);
    const [edit, setEdit] = useState(false);
    const {
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IUpdateLocationDto>({
        resolver: joiResolver(VUpdateLocationDto),
        defaultValues: {
            message: "",
            displayName: "",
            locationDescription: "",
        },
    });
    const handleUpdateFormSubmit = async (value: IUpdateLocationDto) => {
        try {
            const result = await updateLocation(
                location.id,
                value,
                token as string
            );
            console.log(result);
        } catch (error) {
            console.error(error);
            toast.error(
                //@ts-ignore
                error?.error?.response?.data?.data?.name ??
                    //@ts-ignore
                    error?.error?.message ??
                    error
            );
        } finally {
            reload();
        }
    };
    useEffect(() => {
        resetToEntry();
    }, [location]);
    const resetToEntry = () => {
        console.log(location);
        if (location.message) {
            setValue("message", location.message);
        }
        if (location.displayName) {
            setValue("displayName", location.displayName);
        }
        if (location.locationDescription) {
            setValue("locationDescription", location.locationDescription);
        }
    };
    return (
        <div className='w-full'>
            <Button
                variant='contained'
                onClick={() => {
                    setEdit(!edit);
                }}>
                {edit ? "unlocked" : "locked"}
            </Button>
            <form
                onSubmit={handleSubmit(handleUpdateFormSubmit)}
                className='flex flex-col gap-4 p-4'>
                <Controller
                    control={control}
                    name='displayName'
                    render={({ field: { onChange, value } }) => {
                        return (
                            <TextField
                                value={value}
                                disabled={!edit}
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
                            <WYSIWYGEditor
                                noEdit={false}
                                onChange={onChange}
                                value={value as string}
                                readonly={!edit}></WYSIWYGEditor>
                        );
                    }}></Controller>
                <p className='text-red-400'>{errors.message?.message ?? ""}</p>
                <Controller
                    control={control}
                    name='locationDescription'
                    render={({ field: { onChange, value } }) => {
                        return (
                            <TextField
                                value={value}
                                multiline={true}
                                minRows={3}
                                disabled={!edit}
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
                <div className='flex items-center justify-end gap-4'>
                    <Button
                        color='error'
                        variant='contained'
                        type='button'
                        onClick={() => {
                            resetToEntry();
                        }}>
                        reset
                    </Button>
                    <Button
                        variant='contained'
                        type='submit'
                        onClick={() => {
                            reload();
                        }}>
                        submit
                    </Button>
                </div>
            </form>
            <hr />
            <div className='flex flex-wrap items-center justify-around w-full gap-4 p-4'>
                <PhotoUploader
                    location={location}
                    reload={reload}
                    key='photo1'
                    photoKey='photoone'
                    uploadWebRequest={createLocationOne}
                    deleteWebRequest={deleteLocationOne}></PhotoUploader>
                <PhotoUploader
                    location={location}
                    reload={reload}
                    key='photo2'
                    photoKey='phototwo'
                    uploadWebRequest={createLocationTwo}
                    deleteWebRequest={deleteLocationTwo}></PhotoUploader>
                <PhotoUploader
                    location={location}
                    reload={reload}
                    key='photo3'
                    photoKey='photothree'
                    uploadWebRequest={createLocationThree}
                    deleteWebRequest={deleteLocationThree}></PhotoUploader>
            </div>
        </div>
    );
};
