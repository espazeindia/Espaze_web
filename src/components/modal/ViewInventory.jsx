import React from "react";
import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from "@mui/joy";
import { useMode } from "../../contexts/themeModeContext";

function ViewInventoryModalComponent({ isOpen, onClose, data, handleEdit }) {
  const { theme } = useMode();
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog size="lg" sx={theme ? {backgroundColor : "#ffffff" , border : "none" } : { backgroundColor: "#18181b", border: "none" }}>
        <ModalClose style={{ zIndex: "10", color: "#ffffff", fontWeight: "bold" }} />
        <DialogTitle sx={ theme ? {color: "#0000000"}: { color: "#ffffff" }}>Product Details</DialogTitle>
        <DialogContent className="h-[20vh] w-[50vw] overflow-auto p-4">
          <div className="flex flex-col gap-4">
            <h2 className={`${theme ? "text-black":"text-white "}font-semibold text-3xl`}>{data?.name}</h2>

            <div className="flex flex-wrap gap-2 items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  data?.status === "show"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {data?.status === "show" ? "Visible" : "Hidden"}
              </span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                ₹ {data?.price}
              </span>
              {data?.quantity > 0 ? (
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  In Stock ({data?.quantity})
                </span>
              ) : (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  Sold Out
                </span>
              )}
            </div>

            <p className={`${theme ? "text-zinc-800":"text-zinc-300"} leading-relaxed`}>{data?.description}</p>

            <div className={`grid grid-cols-2 gap-4 mt-4 ${theme ? "text-zinc-700":"text-zinc-200"}`}>
              <p>
                <span className="font-semibold">Category :</span> {data?.category_id?.name}
              </p>
              <p>
                <span className="font-semibold">Sub-Category :</span> {data?.subCategory_id?.name}
              </p>
              <p>
                <span className="font-semibold">Expiry Date :</span>{" "}
                {new Date(data?.expiryDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="font-semibold">Manufacturing Date :</span>{" "}
                {new Date(data?.manufacturingDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="font-semibold">MRP :</span> ₹ {data?.mrp}
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleEdit}
                className={`px-6 py-2 
                transition-all duration-500 rounded-lg hover:cursor-pointer ${theme ? "text-green-600 border-green-600 border hover:bg-green-600 hover:text-white":"text-green-500 border-green-500 border hover:bg-green-500 hover:text-white"}`}
              >
                Edit
              </button>
            </div>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default ViewInventoryModalComponent;
