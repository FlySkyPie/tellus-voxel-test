import { Dialog as PriDialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";

type IProps = {
  isOpen: boolean;

  title: string;
  description: string;

  onClose: () => void;
  onConfirm: () => void;
};

export const Dialog: React.FC<IProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmDialog
      // group="declarative"
      visible={isOpen}
      onHide={onClose}
      message={description}
      header={title}
      icon="pi pi-exclamation-triangle"
      accept={onConfirm}
      reject={onClose}
    />
  );
  return (
    <PriDialog
      visible={isOpen}
      modal
      header={title}
      style={{ width: "50rem" }}
      onHide={onClose}
    >
      <div></div>
      <div></div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </PriDialog>
  );
};
