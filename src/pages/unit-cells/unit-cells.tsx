import React, { useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useLiveQuery } from "dexie-react-hooks";

import type { IUnitCell } from "../../interfaces/unit-cell";
import { db } from "../../db";

export const UnitCells: React.FC = () => {
  const unitCells = useLiveQuery(() => db.unitCells.toArray());

  const renderColorColumn = useCallback(
    ({ id }: IUnitCell): React.ReactNode => {
      return (
        <div
          className="w-8 h-8 rounded border-2"
          style={{ backgroundColor: `#${id.toString(16).padStart(6, "0")}` }}
        />
      );
    },
    []
  );

  return (
    <div className="card">
      <DataTable value={unitCells} tableStyle={{ minWidth: "60rem" }}>
        <Column
          field="id"
          header="id"
          body={({ id }: IUnitCell) => (
            <code>{"#" + id.toString(16).padStart(6, "0")}</code>
          )}
        />
        <Column
          field="voxel_id"
          header="voxel_id"
          body={({ voxel_id }: IUnitCell) => (
            <code>{"#" + voxel_id.toString(16).padStart(6, "0")}</code>
          )}
        />
        <Column header="Color" body={renderColorColumn}></Column>
        <Column field="is_primary" header="is_primary"></Column>
      </DataTable>
    </div>
  );
};
