import React, { useMemo, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useLiveQuery } from "dexie-react-hooks";

import type { VoxelItem } from "../../interfaces/voxel-item";
import { db } from "../../db";
import { useConfirm } from "../../dialogs/use-confirm/use-confirm";
import { useEditVoxel } from "../../dialogs/use-edit-voxel/use-edit-voxel";
import { SymmetrieTypeUtils } from "../../utilities/symmetrie-type";
import { SymmetrieTypes } from "../../constants/symmetrie-types";

export const Voxels: React.FC = () => {
  const voxels = useLiveQuery(() => db.voxels.toArray());
  const { dialogView: editDialog, openDialog: editVoxel } = useEditVoxel();
  const { dialogView: confirmDialog, openDialog: openConfirm } = useConfirm();

  const header = useMemo(() => {
    return (
      <div className="flex flex-row-reverse gap-2">
        <Button
          label="Add Voxel"
          icon="pi pi-plus"
          onClick={async () => {
            const result = await editVoxel();
            if (result.type === "cancel") {
              return;
            }

            const { value: voxel } = result;

            await db.transaction("rw", db.voxels, db.unitCells, async () => {
              await db.voxels.add(voxel);
              const cells = SymmetrieTypeUtils.createUnitCells(
                voxel.id,
                voxel.type
              );
              await db.unitCells.bulkAdd(cells);
            });
          }}
        />
      </div>
    );
  }, [editVoxel]);

  const renderColorColumn = useCallback(
    ({ id }: VoxelItem): React.ReactNode => {
      return (
        <div
          className="w-8 h-8 rounded border-2"
          style={{ backgroundColor: `#${id.toString(16).padStart(6, "0")}` }}
        />
      );
    },
    []
  );

  const renderEditColumn = useCallback(
    ({ id, name, type }: VoxelItem): React.ReactNode => {
      return (
        <div className="flex flex-row gap-1">
          <Button
            icon="pi pi-pencil"
            rounded
            onClick={async () => {
              const result = await editVoxel({ id, name, type });
              if (result.type === "cancel") {
                return;
              }
              const { value: nextValue } = result;

              await db.transaction("rw", db.voxels, db.unitCells, async () => {
                await db.voxels.update(id, nextValue);

                const oldCellIds = SymmetrieTypeUtils.createUnitCells(
                  id,
                  type
                ).map((item) => item.id);
                await db.unitCells.bulkDelete(oldCellIds);
                const cells = SymmetrieTypeUtils.createUnitCells(
                  nextValue.id,
                  nextValue.type
                );
                await db.unitCells.bulkPut(cells);
              });
            }}
          />
          <Button
            icon="pi pi-trash"
            rounded
            onClick={async () => {
              const result = await openConfirm(
                "Remove",
                "Are you sure want to remove the voxel?"
              );
              if (result.type === "cancel") {
                return;
              }
              await db.voxels.delete(id);
            }}
          />
        </div>
      );
    },
    [editVoxel, openConfirm]
  );

  const emptyMessage = useMemo(() => {
    return (
      <div className="flex flex-col gap-5 items-center">
        <div>No results found</div>
        <div>
          <Button
            label="Import Sample Voxels"
            icon="pi pi-file-import"
            onClick={async () => {
              await db.transaction("rw", db.voxels, db.unitCells, async () => {
                await db.voxels.bulkPut([
                  { id: 0x4a4a4a, name: "Stone", type: SymmetrieTypes.Solid },
                  { id: 0xffffff, name: "Air", type: SymmetrieTypes.Solid },
                ]);

                await db.unitCells.bulkPut([
                  { id: 0x4a4a4a, voxel_id: 0x4a4a4a, is_primary: true },
                  { id: 0xffffff, voxel_id: 0xffffff, is_primary: true },
                ]);
              });
            }}
          />
        </div>
      </div>
    );
  }, []);

  return (
    <div className="card">
      <DataTable
        value={voxels}
        header={header}
        tableStyle={{ minWidth: "60rem" }}
        emptyMessage={emptyMessage}
      >
        <Column
          field="id"
          header="id"
          body={({ id }: VoxelItem) => (
            <code>{"#" + id.toString(16).padStart(6, "0")}</code>
          )}
        />
        <Column header="Color" body={renderColorColumn}></Column>
        <Column field="name" header="Name"></Column>
        <Column field="type" header="Symmetry Type"></Column>
        <Column header="Operation" body={renderEditColumn} />
      </DataTable>
      {confirmDialog}
      {editDialog}
    </div>
  );
};
