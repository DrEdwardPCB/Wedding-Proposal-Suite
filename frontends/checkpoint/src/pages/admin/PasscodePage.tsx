import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect, useRef, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    createPasscode,
    deletePasscode,
    getPasscode,
    updatePasscode,
} from "../../apis/admin";
import { GridColumns } from "@mui/x-data-grid/models";
import { Passcode, Location } from "../../components/common/entityInterface";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { CreatePasscodeForm } from "../../components/admin/createPasscodeForm";

import { UpdatePasscodeForm } from "../../components/admin/updatePasscodeForm";

export const PasscodePage = () => {
    const { token } = useSelector((state: RootType) => state.user);

    const [rows, setRows] = useState<Passcode[]>([]);

    const colDef: GridColumns = useMemo(
        () => [
            {
                field: "passcode",
                headerName: "Passcode",
                flex: 1,
            },
        ],
        []
    );
    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        fetchPasscode();
    };

    const fetchPasscode = async () => {
        const response = await getPasscode(token as string);
        const rawPasscode = response.data.data as Passcode;
        console.log(rawPasscode);
        setRows(rawPasscode ? [rawPasscode] : []);
    };

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            <h2 className='text-2xl text-center'>Admin Passcode Page</h2>
            <p className='text-center'>perform CRUD action on Location</p>
            <div className='flex justify-end'>
                <Button
                    onClick={() => {
                        setOpenCreate(true);
                    }}>
                    Add Passcode
                </Button>
            </div>
            <CreatePasscodeForm
                open={openCreate}
                handleClose={setOpenCreate}
                title='Create Passcode'
                createWebRequest={createPasscode}
                reload={reload}
            />
            <UpdatePasscodeForm
                open={openEdit}
                handleClose={setOpenEdit}
                title='Edit Passcode'
                reload={reload}
                showWebRequest={getPasscode}
                updateWebRequest={updatePasscode}
                deleteWebRequest={deletePasscode}
            />
            <div className='grow'>
                <div className='h-[500px]'>
                    <DataGrid
                        columns={colDef}
                        rows={rows}
                        getRowId={(row) => row.passcode}
                        onRowDoubleClick={(params) => {
                            setOpenEdit(true);
                        }}></DataGrid>
                </div>
            </div>
        </div>
    );
};
