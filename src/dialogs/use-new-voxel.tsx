import { useCallback, useMemo } from "react";

export const useNewVoxel = () => {
  const openDialog = useCallback(() => {
    return new Promise((resolve) => {});
  }, []);

  const dialogView = useMemo(() => {
    return null;
  }, []);

  return { openDialog, dialogView };
};
