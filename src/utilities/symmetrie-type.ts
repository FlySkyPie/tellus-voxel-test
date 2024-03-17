import type { IUnitCell } from "../interfaces/unit-cell";
import { SymmetrieTypes } from "../constants/symmetrie-types";

export abstract class SymmetrieTypeUtils {
  public static symmetrieOptions = [
    { name: "Solid", code: SymmetrieTypes.Solid },
    { name: "XZ-Reflection", code: SymmetrieTypes.XZ_Reflection },
    { name: "Y-Rotation", code: SymmetrieTypes.Y_Rotation },
    { name: "Y-Symmetric-Rotation", code: SymmetrieTypes.Y_Symmetric_Rotation },
  ];

  public static createUnitCells(
    voxelId: number,
    type: SymmetrieTypes
  ): IUnitCell[] {
    if (type === SymmetrieTypes.Solid) {
      return [{ voxel_id: voxelId, id: voxelId, is_primary: true }];
    }
    if (type === SymmetrieTypes.XZ_Reflection) {
      return [
        { voxel_id: voxelId, id: voxelId, is_primary: true },
        { voxel_id: voxelId, id: voxelId + 1, is_primary: false },
      ];
    }
    if (type === SymmetrieTypes.Y_Rotation) {
      return [
        { voxel_id: voxelId, id: voxelId, is_primary: true },
        { voxel_id: voxelId, id: voxelId + 1, is_primary: false },
        { voxel_id: voxelId, id: voxelId + 2, is_primary: false },
        { voxel_id: voxelId, id: voxelId + 3, is_primary: false },
      ];
    }
    return [
      { voxel_id: voxelId, id: voxelId, is_primary: true },
      { voxel_id: voxelId, id: voxelId + 1, is_primary: false },
      { voxel_id: voxelId, id: voxelId + 2, is_primary: false },
      { voxel_id: voxelId, id: voxelId + 3, is_primary: false },
      { voxel_id: voxelId, id: voxelId + 4, is_primary: false },
      { voxel_id: voxelId, id: voxelId + 5, is_primary: false },
      { voxel_id: voxelId, id: voxelId + 6, is_primary: false },
      { voxel_id: voxelId, id: voxelId + 7, is_primary: false },
    ];
  }
}
