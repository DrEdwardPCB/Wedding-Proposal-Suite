import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect, useRef, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "../../apis/admin";
import { GridColumns } from "@mui/x-data-grid/models";
import { User } from "../../components/common/entityInterface";
import { Button } from "@mui/material";
import { CreateUserForm } from "../../components/admin/createUserForm";
import { UpdateUserForm } from "../../components/admin/updateUserForm";
export const UserPage = () => {
    const { user, token, isLoggedin } = useSelector(
        (state: RootType) => state.user
    );

    const [rows, setRows] = useState<Partial<User>[]>([]);
    const colDef: GridColumns = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                flex: 1,
            },
            {
                field: "loginName",
                headerName: "loginName",
                flex: 1,
            },
            {
                field: "isCameraMan",
                headerName: "is camera man?",
                flex: 1,
                type: "boolean",
            },
            {
                field: "isAdmin",
                headerName: "is admin?",
                flex: 1,
                type: "boolean",
            },
            {
                field: "isApp",
                headerName: "is App?",
                flex: 1,
                type: "boolean",
            },
        ],
        []
    );
    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        fetchUser();
    };
    const fetchUser = async () => {
        const response = await getUsers(token as string);
        const rawUserList = response.data.data;
        console.log(rawUserList);
        setRows(rawUserList);
    };
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            <h2 className='text-2xl text-center'>Admin User Page</h2>
            <p className='text-center'>perform CRUD action on user</p>
            <div className='flex justify-end'>
                <Button
                    onClick={() => {
                        setOpenCreate(true);
                    }}>
                    Add User
                </Button>
            </div>
            <CreateUserForm
                open={openCreate}
                handleClose={setOpenCreate}
                title='Create new user'
                createWebRequest={createUser}
                reload={reload}
            />
            <UpdateUserForm
                open={openEdit}
                handleClose={setOpenEdit}
                title='Edit user'
                reload={reload}
                id={selectedId}
                showWebRequest={getUser}
                updateWebRequest={updateUser}
                deleteWebRequest={deleteUser}
            />
            <div className='grow'>
                <div className='h-[500px]'>
                    <DataGrid
                        columns={colDef}
                        rows={rows}
                        onRowDoubleClick={(params) => {
                            setSelectedId(params.row.id);
                            setOpenEdit(true);
                        }}></DataGrid>
                </div>
            </div>
        </div>
    );
};
