import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Switch,
} from "@mui/joy";
import { useMode } from "../../contexts/themeModeContext";
import { LoaderCircle } from "lucide-react";
import InventoryServices from "../../services/InventoryServices";
import { notifyError, notifySuccess } from "../../utils/toast";

function UpdateInventory({ isOpen, onClose, data, setReload }) {
  const { theme } = useMode();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    price: "0",
    quantity: "0",
    manufacturingDate: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        price: data.price !== undefined ? String(data.price) : "0",
        quantity: data.quantity !== undefined ? String(data.quantity) : "0",
        manufacturingDate: data.manufacturingDate ?? "",
        expiryDate: data.expiryDate ?? "",
      });
      setVisible(data.visible === "visible");
    }
  }, [isOpen, data]);

  // Remove spinner arrows from number inputs using CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      input[type=number]::-webkit-inner-spin-button, 
      input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
      }
      input[type=number] { -moz-appearance: textfield; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "quantity") {
      // Only allow numbers, remove leading zeros except for "0"
      let val = value.replace(/[^0-9]/g, "");
      if (val.length > 1) val = val.replace(/^0+/, "");
      if (val === "") val = "0";
      setFormData((prev) => ({
        ...prev,
        [name]: val,
      }));
    } else if (name === "manufacturingDate" || name === "expiryDate") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...data,
        price: parseInt(formData.price, 10),
        quantity: parseInt(formData.quantity, 10),
        manufacturingDate: formData.manufacturingDate, // YYYY-MM-DD
        expiryDate: formData.expiryDate, // YYYY-MM-DD
        visible: visible ? "visible" : "hidden",
      };
      await InventoryServices.UpdateInventory(body);
      notifySuccess("Inventory updated successfully!");
      setReload((prev) => !prev);
      onClose();
    } catch (err) {
      notifyError("Failed to update inventory.");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

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
        <ModalClose style={{ zIndex: "10", color: "#ffffff", fontWeight: "bold" }} />
        <DialogTitle sx={theme ? { color: "#000000" } : { color: "#ffffff" }}>
          Update Inventory
        </DialogTitle>
        <DialogContent className=" w-[70vw] overflow-scroll sideBarNone">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              {/* Price */}
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Price</label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Product Price"
                  inputMode="numeric"
                />
              </FormControl>

              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Quantity</label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Product Quantity"
                  inputMode="numeric"
                />
              </FormControl>

              {/* Manufacturing Date */}
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Manufacturing Date
                </label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="manufacturingDate"
                  value={formData.manufacturingDate}
                  onChange={handleChange}
                  type="date"
                  required
                  size="lg"
                />
              </FormControl>

              {/* Expiry Date (Cannot be earlier than Manufacturing Date) */}
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Expiry Date</label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  type="date"
                  required
                  size="lg"
                  min={formData.manufacturingDate}
                />
              </FormControl>
              <div size="lg" className="flex gap-10 mt-2">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Visibility</label>
                <Switch
                  checked={visible}
                  onChange={(e) => {
                    setVisible(e.target.checked);
                  }}
                  sx={
                    theme
                      ? {
                          "--Switch-trackRadius": "13px",
                          "--Switch-trackWidth": "40px",
                          "--Switch-trackHeight": "19px",
                          "--Switch-thumbSize": "10px",
                          "&.Mui-checked": {
                            "--Switch-trackBackground": "#16a34a",
                          },
                          "&.Mui-checked:hover": {
                            "--Switch-trackBackground": "#166534", // Hover effect when checked
                          },
                        }
                      : {
                          "--Switch-trackRadius": "13px",
                          "--Switch-trackWidth": "40px",
                          "--Switch-trackHeight": "19px",
                          "--Switch-thumbSize": "10px",
                          "&.Mui-checked": {
                            "--Switch-trackBackground": "#4ade80",
                          },
                          "&.Mui-checked:hover": {
                            "--Switch-trackBackground": "#388E3C", // Hover effect when checked
                          },
                        }
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className={`${
                  theme
                    ? " border-purple-500 border-2 bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white"
                    : "bg-purple-500 text-white hover:bg-white hover:text-black "
                } 
                px-6 py-2  transition-all duration-500  rounded-lg hover:cursor-pointer`}
              >
                {loading ? <LoaderCircle className=" animate-spin" /> : <>Update</>}
              </button>
            </div>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default UpdateInventory;
