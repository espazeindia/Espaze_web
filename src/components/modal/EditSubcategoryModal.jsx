import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { useMode } from "../../contexts/themeModeContext";

function EditSubcategoryModal({ isOpen, onClose, subcategoryToEdit, onEdit }) {
  const { theme } = useMode();
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (subcategoryToEdit) {
      setEditedName(subcategoryToEdit);
    }
  }, [subcategoryToEdit]);

  const handleEdit = (e) => {
    e.preventDefault();
    if (editedName.trim()) {
      onEdit(editedName.trim());
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog
        size="lg"
        sx={{
          ...(theme
            ? { backgroundColor: "#ffffff", border: "none" }
            : { backgroundColor: "#18181b", border: "none" }),
        }}
      >
        <ModalClose sx={{ zIndex: 10, color: theme ? "#000000" : "#ffffff" }} />
        <div className="p-4">
          <DialogTitle
            sx={{
              color: theme ? "#000000" : "#ffffff",
              fontSize: "1.4rem",
              mb: 2,
            }}
          >
            Edit Subcategory
          </DialogTitle>

          <DialogContent sx={{ overflowX: "hidden" }}>
            <form onSubmit={handleEdit}>
              <div className="grid grid-cols-2 gap-7">
                <FormControl size="lg" className="space-y-1 w-full">
                  <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                    Subcategory Name
                  </label>
                  <Input
                    placeholder="Enter Subcategory"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    required
                    size="lg"
                    sx={{
                      backgroundColor: theme ? "#f4f4f5" : "#27272a",
                      color: theme ? "#27272a" : "#ffffff",
                      border: "none",
                    }}
                  />
                </FormControl>
                <FormControl size="lg" className="space-y-1">
                  <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                    Image
                  </label>
                  <Input
                    sx={
                      theme
                        ? {
                            backgroundColor: "#f4f4f5",
                            color: "#27272a",
                            border: "none",
                          }
                        : {
                            backgroundColor: "#27272a",
                            color: "#ffffff",
                            border: "none",
                          }
                    }
                    name="image"
                    type="file"
                    accept="images/*"
                    // value={formData.productName}
                    // onChange={handleChange}
                    size="lg"
                    placeholder="select Image"
                  />
                </FormControl>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`p-2 font-medium rounded-lg w-24 mt-8 transition-all
                  ${
                    theme
                      ? "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      : "border border-green-500 text-green-500 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  Save
                </button>
              </div>
            </form>
          </DialogContent>
        </div>
      </ModalDialog>
    </Modal>
  );
}

export default EditSubcategoryModal;
