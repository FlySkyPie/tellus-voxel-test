import { Dialog as PriDialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { ColorPicker } from "primereact/colorpicker";

type FormValues = {
  id: string;
  name: string;
};

type IProps = {
  value: {
    id: string;
    name: string;
  };

  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, name: string) => void;
};

export const Dialog: React.FC<IProps> = ({
  value,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: value,
  });

  const [id] = watch(["id"]);

  return (
    <PriDialog
      visible={isOpen}
      modal
      header="Edit Voxel"
      style={{ width: "50rem" }}
      onHide={onClose}
    >
      <form
        className="space-y-6"
        onSubmit={handleSubmit(({ id, name }) => {
          onSubmit(Number(`0x${id}`), name);
        })}
      >
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            id
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">#</span>
            </div>
            <input
              type="text"
              readOnly
              value={id}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <ColorPicker
                inputId="cp-hex"
                format="hex"
                value={id}
                {...register("id", { required: true })}
                className="mb-3"
              />
            </div>
          </div>
          {errors.id && <p>Id is required.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && <p>Name is required.</p>}
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </PriDialog>
  );
};
