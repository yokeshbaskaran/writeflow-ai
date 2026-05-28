import axios from "axios";
import toast from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";
import { API_URL } from "../context/AppContext";

type DeleteChatProps = {
  onCancel: () => void;
  onConfirm: () => void;
  responseID: string;
};

const DeletePopup = ({ onCancel, onConfirm }: DeleteChatProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-bg-hover rounded-xl p-10 w-88 shadow-lg">
        <div className="flex flex-col items-center gap-3">
          <IoWarningOutline size={28} color="red" />
          <h2 className="text-xl text-text font-semibold text-center">
            Delete Chat?
          </h2>

          <p className="text-sm text-text text-center mb-6">
            Are you sure you want to delete? This action cannot be undone.
          </p>
        </div>

        <div className="flex text-text justify-between gap-3">
          <button
            onClick={onCancel}
            className="w-full py-2 rounded bg-bg cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full py-2 rounded bg-red-500 text-text cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
