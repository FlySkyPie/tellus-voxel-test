import type { Table } from "dexie";
import Dexie from "dexie";

import type { VoxelItem } from "./interfaces/voxel-item";
import type { IUnitCell } from "./interfaces/unit-cell";

export class DexieDatabase extends Dexie {
  voxels!: Table<VoxelItem>;
  unitCells!: Table<IUnitCell>;

  constructor() {
    super("tellus-voxel-test-database");
    this.version(1).stores({
      voxels: "id, namem, type", // Primary key and indexed props
      unitCells: "id, is_primary, voxel_id",
    });
  }
}

export const db = new DexieDatabase();
