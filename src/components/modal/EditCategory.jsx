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

function EditCategory({ isOpen, onClose, categoryToEdit, setCategories }) {
  const { theme } = useMode();
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (categoryToEdit) {
      setEditedName(categoryToEdit.name);
    }
  }, [categoryToEdit]);

  const handleEdit = (e) => {
    e.preventDefault();
    if (editedName.trim() !== "") {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryToEdit.id
            ? { ...cat, name: editedName.trim() }
            : cat
        )
      );
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog
        size="md"
        sx={{
          ...(theme
            ? { backgroundColor: "#ffffff", border: "none" }
            : { backgroundColor: "#18181b", border: "none" }),
          overflow: "hidden",
          maxWidth: 400,
        }}
      >
        <ModalClose
          style={{ zIndex: "10", color: "#ffffff", fontWeight: "bold" }}
        />
        <DialogTitle sx={theme ? { color: "#000000" } : { color: "#ffffff" }}>
          Edit Category
        </DialogTitle>

        <DialogContent sx={{ overflowX: "hidden" }}>
          <form onSubmit={handleEdit}>
            <FormControl size="lg" className="space-y-1 w-full">
              <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                Category Name
              </label>
              <Input
                placeholder="Enter Category"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
                size="lg"
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
              />
            </FormControl>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`p-2 font-medium rounded-lg w-20 mt-8
                  ${
                    theme
                      ? "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      : "border border-green-500 text-green-500 hover:bg-green-600 hover:text-white"
                  }`}
              >
                Edit
              </button>
            </div>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default EditCategory;
