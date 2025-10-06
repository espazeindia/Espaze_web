import React, { useEffect, useState, useMemo, useCallback } from "react";
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
import Cookies from "js-cookie";

const staticFields = [
  { name: "Product Name", key: "productName", multiline: false, span: "md:col-span-2" },
  { name: "Code", key: "code" },
  { name: "MRP", key: "mrp" },
  { name: "Category", key: "category_name" },
  { name: "Subcategory", key: "subcategory_name" },
  { name: "Product Description", key: "productDescription", multiline: true, span: "md:col-span-3" },
];

const dynamicFields = [
  { name: "price", label: "Price", type: "number", required: true, step: "0.01" },
  { name: "quantity", label: "Quantity", type: "number", required: true },
  { name: "manufacturingDate", label: "Manufacturing Date", type: "date", required: true },
  { name: "expiryDate", label: "Expiry Date", type: "date", required: false },
];

const renderStaticField = (label, value, multiline = false, className = "", inputSx) => (
  <FormControl className={`space-y-2 ${className}`}>
    <label className="font-semibold text-sm text-[#4110a2]">{label}</label>
    <Input
      value={value || ""}
      disabled
      multiline={multiline}
      minRows={multiline ? 3 : undefined}
      sx={{
        ...inputSx,
        ...(multiline && { "& textarea": { minHeight: "90px" } }),
      }}
    />
  </FormControl>
);

function UpdateInventory({ isOpen, onClose, data, setReload }) {
  const { theme } = useMode();
  const [uiState, setUiState] = useState({ loading: false, visible: false });
  const [formData, setFormData] = useState({
    price: 0,
    quantity: 0,
    manufacturingDate: "",
    expiryDate: "",
  });

  const inputSx = useMemo(() => ({
    "--Input-radius": "6px",
    "--Input-gap": "0px",
    "--Input-paddingInline": "12px",
    "--Input-paddingBlock": "10px",
    "--Input-focusedThickness": "0px",
    "--Input-focusedHighlight": "transparent",
    border: `2px solid ${theme ? "#e5e7eb" : "#3f3f46"}`,
    borderRadius: "6px",
    backgroundColor: theme ? "#ffffff" : "#27272a",
    color: theme ? "#111827" : "#f4f4f5",
    boxShadow: "none",
    transition: "border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease",
    "&:focus-within": {
      borderColor: "#4110a2",
      boxShadow: "0 0 0 2px rgba(65, 16, 162, 0.15)",
      outline: "none",
    },
    "& input, & textarea": {
      backgroundColor: "transparent",
      color: "inherit",
    },
    "& input:focus, & textarea:focus": {
      outline: "none",
    },
    "&.Mui-disabled, &[data-disabled='true']": {
      backgroundColor: theme ? "#f9fafb" : "#3f3f46",
      color: theme ? "#6b7280" : "#a1a1aa",
      borderColor: theme ? "#e5e7eb" : "#52525b",
    },
  }), [theme]);

  const dialogSx = useMemo(() => ({
    width: "95%",
    maxWidth: "1000px",
    maxHeight: "95vh",
    borderRadius: "12px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backgroundColor: theme ? "#ffffff" : "#18181b",
    border: "none",
  }), [theme]);

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        price: data.price || 0,
        quantity: data.quantity || 0,
        manufacturingDate: data.m_date?.split(" ")[0] || "",
        expiryDate: data.e_date?.split(" ")[0] || "",
      });
      setUiState((prev) => ({ ...prev, visible: data.visible || false }));
    }
  }, [isOpen, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormData((prev) => ({ ...prev, [name]: 0 }));
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setUiState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await InventoryServices.UpdateInventory({
        inventory_product_id: data.id,
        product_visibility: uiState.visible,
        product_price: parseFloat(formData.price) || 0,
        product_manufacturing_date: formData.manufacturingDate,
        product_expiry_date: formData.expiryDate,
        product_quantity: parseInt(formData.quantity, 10) || 0,
      });
      if (res.success) {
        setReload((prev) => !prev);
        notifySuccess(res.message);
        onClose();
      }
    } catch (err) {
      if (err === "cookie error") {
        Cookies.remove("EspazeCookie");
        notifyError("Cookie error, please relogin and try again");
      } else {
        notifyError(err?.response?.data?.message || err.message);
      }
    } finally {
      setUiState((prev) => ({ ...prev, loading: false }));
    }
  }, [data, uiState.visible, formData, setReload, onClose]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog layout="center" className="p-0 overflow-hidden" sx={dialogSx}>
        <ModalClose className="absolute z-10 top-3 right-3 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700" />
        <div className={`p-4 border-b text-center ${theme ? "border-zinc-200" : "border-zinc-700"}`}>
          <DialogTitle className={`text-xl font-semibold ${theme ? "text-black" : "text-white"}`}>
            Update Inventory
          </DialogTitle>
        </div>

        <DialogContent className="p-5 overflow-y-auto">
          <form id="updateForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {staticFields.map((field) =>
              renderStaticField(field.name, data?.[field.key], field.multiline, field.span, inputSx)
            )}

            {dynamicFields.map((field) => (
              <FormControl key={field.name} className="space-y-2">
                <label className="font-semibold text-sm text-[#4110a2]">{field.label}</label>
                <Input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onBlur={["price", "quantity"].includes(field.name) ? handleBlur : undefined}
                  type={field.type}
                  required={field.required}
                  slotProps={field.step ? { input: { step: field.step } } : {}}
                  sx={inputSx}
                />
              </FormControl>
            ))}

            <FormControl className="space-y-2">
              <label className="font-semibold text-sm text-[#4110a2]">Visibility</label>
              <div className="flex items-center gap-3 pt-2">
                <Switch
                  checked={uiState.visible}
                  onChange={(e) => setUiState((prev) => ({ ...prev, visible: e.target.checked }))}
                  sx={{
                    "--Switch-trackBackground": theme ? "#d1d5db" : "#4b5563",
                    "--Switch-trackHeight": "24px",
                    "--Switch-trackWidth": "48px",
                    "--Switch-thumbSize": "20px",
                    "&.Mui-checked": {
                      "--Switch-trackBackground": "#22c55e",
                    },
                  }}
                />
                <span className={`text-sm font-medium ${theme ? "text-zinc-600" : "text-zinc-400"}`}>
                  {uiState.visible ? "Visible" : "Hidden"}
                </span>
              </div>
            </FormControl>
          </form>
        </DialogContent>

        <div className={`p-4 border-t flex justify-center ${theme ? "border-zinc-200" : "border-zinc-700"}`}>
          <button
            type="submit"
            form="updateForm"
            disabled={uiState.loading}
            className="flex justify-center items-center bg-[#22c55e] text-white font-bold py-3 px-8 rounded-lg transition-transform hover:bg-[#16a34a] hover:-translate-y-0.5 focus:outline-none disabled:bg-zinc-400 disabled:transform-none"
          >
            {uiState.loading ? <LoaderCircle className="animate-spin" /> : "Update"}
          </button>
        </div>

      </ModalDialog>
    </Modal>
  );
}

export default UpdateInventory;