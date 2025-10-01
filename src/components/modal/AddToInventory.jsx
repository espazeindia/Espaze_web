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
import { notifyError, notifySuccess } from "../../utils/toast";
import { LoaderCircle } from "lucide-react";
import InventoryServices from "../../services/InventoryServices";
import { useNavigate } from "react-router-dom";

function AddToInventory({ isOpen, onClose, addedIds }) {
  const { theme } = useMode();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddToInventory = async () => {
    setLoading(true);
    try {
      const res = await InventoryServices.AddToInventory({ metadata_ids: addedIds });
      if (res.success === true) {
        notifySuccess(res.message);
        navigate("/inventory");
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
        <ModalClose style={{ zIndex: "10", color: "#000000", fontWeight: "bold" }} />
        <div className="p-4">
          <DialogTitle
            sx={{
              color: theme ? "#000000" : "#ffffff",
              fontSize: "1.4rem",
              mb: 2,
            }}
          >
            Add To Inventory
          </DialogTitle>

          <DialogContent sx={{ overflowX: "hidden" }}>
            <div className={`${theme ? "text-black" : "text-white"} mt-4 text-center`}>
              {addedIds.length > 1 ? (
                <>
                  Are you sure that you want to add all the {addedIds.length} selected products to
                  your inventory ?
                </>
              ) : (
                <>Are you sure that you want to add this product to your inventory ?</>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={onClose}
                className=" border border-red-500 text-red-500 px-6 py-1 rounded-lg transition-all hover:cursor-pointer duration-700 text-semibold hover:text-white hover:bg-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToInventory}
                className=" border border-green-500 text-green-500 px-6 py-1 rounded-lg transition-all duration-700 hover:cursor-pointer text-semibold hover:text-white hover:bg-green-500"
              >
                {loading ? <LoaderCircle className="animate-spin h-7" /> : <>Add</>}
              </button>
            </div>
          </DialogContent>
        </div>
      </ModalDialog>
    </Modal>
  );
}

export default AddToInventory;
