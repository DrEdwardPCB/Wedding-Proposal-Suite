import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect, useRef, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers } from "../../apis/admin";
import { GridColumns } from "@mui/x-data-grid/models";
export const UserPage = () => {
    const { user, token, isLoggedin } = useSelector(
        (state: RootType) => state.user
    );

    const [rows, setRows] = useState([]);
    const colDef: GridColumns = useMemo(
        () => [
            {
                field: "id",
                displayName: "ID",
            },
        ],
        []
    );

    const reload = () => {};
    const fetchUser = async () => {
        getUsers(token as string);
    };
    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            <h2 className='text-2xl text-center'>Admin User Page</h2>
            <p className='text-center'>perform CRUD action on user</p>
            <div></div>
            <div className='grow'>
                <DataGrid columns={colDef} rows={rows}></DataGrid>
            </div>
        </div>
    );
};
