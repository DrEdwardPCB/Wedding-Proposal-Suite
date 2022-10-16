import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCheckpoint } from "../../apis/checkpoint";
import { CheckpointEditForm } from "../../components/checkpoint/checkpointEditForm";
import { User } from "../../components/common/entityInterface";
import { RootType } from "../../redux/reducers/rootReducers";
export const EditPage = () => {
    const { user, token, isLoggedin } = useSelector(
        (state: RootType) => state.user
    );
    const [checkpoint, setCheckpoint] = useState<Omit<User, "password"> | null>(
        null
    );
    useEffect(() => {
        reload();
    }, [user, token]);
    const reload = () => {
        fetchCheckpoint();
    };
    const fetchCheckpoint = async () => {
        const response = await getCheckpoint(token as string);
        const rawCheckpoint = response.data.data;
        console.log(rawCheckpoint);
        setCheckpoint(rawCheckpoint);
    };
    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto items-center'>
            <h2 className='text-2xl text-center'>Checkpoint Edit Page</h2>
            <p className='text-center'>
                perform editing details for a checkpoint from helper
            </p>
            {checkpoint && checkpoint.location ? (
                <CheckpointEditForm
                    location={checkpoint.location}
                    reload={reload}></CheckpointEditForm>
            ) : (
                <div className='flex items-center justify-center w-full grow'>
                    <h1 className='text-2xl text-center'>
                        USER DOES NOT HAVE ASSOCIATED CHECKPOINT
                    </h1>
                </div>
            )}
        </div>
    );
};
