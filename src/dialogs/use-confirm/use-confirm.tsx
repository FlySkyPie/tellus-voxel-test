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
      value: "confirm";
    };

type IToken = {
  id: string;
  isOpen: boolean;
  title: string;
  description: string;
  resolve: (result: IResult) => void;
};

export const useConfirm = () => {
  const [token, setToken] = useState<IToken>();

  const openDialog = useCallback((title: string, description: string) => {
    return new Promise<IResult>((resolve) => {
      setToken({
        id: nanoid(),
        title,
        description,
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

  const handleConfirm = useCallback(() => {
    token && token.resolve({ type: "result", value: "confirm" });

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
        title={token.title}
        description={token.description}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    );
  }, [handleClose, handleConfirm, token]);

  return { openDialog, dialogView };
};
