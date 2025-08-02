import React, { useState } from "react";
import {
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  DialogContent,
  FormControl,
  Input,
} from "@mui/joy";
import { useMode } from "../../contexts/themeModeContext";

function AddSubcategoryModal({ isOpen, onClose, onAdd }) {
  const { theme } = useMode();
  const [subcategory, setSubcategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subcategory.trim() !== "") {
      onAdd(subcategory.trim());
      setSubcategory("");
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
        <ModalClose
          style={{ zIndex: "10", color: "#ffffff", fontWeight: "bold" }}
        />
        <div className="p-4">
          <DialogTitle
            sx={{
              color: theme ? "#000000" : "#ffffff",
              fontSize: "1.4rem",
              mb: 2,
            }}
          >
            Add Subcategory
          </DialogTitle>

          <DialogContent sx={{ overflowX: "hidden" }}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-7">
                <FormControl size="lg" className="space-y-1 w-full">
                  <label
                    className={` text-lg mb-2 ${
                      theme ? "text-zinc-800" : "text-zinc-300"
                    }`}
                  >
                    Subcategory Name
                  </label>
                  <Input
                    placeholder="Enter Subcategory"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
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
                <FormControl size="lg" className="space-y-1">
                  <label
                    className={` text-lg mb-2 ${
                      theme ? "text-zinc-800" : "text-zinc-300"
                    }`}
                  >
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
                  className={`p-2 font-medium rounded-lg w-20 mt-8
                  ${
                    theme
                      ? "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      : "border border-green-500 text-green-500 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  Add
                </button>
              </div>
            </form>
          </DialogContent>
        </div>
      </ModalDialog>
    </Modal>
  );
}

export default AddSubcategoryModal;
