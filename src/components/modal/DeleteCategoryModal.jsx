import React from "react";
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

function DeleteCategoryModal({ isOpen, onClose, data, categories, setCategories }) {
  const { theme } = useMode();

  const handleDelete = async() => {
    try {
      const res = await CategoryServices.DeleteCategory()
      if(res.success === true){
        
      }
    } catch (error) {
      
    }
     const updatedCategories = categories.filter(
      (category) => category.id !== data?.id
    );
    setCategories(updatedCategories);
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

          <div className={`${theme ? "text-black" : "text-white"} mt-4 text-center`}>
            Are you sure you want to delete{" "}
            <strong>{data?.name || "this category"}</strong>?
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
              Delete
            </button>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default DeleteCategoryModal;
