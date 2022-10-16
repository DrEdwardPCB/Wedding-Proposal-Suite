import { GridColDef } from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
} from "@mui/material";
import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColumns } from "@mui/x-data-grid/models";
import { IIdable } from "./commonInterface";
import { cloneDeep, get } from "lodash";

export interface IRelationManagerProps<S, M extends IIdable> {
    open: boolean;
    closeHandler: () => void;
    title: string;
    associatedTitle: string;
    dissociatedTitle: string;
    options: M[];
    optionCol: GridColumns;
    parent: S | null;
    parentOptionExtractor: (parent: S) => M[];
    associateFnc: (parent: S, option: M) => any;
    dissociateFnc: (parent: S, option: M) => any;
}
export const RelationManager = <S, M extends IIdable>(
    props: IRelationManagerProps<S, M>
) => {
    const {
        open,
        closeHandler,
        title,
        associatedTitle,
        dissociatedTitle,
        options,
        optionCol,
        parent,
        parentOptionExtractor,
        associateFnc,
        dissociateFnc,
    } = props;

    const associatedRow = useMemo(() => {
        if (parent) {
            return parentOptionExtractor(parent);
        }
        return [];
    }, [parent, parentOptionExtractor]);

    const associatedCol = useMemo(() => {
        {
            const dissoButton: GridColDef = {
                field: "id",
                headerName: "Action",
                align: "center",
                renderCell: (params) => {
                    return (
                        <IconButton
                            onClick={() => {
                                if (parent) {
                                    dissociateFnc(
                                        parent,
                                        options.find(
                                            (e) =>
                                                get(e, "id", null) ===
                                                params.value
                                        ) as NonNullable<M>
                                    );
                                }
                            }}>
                            <Icon className='text-red-400'>remove</Icon>
                        </IconButton>
                    );
                },
            };
            const returnCol = cloneDeep(optionCol);
            returnCol.unshift(dissoButton);
            return returnCol;
        }
    }, [optionCol, parent, dissociateFnc]);

    const dissociatedRow = useMemo(() => {
        if (associatedRow) {
            const assoId = associatedRow.map((e) => e?.id);
            return options.filter((e) => !assoId.includes(e?.id));
        }
        return [];
    }, [associatedRow, options]);
    const dissociatedCol = useMemo(() => {
        const dissoButton: GridColDef = {
            field: "id",
            headerName: "Action",
            align: "center",
            renderCell: (params) => {
                return (
                    <IconButton
                        onClick={() => {
                            if (parent) {
                                associateFnc(
                                    parent,
                                    options.find(
                                        (e) =>
                                            get(e, "id", null) === params.value
                                    ) as NonNullable<M>
                                );
                            }
                        }}>
                        <Icon className='text-green-400'>add</Icon>
                    </IconButton>
                );
            },
        };
        const returnCol = cloneDeep(optionCol);
        returnCol.unshift(dissoButton);
        return returnCol;
    }, [optionCol, parent, associateFnc]);

    return (
        <Dialog open={open} maxWidth='md' fullWidth={true}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <div className='flex flex-col gap-4'>
                    <div>
                        <p>{associatedTitle}</p>
                        <div className='h-[300px]'>
                            <DataGrid
                                columns={associatedCol}
                                rows={associatedRow}></DataGrid>
                        </div>
                    </div>
                    <div>
                        <p>{dissociatedTitle}</p>
                        <div className='h-[300px]'>
                            <DataGrid
                                columns={dissociatedCol}
                                rows={dissociatedRow}></DataGrid>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        closeHandler();
                    }}>
                    close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
