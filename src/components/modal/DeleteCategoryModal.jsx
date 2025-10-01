import React,{useState} from "react";
import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { DeleteOutline } from "@mui/icons-material";
import { useMode } from "../../contexts/themeModeContext";
import CategoryServices from "../../services/CategoryServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import { LoaderCircle } from "lucide-react";

function DeleteCategoryModal({
  isOpen,
  onClose,
  categoryToDelete,
  setReload
}) {
  const { theme } = useMode();
  const [loading,setLoading]=useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await CategoryServices.DeleteCategory(categoryToDelete.id);
      if (res.success === true) {
        notifySuccess(res.message);
        setReload((prevData) => !prevData);
      }
    } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
    }
    setLoading(false)
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog
        size="lg"
        sx={
          theme
            ? { backgroundColor: "#ffffff", border: "none" }
            : { backgroundColor: "#18181b", border: "none" }
        }
      >
        <ModalClose
          style={
            theme
              ? { zIndex: "10", color: "#000000", fontWeight: "bold" }
              : { zIndex: "10", color: "#ffffff", fontWeight: "bold" }
          }
        />
        <DialogTitle sx={theme ? { color: "#000000" } : { color: "#ffffff" }}>
          Delete Category
        </DialogTitle>
        <DialogContent className="w-[40vw] overflow-scroll sideBarNone">
          <div className="text-red-500 mt-3 flex justify-center items-center">
            <DeleteOutline fontSize="large" />
            <div className="text-3xl font-semibold ml-2">Caution</div>
          </div>

          <div
            className={`${
              theme ? "text-black" : "text-white"
            } mt-4 text-center`}
          >
            Are you sure you want to delete{" "}
            <strong>{categoryToDelete?.name || "this category"}</strong>?
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="border border-green-500 text-green-500 px-6 py-1 rounded-lg transition-all duration-700 hover:cursor-pointer font-semibold hover:text-white hover:bg-green-500"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="border border-red-500 text-red-500 px-6 py-1 rounded-lg transition-all duration-700 hover:cursor-pointer font-semibold hover:text-white hover:bg-red-500"
            >
              {loading ? <LoaderCircle className="animate-spin h-7" /> : <>Delete</>}
            </button>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default DeleteCategoryModal;
