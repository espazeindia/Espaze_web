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
    price: 0,
    quantity: 0,
    manufacturingDate: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        price: data.price,
        quantity: data.quantity,
        manufacturingDate: data.m_date.split(" ")[0],
        expiryDate: data.e_date.split(" ")[0],
      });
      setVisible(data.visible);
    }
  }, [isOpen, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure price cannot be negative
    const updatedValue = name === "price" || "quantity" ? Math.max(0, value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        inventory_product_id: data.id,
        product_visibility: visible,
        product_price: formData.price,
        product_manufacturing_date: formData.manufacturingDate,
        product_expiry_date: formData.expiryDate,
        product_quantity: formData.quantity,
      };
      const res = await InventoryServices.UpdateInventory(body);
      if (res.success === true) {
        setReload((prevData) => !prevData);
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
