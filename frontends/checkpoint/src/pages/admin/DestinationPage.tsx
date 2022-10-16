import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect, useRef, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    assoDesLoc,
    createDestinationPartial,
    deleteDestinationPartial,
    getDestinationPartial,
    getDestinationPartials,
    dissoDesLoc,
    getLocation,
    getLocations,
    updateDestinationPartial,
} from "../../apis/admin";
import { GridColumns } from "@mui/x-data-grid/models";
import {
    DestinationPartial,
    Location,
} from "../../components/common/entityInterface";
import { Button } from "@mui/material";
import { Point } from "geojson";
import { get, isNil } from "lodash";
import { RelationManager } from "../../components/common/RelationManager";
import { toast } from "react-toastify";
import { CreateDestinationPartialForm } from "../../components/admin/createDestinationPartialForm";

import { UpdateDestinationPartialForm } from "../../components/admin/updateDestinationPartialForm";

export const DestinationPage = () => {
    const { token } = useSelector((state: RootType) => state.user);

    const [rows, setRows] = useState<DestinationPartial[]>([]);
    const [relationAssoRows, setRelationAssoRows] = useState<Location[]>([]);
    const [openLoc, setOpenLoc] = useState(false);

    const openLocRelationManager = (id: string) => {
        setSelectedId(id);
        setOpenLoc(true);
    };

    const handleCloseNext = () => {
        setOpenLoc(false);
        setSelectedId("");
    };
    const colDef: GridColumns = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                flex: 2,
            },
            {
                field: "message",
                headerName: "Message",
                flex: 2,
            },
            {
                field: "location",
                headerName: "Location",
                flex: 1,
                renderCell: (params: any) => {
                    const location: Location | null | undefined = params.value;
                    return (
                        <Button
                            onClick={() => {
                                openLocRelationManager(params.row.id);
                            }}>
                            {location?.displayName ?? "not assigned"}
                        </Button>
                    );
                },
            },
        ],
        [openLocRelationManager]
    );
    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        fetchLocation();
        fetchDestinationPartial();
    };
    const fetchLocation = async () => {
        const response = await getLocations(token as string);
        const rawLocationList = response.data.data as Location[];
        console.log(rawLocationList);
        setRelationAssoRows(rawLocationList);
    };
    const fetchDestinationPartial = async () => {
        const response = await getDestinationPartials(token as string);
        const rawDestinationPartial = response.data
            .data as DestinationPartial[];
        console.log(rawDestinationPartial);
        setRows(rawDestinationPartial);
    };
    const assoLocFnc = async (parent: DestinationPartial, option: Location) => {
        try {
            const result = await assoDesLoc(
                parent.id,
                option.id,
                token as string
            );
            toast.success("association success");
        } catch (err) {
            console.error(err);
            toast.error("association failed");
        }
        setOpenLoc(false);
        setSelectedId("");
        reload();
    };
    const dissoLocFnc = async (
        parent: DestinationPartial,
        option: Location
    ) => {
        try {
            const result = await dissoDesLoc(parent.id, token as string);
            toast.success("dissociation success");
        } catch (err) {
            console.error(err);
            toast.error("dissociation failed");
        }
        setOpenLoc(false);
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
            const result = await getDestinationPartial(
                selectedId,
                token as string
            );
            setSelectedEntry(result.data.data);
        } else {
            setSelectedEntry(null);
        }
    };
    const [selectedEntry, setSelectedEntry] =
        useState<DestinationPartial | null>(null);
    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            <h2 className='text-2xl text-center'>
                Admin Destination Partial Page
            </h2>
            <p className='text-center'>perform CRUD action on Location</p>
            <div className='flex justify-end'>
                <Button
                    onClick={() => {
                        setOpenCreate(true);
                    }}>
                    Add Destination Partial
                </Button>
            </div>
            <CreateDestinationPartialForm
                open={openCreate}
                handleClose={setOpenCreate}
                title='Create Destination Partial'
                createWebRequest={createDestinationPartial}
                reload={reload}
            />
            <UpdateDestinationPartialForm
                open={openEdit}
                handleClose={setOpenEdit}
                title='Edit Destination Partial'
                reload={reload}
                id={selectedId}
                showWebRequest={getDestinationPartial}
                updateWebRequest={updateDestinationPartial}
                deleteWebRequest={deleteDestinationPartial}
            />
            <RelationManager<DestinationPartial, Location>
                open={openLoc}
                closeHandler={handleCloseNext}
                parent={selectedEntry}
                title='Location Next Location Relation Manager'
                associatedTitle='Associated Loc'
                dissociatedTitle='Dissociated Loc'
                parentOptionExtractor={(parent) => {
                    const assoedNext = get(parent, "location", null);
                    return assoedNext ? [assoedNext] : [];
                }}
                options={relationAssoRows}
                associateFnc={assoLocFnc}
                dissociateFnc={dissoLocFnc}
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
