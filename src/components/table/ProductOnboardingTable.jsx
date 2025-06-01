import React, { useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useMode } from "../../contexts/themeModeContext";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import EditMetaData from "../modal/EditMetaData";
import DeleteMetaData from "../modal/DeleteMetaData";


function ProductOnboardingTable({ onboardingData,setOnboardingData }) {
  const { theme } = useMode();
  const[editModal,setEditModal] = useState(false)
  const[currentProduct,setCurrentProduct] = useState({})
  const[deleteProduct,setDeleteProduct] = useState(-1)
  const [deleteModal,setDeleteModal] = useState(false)

  const handleDelete = (id) => {
    setDeleteProduct(id)
    setDeleteModal(true)
  }
  const handleEdit = (data)=>{
    setCurrentProduct(data)
    setEditModal(true)
  }
  return (
    <div className={`mt-10 p-2 rounded-lg overflow-scroll sideBarNone  w-full ${theme ? "bg-white":"bg-zinc-800"}`}>
      <TableContainer className=" rounded-lg sideBarNone">
        <table className="min-w-[100vw]">
          <TableHead>
            <TableRow>
              <TableCell className="w-40  ">
                <div
                  className={`text-center ${
                    theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  }  font-semibold`}
                >
                  Image
                </div>
              </TableCell>
              <TableCell className="w-40  ">
                <div
                  className={`text-center ${
                    theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  }  font-semibold`}
                >
                  Product Name
                </div>
              </TableCell>
              <TableCell className="w-40  ">
                <div
                  className={`text-center ${
                    theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  }  font-semibold`}
                >
                  Code
                </div>
              </TableCell>
              <TableCell className="w-30  ">
                <div
                  className={`text-center ${
                    theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  }  font-semibold`}
                >
                  MRP
                </div>
              </TableCell>
              <TableCell className="w-40  ">
                <div
                  className={`text-center ${
                    theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  }  font-semibold`}
                >
                  Category
                </div>
              </TableCell>
              <TableCell className="w-40  ">
                <div
                  className={`text-center ${
                    theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  }  font-semibold`}
                >
                  Sub Category
                </div>
              </TableCell>
              <TableCell className="w-60  ">
                <div
                  className={`text-center ${
                    theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  }  font-semibold`}
                >
                  Product Description
                </div>
              </TableCell>
              <TableCell className="w-10">
                <div
                  className={`text-center ${
                    theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  }  font-semibold`}
                >
                  Actions
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {onboardingData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="text-center font-medium">{data.image}</div>
                </TableCell>
                <TableCell>
                  <div className={`text-center font-medium ${theme ? "text-black":"text-white"}`}>
                    {data.productName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`text-center font-semibold ${theme ? "text-black":"text-white"}`}>{data.code}</div>
                </TableCell>
                <TableCell>
                  <div className={`text-center font-medium ${theme ? "text-black":"text-white"}`}>{data.mrp}</div>
                </TableCell>
                <TableCell>
                  <div className={`text-center font-medium ${theme ? "text-black":"text-white"}`}>{data.category}</div>
                </TableCell>
                <TableCell>
                  <div className={`text-center font-medium ${theme ? "text-black":"text-white"}`}>
                    {data.subCategory}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`text-center font-medium ${theme ? "text-black":"text-white"}`}>
                    {data.productDescription}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`text-center font-medium ${theme ? "text-black":"text-white"}`}>
                    <button
                    className={`${theme?"text-green-600 hover:text-green-700":"text-green-400 hover:text-green-700"}`}
                    onClick ={()=>{
                      handleEdit(data)
                    }}
                    >
                      <Edit />
                    </button>
                    <button 
                    className={` hover:text-red-600 ${theme ? "text-red-500":"text-red-500"}`}
                    onClick={()=>{
                      handleDelete(data.id)
                    }}>
                      <Delete />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
      </TableContainer>
      <EditMetaData isOpen={editModal}
      onClose={()=>{
        setEditModal(false)
      }}
      currentProduct = {currentProduct}
      setOnboardingData = {setOnboardingData}
      />
      <DeleteMetaData
      isOpen={deleteModal}
      onClose={()=>{
        setDeleteModal(false)
      }}
      deleteProduct={deleteProduct}
      setOnboardingData = {setOnboardingData}
      />
    </div>
  );
}

export default ProductOnboardingTable;
