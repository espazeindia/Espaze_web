import { Checkbox, Switch } from "@mui/joy";
import { TableBody, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import ViewModalComponent from "../modal/ViewInventory";
import EditModalComponent from "../modal/UpdateInventory";
import DeleteModalComponent from "../modal/DeleteProductModal";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useMode } from "../../contexts/themeModeContext";

function InventoryTable({ products, setProducts, checkedIds, setCheckedIds }) {
  const {theme} = useMode();
  const [openViewProduct, setViewProduct] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [editProductDetails, setEditProductDetails] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteProductDetails, setDeleteProductDetails] = useState({});
  const handleProductView = (data) => {
    setProductDetails(data);
    setViewProduct(true);
  };
  const handleProductEdit = (data) => {
    setEditProductDetails(data);
    setOpenUpdateProduct(true);
  };
  const handleDelete = (data) => {
    setDeleteProductDetails(data);
    setOpenDeleteModal(true);
  };
  const handleViewEdit = () => {
    setViewProduct(false);
    setEditProductDetails(productDetails);
    setOpenUpdateProduct(true);
  };
  const handleCheckboxChange = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, status: product.status === "show" ? "hide" : "show" }
          : product
      )
    );
  };

  return (
    <>
      <TableBody className={theme?"bg-white":"bg-zinc-800"}>
        {products?.map((product, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <Checkbox
                type="checkbox"
                size="sm"
                className="relative top-[3px] left-2"
                onChange={() => {
                  handleCheckboxChange(product.id);
                }}
                checked={checkedIds?.includes(product.id)}
                sx={theme?{
                  "&.Mui-checked .MuiSvgIcon-root": {
                    backgroundColor: "#825dcf", // Ensures the icon background changes
                  },
                }:{
                  
                  "&.Mui-checked .MuiSvgIcon-root": {
                    backgroundColor: "#b898fa", 
                  },
                }}
              />
            </TableCell>

            <TableCell>
              <h2
                className={`text-sm text-center ${theme?" text-black":"text-white"} font-medium ${
                  product?.name.length > 30 ? "wrap-long-title" : ""
                }`}
              >
                {product?.name?.substring(0, 28)}
              </h2>
            </TableCell>

            <TableCell>
              <div className={`text-center ${theme?" text-black":"text-white"} text-sm`}>{product?.category_id?.name}</div>
            </TableCell>

            <TableCell>
              <div className={`text-center ${theme?" text-black":"text-white"} text-sm`}>{product?.subCategory_id?.name}</div>
            </TableCell>

            <TableCell>
              <div className={`text-center ${theme?" text-black":"text-white"} text-sm`}>₹ {product?.mrp}</div>
            </TableCell>

            <TableCell>
              <div className={`text-center ${theme?" text-black":"text-white"} text-sm font-semibold`}>{product?.code}</div>
            </TableCell>

            <TableCell>
              <div className={`text-center ${theme?" text-black":"text-white"} text-sm`}>
                {new Date(product?.expiryDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </TableCell>

            <TableCell>
              <div className={`text-center ${theme?" text-black":"text-white"} text-sm`}>{product?.quantity}</div>
            </TableCell>

            <TableCell>
              <div className={`text-center ${theme?" text-black":"text-white"} text-sm`}>
                {new Date(product?.manufacturingDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </TableCell>

            <TableCell>
              <div className={`text-center ${theme?" text-black":"text-white"} text-sm`}>₹ {product?.price}</div>
            </TableCell>

            <TableCell>
              {product.quantity > 0 ? (
                <div className={`border ${theme?" border-green-600 text-green-600": "border-green-400 text-green-400"} mx-auto text-xs  px-2 py-1 rounded-full w-fit`}>
                  In Stock
                </div>
              ) : (
                <div className={`border ${theme?" border-red-600 text-red-600": " border-red-500 text-red-500"} mx-auto text-xs  px-2 py-1 rounded-full w-fit`}>
                  Sold Out
                </div>
              )}
            </TableCell>

            <TableCell>
              <div className="flex justify-center items-center">
                <Switch
                  checked={product.status === "show"}
                  onChange={() => {
                    handleStatusChange(product.id);
                  }}
                  sx={theme? {
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
                  }:{
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
                  }}
                />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center  text-gray-500">
                <div
                  className={`hover:cursor-pointer ${theme?"text-green-600 hover:text-green-700":"text-green-400 hover:text-green-700"} `}
                  onClick={() => {
                    handleProductView(product);
                  }}
                >
                  <Visibility fontSize="small" />
                </div>
                <div
                  className={`inline ml-2 hover:cursor-pointer ${theme?"text-gray-600 hover:text-gray-700":"text-gray-500 hover:text-gray-600"} `}
                  onClick={() => {
                    handleProductEdit(product);
                  }}
                >
                  <Edit fontSize="small" />
                </div>
                <div
                  className="inline ml-2 text-red-500 hover:cursor-pointer hover:text-red-600"
                  onClick={() => {
                    handleDelete(product);
                  }}
                >
                  <Delete fontSize="small" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ViewModalComponent
        isOpen={openViewProduct}
        onClose={() => setViewProduct(false)}
        data={productDetails}
        handleEdit={handleViewEdit}
      />
      <EditModalComponent
        isOpen={openUpdateProduct}
        onClose={() => setOpenUpdateProduct(false)}
        data={editProductDetails}
        products={products}
        setProducts={setProducts}
      />
      <DeleteModalComponent
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        data={deleteProductDetails}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
}

export default InventoryTable;
