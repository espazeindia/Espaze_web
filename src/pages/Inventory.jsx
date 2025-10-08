import { useEffect, useRef, useState } from "react";
import { Tune, Add } from "@mui/icons-material";
import InventoryTable from "../components/table/InventoryTable";
import { useMode } from "../contexts/themeModeContext";
import { useNavigate } from "react-router-dom";
import { handleChangeDebounce } from "../utils/useDebounce";
import InventoryServices from "../services/InventoryServices";
import { notifyError, notifySuccess } from "../utils/toast";
import { LoaderCircle } from "lucide-react";
import * as XLSX from "xlsx";

function Inventory() {
  const { theme } = useMode();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [totalDetails, setTotalDetails] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);
  const fileInputRef = useRef(null);

  const debounce = handleChangeDebounce(searchText);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        setLoading(true);
        const result = await InventoryServices.GetAllInventory(limit, page, debounce, sortOrder);
        if (result.success === true) {
          const { total_pages, inventory_products, total } = result.data;
          let transformedInventory = [];
          if (inventory_products && inventory_products.length > 0) {
            transformedInventory = inventory_products.map((data) => {
              return {
                inventory_id: data.inventory_id,
                id: data.inventory_product_id,
                productName: data.metadata_name,
                productDescription: data.metadata_description,
                category: data.metadata_category_id,
                subCategory: data.metadata_subcategory_id,
                code: data.metadata_hsn_code,
                mrp: data.metadata_mrp,
                image: data.metadata_image,
                metadata_id: data.metadata_product_id,
                category_name: data.metadata_category_name,
                subcategory_name: data.metadata_subcategory_name,
                m_date: data.product_manufacturing_date,
                e_date: data.product_expiry_date,
                price: data.product_price,
                quantity: data.product_quantity,
                visible: data.product_visibility,
              };
            });
          }

          setTotalDetails({ total: total, total_pages: total_pages });
          setProducts(transformedInventory);
        }

        setLoading(false);
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);

        setLoading(false);
      }
    };
    getMetadata();
  }, [debounce, page, limit, reload, sortOrder]);

  const handleExcelImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const formatDate = (dateValue) => {
    const dateObj = new Date(dateValue);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const AddInventoryFunction = async (transformData) => {
    try {
      const result = await InventoryServices.AddInventoryByExcel(transformData);
      if (result.success) {
        setReload((prevData) => !prevData);
      }
    } catch (err) {
      notifyError(err || err?.message);
    }
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      setExcelLoading(true);
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array", cellDates: true, raw: false });

      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];
      const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });

      const { Serial_Number, id, name, description, category_name, subcategory_name, mrp } =
        jsonRows[0];

      if (
        !Serial_Number ||
        !id ||
        !name ||
        !description ||
        !category_name ||
        !subcategory_name ||
        !mrp
      ) {
        notifyError("Invalid File Content!. Make sure you are uploading correct file");
        excelLoading(false);
        return;
      }

      const now = new Date();

      let expiredProduct = 0;

      console.log(jsonRows);

      const transformedData = jsonRows
        .map((data) => {
          const { id, Quantity, Price, Manufacturing_Date, Expiry_Date } = data;
          if (!id || !Price || !Quantity || !Manufacturing_Date || !Expiry_Date) {
            return null;
          }
          return {
            metadata_product_id: id,
            product_quantity: parseInt(Quantity) ? parseInt(Quantity) : 0,
            product_price: parseFloat(Price) ? parseFloat(Price) : 0.0,
            product_manufacturing_date: formatDate(Manufacturing_Date),
            product_expiry_date: formatDate(Expiry_Date),
          };
        })
        .filter((filterData) => {
          if (filterData == null) {
            return false;
          }
          if (filterData.product_price === 0 || filterData.product_quantity === 0) {
            return false;
          }
          const expiryDate = new Date(filterData.product_expiry_date);
          if (expiryDate < now) {
            expiredProduct++;
            return false;
          }
          return true;
        });
      console.log(transformedData);
      if (transformedData.length > 0) {
        notifySuccess(
          `Imported ${transformedData.length} valid rows from total ${jsonRows.length}  ${
            jsonRows.length > 1 ? "rows" : "row"
          }  from Excel. Please wait till we process it `
        );
      } else {
        notifyError(`Not even one row has correct or complete data`);
        setExcelLoading(false);
        return;
      }
      if (expiredProduct > 0)
        notifyError(
          `${expiredProduct} ${
            expiredProduct > 1 ? "products are" : "product is "
          } already expired, can't add it `
        );

      await AddInventoryFunction(transformedData);
    } catch (err) {
      notifyError(`Invalid File :-  ${err}`);
    }
    setExcelLoading(false);
  };

  return (
    <div
      className={`${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      } w-full overflow-scroll sideBarNone min-h-full  p-5`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <div className="flex justify-end gap-4 ">
          <button
            onClick={() => {
              navigate("/products");
            }}
            className={` ${
              theme
                ? "border-green-600 text-green-600 shadow-green-600"
                : " border-green-500 text-green-500 shadow-green-500"
            } border w-26  
              transition-all duration-700 flex  justify-center items-center py-1 font-semibold rounded-lg 
              hover:cursor-pointer hover:shadow-sm`}
          >
            <Add fontSize="sm" />
            Add
          </button>
          <button
            className=" border px-4 py-1 rounded-lg cursor-pointer shadow-neutral-800 hover:shadow-sm"
            onClick={handleExcelImport}
          >
            {excelLoading ? (
              <LoaderCircle className=" animate-spin mx-7" />
            ) : (
              <span>Import Excel</span>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
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
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
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
      </div>
      <div className={`${theme ? " bg-white" : " bg-zinc-800"} shadow-md  p-4 rounded-lg mt-5 `}>
        <div className="overflow-scroll sideBarNone rounded-lg">
          <InventoryTable
            products={products}
            setProducts={setProducts}
            setPage={setPage}
            page={page}
            limit={limit}
            setLimit={setLimit}
            totalDetails={totalDetails}
            loading={loading}
            setReload={setReload}
          />
        </div>
      </div>
    </div>
  );
}

export default Inventory;
