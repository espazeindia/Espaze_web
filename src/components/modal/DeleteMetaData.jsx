import React,{useState} from "react";
import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from "@mui/joy";
import { DeleteOutline } from "@mui/icons-material";
import { useMode } from "../../contexts/themeModeContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import MetaDataServices from "../../services/MetaDataServices";
import { LoaderCircle } from "lucide-react";

function DeleteProductModal({ isOpen, onClose, deleteProduct, setOnboardingData, setReload }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await MetaDataServices.DeleteMetadata(deleteProduct);
      if (res.success === true) {
        setOnboardingData((prevData) => prevData.filter((item) => item.id !== deleteProduct));
        notifySuccess(res.message);
        setReload((prevData) => !prevData);
      }
    } catch (err) {
      if (err === "cookie error") {
        notifyError("Cookie error, please relogin and try again");
      } else {
        notifyError(err?.response?.data?.message || err.message);
      }
    }
    setLoading(false)
    onClose();
  };

  const { theme } = useMode();
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
        <ModalClose
          style={
            theme
              ? { zIndex: "10", color: "#00000", fontWeight: "bold" }
              : { zIndex: "10", color: "#ffffff", fontWeight: "bold" }
          }
        />
        <DialogTitle sx={theme ? { color: "#000000" } : { color: "#ffffff" }}>
          Delete Product
        </DialogTitle>
        <DialogContent className=" w-[40vw] overflow-scroll sideBarNone">
          <div className="text-red-500 mt-3 flex justify-center items-center">
            <DeleteOutline fontSize="large" />
            <div className="text-3xl font-semibold"> Caution</div>
          </div>

          <div className={`${theme ? "text-black" : "text-white"} mt-4 text-center`}>
            Are you sure you want to delete ?
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className=" border border-green-500 text-green-500 px-6 py-1 rounded-lg transition-all duration-700 hover:cursor-pointer text-semibold hover:text-white hover:bg-green-500"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className=" border border-red-500 text-red-500 px-6 py-1 rounded-lg transition-all hover:cursor-pointer duration-700 text-semibold hover:text-white hover:bg-red-500"
            >
              {loading ? <LoaderCircle className="animate-spin h-7" /> : <>Delete</>}
            </button>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default DeleteProductModal;
