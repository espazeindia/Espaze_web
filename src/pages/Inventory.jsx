import React, { useEffect, useState } from "react";
import { Tune, FileDownload, FileUpload, DeleteOutline, Add } from "@mui/icons-material";
import { Checkbox, Table } from "@mui/joy";
import { TableCell, TableHead, TableRow, TableContainer, TablePagination } from "@mui/material";
import InventoryTable from "../components/table/InventoryTable";
import { useMode } from "../contexts/themeModeContext";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const { theme } = useMode();
  const navigate = useNavigate();
  const productsData = [
    {
      id: 1,
      name: "Apple",
      description: "Fresh and juicy apples sourced from organic farms.",
      category_id: { name: "fruits-vegetables" },
      subCategory_id: { name: "Fruits" },
      mrp : 70,
      code: "APL123",
      expiryDate: "2025-06-20",
      manufacturingDate: "2024-03-01",
      quantity: 10,
      price: 150,
      status: "show",
    },
    {
      id: 2,
      name: "Men's T-Shirt",
      description: "Comfortable cotton t-shirt available in multiple sizes and colors.",
      category_id: { name: "clothes" },
      subCategory_id: { name: "Men" },
      mrp : 890,
      code: "TSHIRT001",
      expiryDate: "2026-12-31",
      manufacturingDate: "2024-02-10",
      quantity: 20,
      price: 999,
      status: "show",
    },
    {
      id: 3,
      name: "Samsung Galaxy S23 Ultra",
      description: "High-end smartphone with an advanced camera and powerful performance.",
      category_id: { name: "electronics" },
      subCategory_id: { name: "Mobiles" },
      mrp : 24550,
      code: "S23ULTRA",
      expiryDate: "2026-10-15",
      manufacturingDate: "2024-02-01",
      quantity: 0,
      price: 124999,
      status: "hide",
    },
    {
      id: 4,
      name: "Wooden Dining Table",
      description: "Elegant and durable dining table made from premium wood.",
      category_id: { name: "home-appliances" },
      subCategory_id: { name: "Furniture" },
      mrp : 10985,
      code: "TABLE001",
      expiryDate: "2028-06-15",
      manufacturingDate: "2024-04-12",
      quantity: 5,
      price: 24999,
      status: "show",
    },
    {
      id: 5,
      name: "Herbal Shampoo",
      description: "Natural and chemical-free shampoo for strong and healthy hair.",
      category_id: { name: "beauty-personal-care" },
      subCategory_id: { name: "Haircare" },
      mrp : 370,
      code: "SHMP001",
      expiryDate: "2027-09-20",
      manufacturingDate: "2024-01-25",
      quantity: 30,
      price: 499,
      status: "show",
    },
    {
      id: 6,
      name: "Chess Set",
      description: "Classic wooden chess set for both beginners and professionals.",
      category_id: { name: "toys-games" },
      subCategory_id: { name: "Board Games" },
      mrp : 1170,
      code: "CHESS001",
      expiryDate: "2026-03-10",
      manufacturingDate: "2024-05-20",
      quantity: 12,
      price: 1299,
      status: "show",
    },
    {
      id: 7,
      name: "Bestseller Novel",
      description: "A must-read fiction novel by a renowned author.",
      category_id: { name: "books-stationery" },
      subCategory_id: { name: "Fiction" },
      mrp : 470,
      code: "BOOK001",
      expiryDate: "2030-12-31",
      manufacturingDate: "2024-07-01",
      quantity: 50,
      price: 599,
      status: "show",
    },
    {
      id: 8,
      name: "Organic Almonds",
      description: "Nutrient-rich, high-quality organic almonds for a healthy diet.",
      category_id: { name: "grocery" },
      subCategory_id: { name: "Snacks" },
      mrp : 690,
      code: "ALMND001",
      expiryDate: "2025-11-30",
      manufacturingDate: "2024-08-15",
      quantity: 25,
      price: 799,
      status: "show",
    },
  ];
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [searchText, setSearchText] = useState("");
  const [checkedIds, setCheckedIds] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    let filter = products.filter((product) =>
      [product.name, product.code, product.category_id.name, product.subCategory_id.name].some(
        (field) => field.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (sortOrder) {
      filter.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    }

    setFilteredProducts(filter);
  }, [products, searchText, sortOrder]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    let filter = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(value) ||
        product.code.toLowerCase().includes(value) ||
        product.category_id.name.toLowerCase().includes(value) ||
        product.subCategory_id.name.toLowerCase().includes(value)
      );
    });

    if (sortOrder) {
      filter = [...filter].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    setFilteredProducts(filter);
  };

  const handleChecked = (e) => {
    setCheckedIds(
      e.target.checked
        ? filteredProducts.map((product) => product.id)
        : checkedIds.filter((id) => !filteredProducts.some((product) => product.id === id))
    );
  };

  useEffect(() => {
    const allChecked = filteredProducts.every((product) => checkedIds.includes(product.id));
    setCheckboxChecked(allChecked);
  }, [checkedIds, filteredProducts]);

  const handleMultipleDelete = () => {
    setProducts((prevData) => prevData.filter((products) => !checkedIds.includes(products.id)));
  };

  return (
    <div
      className={`${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      } w-full overflow-scroll sideBarNone min-h-full  p-5`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Inventory
        </h1>
        <div className="flex">
          <button
            className={`${
              theme
                ? "border-[#4a2594] shadow-[#4a2594] text-[#4a2594]"
                : "border-[#b898fa] shadow-[#b898fa] text-[#b898fa]"
            }  border-1 transition-all duration-500 flex items-center px-6 py-2 font-semibold rounded-s-lg hover:cursor-pointer  hover:shadow-sm`}
          >
            <FileDownload /> Import
          </button>
          <button
            className={`border-y-1 border-r-1 ${
              theme
                ? "border-zinc-700 text-zinc-700 shadow-zinc-700"
                : "border-zinc-400 text-zinc-400 shadow-zinc-400"
            }  transition-all 
          duration-500 flex items-center px-6 py-2 font-semibold rounded-e-lg hover:cursor-pointer  hover:shadow-sm `}
          >
            <FileUpload />
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5 mt-5">
        <div className="flex items-center">
          <input
            type="text"
            className={` px-4 py-2 rounded-lg w-[78vw] ${
              theme
                ? "bg-white text-zinc-700 shadow-zinc-300"
                : "bg-zinc-800 text-zinc-200 shadow-zinc-700"
            }
                transition-shadow duration-500 focus:outline-0 placeholder:text-base focus:shadow-sm
                 hover:shadow-sm`}
            placeholder="Search Inventory"
            onChange={handleSearchChange}
          />
          <div
            className={`border-1 relative group  flex items-center px-4 transition-all ${
              theme
                ? " text-zinc-700 border-zinc-700 shadow-zinc-700"
                : " text-zinc-400 border-zinc-400 shadow-zinc-400"
            } 
            duration-500 rounded-lg ml-5 py-[6px] hover:cursor-pointer hover:shadow-xs`}
          >
            <Tune className="mr-2" /> Filters
            <div
              className={` absolute hidden group-hover:block top-[100%] right-0 ${
                theme ? "text-zinc-700 p-3 bg-white" : "bg-zinc-700 p-3 text-white"
              }  rounded-md w-[200%]`}
            >
              <div className=" pb-1 border-b-[1px] border-neutral-300">Filters</div>
              <button
                className={`my-1 ${
                  theme ? "hover:bg-neutral-300" : "hover:bg-neutral-800"
                } py-1 w-full cursor-pointer rounded-md`}
                onClick={() => setSortOrder("asc")}
              >
                Prices Low To High
              </button>
              <button
                className={`my-1 ${
                  theme ? "hover:bg-neutral-300" : "hover:bg-neutral-800"
                } py-1 w-full cursor-pointer rounded-md`}
                onClick={() => setSortOrder("desc")}
              >
                Prices High To Low
              </button>
              <button
                className="my-1 hover:bg-red-700 cursor-pointer bg-red-500 text-white font-semibold py-1 w-full rounded-md"
                onClick={() => setSortOrder(null)}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-start ">
          <button
            className={` border-1 group relative flex items-center justify-center w-26 py-1 
            transition-all duration-500  shadow-red-500 font-semibold rounded-s-lg  ${
              checkedIds.length < 1
                ? theme
                  ? "text-zinc-700 border-zinc-700 hover:cursor-not-allowed"
                  : "text-zinc-400 border-zinc-400 hover:cursor-not-allowed"
                : theme
                ? " hover:cursor-pointer text-red-600 border-red-600 hover:shadow-sm"
                : " hover:cursor-pointer text-red-500 border-red-500 hover:shadow-sm"
            }`}
            disabled={checkedIds.length < 1}
            onClick={handleMultipleDelete}
          >
            <DeleteOutline />
            Delete
            <div
              className={`absolute hidden ${
                checkedIds.length < 1 ? "group-hover:block" : ""
              } top-[100%] text-[10px] ${
                theme ? "text-zinc-600 bg-white " : "bg-zinc-600 text-white"
              } p-2 rounded-md `}
            >
              {" "}
              Only works on selecting atleast one product
            </div>
          </button>
          <button
            onClick={() => {
              navigate("/products")
            }}
            className={` ${
              theme
                ? "border-green-600 text-green-600 shadow-green-600"
                : " border-green-500 text-green-500 shadow-green-500"
            } border-y-1 border-r-1 w-26  
              transition-all duration-700 flex  justify-center items-center py-1 font-semibold rounded-e-lg 
              hover:cursor-pointer hover:shadow-sm`}
          >
            <Add />
            Add
          </button>
        </div>
      </div>
      <div className={`${theme ? " bg-white" : " bg-zinc-800"} shadow-md  p-4 rounded-lg mt-5 `}>
        <div className="overflow-scroll sideBarNone rounded-lg">
          <TableContainer className=" rounded-lg sideBarNone">
            <table className={`min-w-[120vw]  `}>
              <TableHead>
                <TableRow>
                  <TableCell className="w-10  ">
                    <Checkbox
                      type="checkbox"
                      size="sm"
                      className="relative top-[3px] left-2"
                      sx={
                        theme
                          ? {
                              "&.Mui-checked .MuiSvgIcon-root": {
                                backgroundColor: "#825dcf", // Ensures the icon background changes
                              },
                            }
                          : {
                              "&.Mui-checked .MuiSvgIcon-root": {
                                backgroundColor: "#b898fa", // Ensures the icon background changes
                              },
                            }
                      }
                      onChange={handleChecked}
                      checked={checkboxChecked}
                    />
                  </TableCell>
                  <TableCell className="w-60  ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Product Name
                    </div>
                  </TableCell>
                  <TableCell className="w-60  ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Category
                    </div>
                  </TableCell>
                  <TableCell className="w-60  ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Sub Category
                    </div>
                  </TableCell>
                  <TableCell className="w-40  ">
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
                      Product Code
                    </div>
                  </TableCell>
                  <TableCell className="w-40  ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Expiry Date
                    </div>
                  </TableCell>
                  <TableCell className="w-40  ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Quantity
                    </div>
                  </TableCell>
                  <TableCell className="w-60 ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Manufacturing Date
                    </div>
                  </TableCell>
                  <TableCell className="w-40  ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Price
                    </div>
                  </TableCell>
                  <TableCell className="w-30  ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Status
                    </div>
                  </TableCell>
                  <TableCell className="w-30  ">
                    <div
                      className={`text-center ${
                        theme ? "text-[#4110a2]" : "text-[#b898fa]"
                      }  font-semibold`}
                    >
                      Published
                    </div>
                  </TableCell>
                  <TableCell className=" w-30  ">
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
              <InventoryTable
                products={filteredProducts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )}
                setProducts={setProducts}
                checkedIds={checkedIds}
                setCheckedIds={setCheckedIds}
              />
            </table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={
              theme
                ? {
                    color: "black",
                    "& .MuiSvgIcon-root": {
                      color: "black",
                    },
                  }
                : {
                    color: "white",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }
            }
          />
        </div>
      </div>
      
    </div>
  );
}

export default Inventory;
