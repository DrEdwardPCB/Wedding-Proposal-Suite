import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect, useRef, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    createPasscode,
    createPhoto,
    deletePasscode,
    deletePhoto,
    getPasscode,
    getPhotos,
    updatePasscode,
} from "../../apis/admin";
import { GridColumns } from "@mui/x-data-grid/models";
import { Photo } from "../../components/common/entityInterface";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { isNil } from "lodash";
import dayjs from "dayjs";
import { CreatePhotoForm } from "../../components/admin/createPhotoForm";
import { DeletePhotoForm } from "../../components/admin/deletePhotoForm";
import { getPhoto } from "../../apis/admin";

export const PhotosPage = () => {
    const { token } = useSelector((state: RootType) => state.user);
    const [rows, setRows] = useState<Photo[]>([]);
    const [selectedId, setSelectedId] = useState("");
    const colDef: GridColumns = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                flex: 1,
            },
            {
                field: "createdAt",
                headerName: "Created At",
                flex: 1,
                renderCell: (params) => {
                    if (isNil(params.value)) {
                        return "not scanned yet";
                    }
                    return dayjs(params.value).toDate().toLocaleString();
                },
            },
            {
                field: "photo",
                headerName: "Photo Path",
                flex: 1,
            },
            {
                field: "deletedAt",
                headerName: "Deleted At",
                flex: 1,
                renderCell: (params) => {
                    if (isNil(params.value)) {
                        return "N/A";
                    }
                    return dayjs(params.value).toDate().toLocaleString();
                },
            },
        ],
        []
    );
    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        fetchPhotos();
    };

    const fetchPhotos = async () => {
        const response = await getPhotos(token as string);
        const rawPhoto = response.data.data as Photo[];
        console.log(rawPhoto);
        setRows(rawPhoto);
    };

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            <h2 className='text-2xl text-center'>Admin Photo Page</h2>
            <p className='text-center'>perform CRUD action on Photo</p>
            <div className='flex justify-end'>
                <Button
                    onClick={() => {
                        setOpenCreate(true);
                    }}>
                    Add Photo
                </Button>
            </div>
            <CreatePhotoForm
                open={openCreate}
                setOpen={setOpenCreate}
                createWebRequest={createPhoto}
                reload={reload}
            />
            <DeletePhotoForm
                id={selectedId === "" ? null : selectedId}
                open={openEdit}
                setOpen={setOpenEdit}
                reload={reload}
                showWebRequest={getPhoto}
                deleteWebRequest={deletePhoto}
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
