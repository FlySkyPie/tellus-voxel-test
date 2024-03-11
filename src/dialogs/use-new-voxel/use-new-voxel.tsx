import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";

import { Dialog } from "./dialog";

type IResult =
  | {
      type: "cancel";
      value?: undefined;
    }
  | {
      type: "result";
      value: {
        id: number;
        name: string;
      };
    };

type IToken = {
  id: string;
  isOpen: boolean;
  resolve: (result: IResult) => void;
};

export const useNewVoxel = () => {
  const [token, setToken] = useState<IToken>();

  const openDialog = useCallback(() => {
    return new Promise<IResult>((resolve) => {
      setToken({
        id: nanoid(),
        isOpen: true,
        resolve,
      });
    });
  }, []);

  const handleClose = useCallback(() => {
    token && token.resolve({ type: "cancel" });

    setToken((prev) => {
      if (!prev) {
        return prev;
      }
      return { ...prev, isOpen: false };
    });
  }, [token]);

  const handleSubmit = useCallback((id: number, name: string) => {
    token && token.resolve({ type: "result", value: { id, name } });

    setToken((prev) => {
      if (!prev) {
        return prev;
      }
      return { ...prev, isOpen: false };
    });
  }, [token]);

  const dialogView = useMemo(() => {
    if (!token) {
      return null;
    }

    return (
      <Dialog
        key={token.id}
        isOpen={token.isOpen}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    );
  }, [handleClose, handleSubmit, token]);

  return { openDialog, dialogView };
};
