import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect, useRef, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    assoNextLoc,
    assoUser,
    createLocation,
    deleteLocation,
    dissoNextLoc,
    dissoUser,
    getLocation,
    getLocations,
    getUsers,
    updateLocation,
} from "../../apis/admin";
import { GridColumns } from "@mui/x-data-grid/models";
import { User, Location } from "../../components/common/entityInterface";
import { Button } from "@mui/material";
import { Point } from "geojson";
import { get, isNil } from "lodash";
import dayjs from "dayjs";
import { CreateLocationForm } from "../../components/admin/createLocationForm";
import { UpdateLocationForm } from "../../components/admin/updateLocationForm";
import { RelationManager } from "../../components/common/RelationManager";
import { toast } from "react-toastify";
export const LocationPage = () => {
    const { token } = useSelector((state: RootType) => state.user);

    const [rows, setRows] = useState<Location[]>([]);
    const [relationAssoRows, setRelationAssoRows] = useState<
        Omit<User, "password">[]
    >([]);
    const [openUser, setOpenUser] = useState(false);
    const [openNext, setOpenNext] = useState(false);
    const openUserRelationManager = (id: string) => {
        setSelectedId(id);
        setOpenUser(true);
    };
    const openNextRelationManager = (id: string) => {
        setSelectedId(id);
        setOpenNext(true);
    };
    const handleCloseUser = () => {
        setOpenUser(false);
        setSelectedId("");
    };
    const handleCloseNext = () => {
        setOpenNext(false);
        setSelectedId("");
    };
    const colDef: GridColumns = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                flex: 1,
            },
            {
                field: "user",
                headerName: "user",
                flex: 1,
                renderCell: (params: any) => {
                    const user: User | null | undefined = params.value;
                    return (
                        <Button
                            onClick={() => {
                                openUserRelationManager(params.row.id);
                            }}>
                            {user?.loginName ?? "not assigned"}
                        </Button>
                    );
                },
            },
            {
                field: "displayName",
                headerName: "Display Name",
            },
            {
                field: "message",
                headerName: "Message",
            },
            {
                field: "photoone",
                headerName: "Photo 1",
            },
            {
                field: "phototwo",
                headerName: "Photo 2",
            },
            {
                field: "photothree",
                headerName: "Photo 3",
            },
            {
                field: "location",
                headerName: "Location",
                renderCell: (params: any) => {
                    const point: Point | null | undefined = params.value;
                    if (isNil(point)) {
                        return (
                            <div>
                                <p>N/A</p>
                            </div>
                        );
                    }
                    return (
                        <div>
                            <p>lat {point.coordinates[1]}</p>
                            <p>long {point.coordinates[0]}</p>
                        </div>
                    );
                },
            },
            {
                field: "prev",
                headerName: "Prev",
                flex: 1,
                renderCell: (params: any) => {
                    const location: Location | null | undefined = params.value;
                    return location?.displayName ?? "not assigned";
                },
            },
            {
                field: "next",
                headerName: "Next",
                flex: 1,
                renderCell: (params: any) => {
                    const location: Location | null | undefined = params.value;
                    return (
                        <Button
                            onClick={() => {
                                openNextRelationManager(params.row.id);
                            }}>
                            {location?.displayName ?? "not assigned"}
                        </Button>
                    );
                },
            },
            {
                field: "scanTime",
                displayName: "Scan At",
                flex: 1,
                renderCell: (params) => {
                    if (isNil(params.value)) {
                        return "not scanned yet";
                    }
                    return dayjs(params.value).toDate().toLocaleString();
                },
            },
        ],
        [openNextRelationManager, openUserRelationManager]
    );
    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        fetchLocation();
        fetchUser();
    };
    const fetchLocation = async () => {
        const response = await getLocations(token as string);
        const rawLocationList = response.data.data;
        console.log(rawLocationList);
        setRows(rawLocationList);
    };
    const fetchUser = async () => {
        const response = await getUsers(token as string);
        const rawUserList = response.data.data as Omit<User, "password">[];
        console.log(rawUserList);
        setRelationAssoRows(rawUserList);
    };
    const assoUserFnc = async (
        parent: Location,
        option: Omit<User, "password">
    ) => {
        try {
            const result = await assoUser(
                parent.id,
                option.id,
                token as string
            );
            toast.success("association success");
        } catch (err) {
            console.error(err);
            toast.error("association failed");
        }
        setOpenUser(false);
        setSelectedId("");
        reload();
    };
    const dissoUserFnc = async (
        parent: Location,
        option: Omit<User, "password">
    ) => {
        try {
            const result = await dissoUser(parent.id, token as string);
            toast.success("dissociation success");
        } catch (err) {
            console.error(err);
            toast.error("dissociation failed");
        }
        setOpenUser(false);
        setSelectedId("");
        reload();
    };

    const assoNextFnc = async (parent: Location, option: Location) => {
        try {
            const result = await assoNextLoc(
                parent.id,
                option.id,
                token as string
            );
            toast.success("association success");
        } catch (err) {
            console.error(err);
            toast.error("association failed");
        }
        setOpenNext(false);
        setSelectedId("");
        reload();
    };
    const dissoNextFnc = async (parent: Location, option: Location) => {
        try {
            const result = await dissoNextLoc(parent.id, token as string);
            toast.success("dissociation success");
        } catch (err) {
            console.error(err);
            toast.error("dissociation failed");
        }
        setOpenNext(false);
        setSelectedId("");
        reload();
    };
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    useEffect(() => {
        loadSingleEntry();
    }, [selectedId]);

    const loadSingleEntry = async () => {
        console.log(selectedId);
        if (selectedId !== "") {
            const result = await getLocation(selectedId, token as string);
            setSelectedEntry(result.data.data);
        } else {
            setSelectedEntry(null);
        }
    };
    const [selectedEntry, setSelectedEntry] = useState<Location | null>(null);
    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            <h2 className='text-2xl text-center'>Admin Location Page</h2>
            <p className='text-center'>perform CRUD action on Location</p>
            <div className='flex justify-end'>
                <Button
                    onClick={() => {
                        setOpenCreate(true);
                    }}>
                    Add Location
                </Button>
            </div>
            <CreateLocationForm
                open={openCreate}
                handleClose={setOpenCreate}
                title='Create location'
                createWebRequest={createLocation}
                reload={reload}
            />
            <UpdateLocationForm
                open={openEdit}
                handleClose={setOpenEdit}
                title='Edit location'
                reload={reload}
                id={selectedId}
                showWebRequest={getLocation}
                updateWebRequest={updateLocation}
                deleteWebRequest={deleteLocation}
            />
            <RelationManager<Location, Omit<User, "password">>
                open={openUser}
                closeHandler={handleCloseUser}
                parent={selectedEntry}
                title='Location User Relation Manager'
                associatedTitle='Associated User'
                dissociatedTitle='Dissociated User'
                parentOptionExtractor={(parent) => {
                    const assoedUser = get(parent, "user", null);
                    return assoedUser ? [assoedUser] : [];
                }}
                options={relationAssoRows}
                associateFnc={assoUserFnc}
                dissociateFnc={dissoUserFnc}
                optionCol={
                    [
                        {
                            field: "loginName",
                            headerName: "loginName",
                        },
                        {
                            field: "isCameraMan",
                            headerName: "is camera man?",
                            type: "boolean",
                        },
                        {
                            field: "isAdmin",
                            headerName: "is admin?",
                            type: "boolean",
                        },
                        {
                            field: "isApp",
                            headerName: "is App?",
                            type: "boolean",
                        },
                    ] as GridColumns
                }></RelationManager>
            <RelationManager<Location, Location>
                open={openNext}
                closeHandler={handleCloseNext}
                parent={selectedEntry}
                title='Location Next Location Relation Manager'
                associatedTitle='Associated Next'
                dissociatedTitle='Dissociated Next'
                parentOptionExtractor={(parent) => {
                    const assoedNext = get(parent, "next", null);
                    return assoedNext ? [assoedNext] : [];
                }}
                options={rows.filter((e) => e.id !== selectedEntry?.id) ?? []}
                associateFnc={assoNextFnc}
                dissociateFnc={dissoNextFnc}
                optionCol={
                    [
                        {
                            field: "displayName",
                            headerName: "Display Name",
                        },
                        {
                            field: "location",
                            headerName: "Location",
                            renderCell: (params: any) => {
                                const point: Point | null | undefined =
                                    params.value;
                                if (isNil(point)) {
                                    return (
                                        <div>
                                            <p>N/A</p>
                                        </div>
                                    );
                                }
                                return (
                                    <div>
                                        <p>lat {point.coordinates[1]}</p>
                                        <p>long {point.coordinates[0]}</p>
                                    </div>
                                );
                            },
                        },
                    ] as GridColumns
                }></RelationManager>
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
