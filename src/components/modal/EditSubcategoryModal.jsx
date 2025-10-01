import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Select,
  Option,
} from "@mui/joy";
import { useMode } from "../../contexts/themeModeContext";
import CategoryServices from "../../services/CategoryServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import { LoaderCircle } from "lucide-react";

function EditSubcategoryModal({ isOpen, onClose, subcategoryToEdit, onEdit, setReload }) {
  const { theme } = useMode();
  const [editedName, setEditedName] = useState("");
  const [categoryOfSub, setCategoryOfSub] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    const categoryCall = async () => {
      setCategoryLoading(true);
      try {
        const res = await CategoryServices.FetchAllCategory();
        if (res.success === true) {
          setCategories(res.data);
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      }
      setCategoryLoading(false);
    };
    categoryCall();
  }, []);

  useEffect(() => {
    if (subcategoryToEdit) {
      setEditedName(subcategoryToEdit.name);
      setCategoryOfSub(subcategoryToEdit.categoryOfSub);
    }
  }, [subcategoryToEdit]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const body = {
        subcategory_name: editedName,
        subcategory_image: "hello",
        category_id: categoryOfSub,
      };
      const res = await CategoryServices.UpdateSubcategory(body, subcategoryToEdit.id);
      if (res.success === true) {
        setReload((prevData) => {
          return !prevData;
        });
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    }
    setLoading(false);
    onClose();
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
            <form onSubmit={handleSubmit}>
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
                  <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Image</label>
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
                <FormControl
                  size="lg"
                  className={`space-y-1 w-full ${
                    categoryLoading ? "cursor-not-allowed" : "cursor-pointer"
                  } `}
                >
                  <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Category</label>
                  <Select
                    value={categoryOfSub}
                    onChange={(_, val) => setCategoryOfSub(val)}
                    disabled={categoryLoading}
                  >
                    {categories.map((category) => (
                      <Option key={category.id} value={category.id} label={category.category_name}>
                        {category.category_name}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`p-2 font-medium rounded-lg w-24 mt-8 transition-all flex justify-center items-center
                  ${
                    theme
                      ? "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      : "border border-green-500 text-green-500 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  {loading ? <LoaderCircle className="animate-spin h-7" /> : <>Edit</>}
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
