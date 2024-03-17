import type { Table } from "dexie";
import Dexie from "dexie";

import type { VoxelItem } from "./interfaces/voxel-item";
import type { IUnitCell } from "./interfaces/unit-cell";
import { SymmetrieTypes } from "./constants/symmetrie-types";

export class DexieDatabase extends Dexie {
  voxels!: Table<VoxelItem>;
  unitCells!: Table<IUnitCell>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      voxels: "id, namem, type", // Primary key and indexed props
      unitCells: "id, is_primary, voxel_id",
    });

    this.voxels.bulkPut([
      { id: 0x4a4a4a, name: "Stone", type: SymmetrieTypes.Solid },
    ]);

    this.unitCells.bulkPut([
      { id: 0x4a4a4a, voxel_id: 0x4a4a4a, is_primary: true },
    ]);
  }
}

export const db = new DexieDatabase();
