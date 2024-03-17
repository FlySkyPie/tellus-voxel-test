import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";

import { SymmetrieTypes } from "../../constants/symmetrie-types";

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
        type: SymmetrieTypes;
      };
    };

type IToken = {
  id: string;
  isOpen: boolean;
  value: { id: string; name: string; type: SymmetrieTypes };
  resolve: (result: IResult) => void;
};

export const useEditVoxel = () => {
  const [token, setToken] = useState<IToken>();

  const openDialog = useCallback(
    (id: number, name: string, type: SymmetrieTypes) => {
      return new Promise<IResult>((resolve) => {
        setToken({
          id: nanoid(),
          isOpen: true,
          value: { id: id.toString(16).padStart(6, "0"), name, type },
          resolve,
        });
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    token && token.resolve({ type: "cancel" });

    setToken((prev) => {
      if (!prev) {
        return prev;
      }
      return { ...prev, isOpen: false };
    });
  }, [token]);

  const handleSubmit = useCallback(
    (id: number, name: string, type: SymmetrieTypes) => {
      token && token.resolve({ type: "result", value: { id, name, type } });

      setToken((prev) => {
        if (!prev) {
          return prev;
        }
        return { ...prev, isOpen: false };
      });
    },
    [token]
  );

  const dialogView = useMemo(() => {
    if (!token) {
      return null;
    }

    return (
      <Dialog
        key={token.id}
        value={token.value}
        isOpen={token.isOpen}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    );
  }, [handleClose, handleSubmit, token]);

  return { openDialog, dialogView };
};
