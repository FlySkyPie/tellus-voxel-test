import React, { useMemo, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useLiveQuery } from "dexie-react-hooks";

import type { VoxelItem } from "../../interfaces/voxel-item";
import { db } from "../../db";
import { useNewVoxel } from "../../dialogs/use-new-voxel/use-new-voxel";

export const Voxels: React.FC = () => {
  const voxles = useLiveQuery(() => db.voxels.toArray());
  const { dialogView, openDialog } = useNewVoxel();

  const header = useMemo(() => {
    return (
      <div className="flex flex-row-reverse gap-2">
        <Button
          label="Add Voxel"
          icon="pi pi-plus"
          onClick={async () => {
            const result = await openDialog();
            if (result.type === "cancel") {
              return;
            }
            console.log(result)
          }}
        />
      </div>
    );
  }, [openDialog]);

  const renderColorColumn = useCallback(
    ({ id }: VoxelItem): React.ReactNode => {
      return (
        <div
          className="w-8 h-8 rounded"
          style={{ backgroundColor: `#${id.toString(16)}` }}
        />
      );
    },
    []
  );

  const renderEditColumn = useCallback((): React.ReactNode => {
    return <Button icon="pi pi-pencil" rounded />;
  }, []);

  return (
    <div className="card">
      <DataTable
        value={voxles}
        header={header}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column
          field="id"
          header="id"
          body={({ id }: VoxelItem) => id.toString(16)}
        />
        <Column header="Color" body={renderColorColumn}></Column>
        <Column field="name" header="Name"></Column>
        <Column header="Operation" body={renderEditColumn} />
      </DataTable>
      {dialogView}
    </div>
  );
};
