import type { Table } from "dexie";
import Dexie from "dexie";

import type { VoxelItem } from "./interfaces/voxel-item";

export class DexieDatabase extends Dexie {
  voxels!: Table<VoxelItem>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      voxels: "id, name", // Primary key and indexed props
    });

    this.voxels.bulkPut([{ id: 0x4a4a4a, name: "Stone" }]);
  }
}

export const db = new DexieDatabase();
