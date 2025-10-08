import { useEffect, useState } from "react";
import InventoryRequestTable from "../components/table/ProductRequestTable"
import { useMode } from "../contexts/themeModeContext";
import { useNavigate } from "react-router-dom";
import { handleChangeDebounce } from "../utils/useDebounce";
import InventoryServices from "../services/InventoryServices";
import { notifyError} from "../utils/toast";

function InventoryRequest() {
  const { theme } = useMode();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalDetails, setTotalDetails] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const debounce = handleChangeDebounce(searchText);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        setLoading(true);
        const result = await InventoryServices.GetAllInventoryRequests(limit, page, debounce);
        if (result.success === true) {
          const { total_pages, inventory_products, total } = result.data;
          let transformedInventory = [];
          if (inventory_products && inventory_products.length > 0) {
            transformedInventory = inventory_products.map((data) => {
              return {
                inventory_id: data.inventory_id,
                id: data._id,
                productName: data.metadata_name,
                productDescription: data.metadata_description,
                code: data.hsn_code,
                mrp: data.metadata_mrp,
                image: data.metadata_image,
                category_name: data.category_name,
                subcategory_name: data.subcategory_name,
                m_date: data.manufacturing_date.split("T")[0],
                e_date: data.expiry_date.split("T")[0],
                price: data.price,
                quantity: data.quantity,
                visible: data.visibility,
                sellerName:data.seller_name,
                storeName:data.store_name
              };
            });
          }
          setTotalDetails({ total: total, total_pages: total_pages });
          setProducts(transformedInventory);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        notifyError(err?.response?.data?.error || err?.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    getMetadata();
  }, [debounce, page, limit, reload]);

  return (
    <div
      className={`${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      } w-full overflow-scroll sideBarNone min-h-full  p-5`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Request</h1>
      </div>

      <div className="flex flex-col justify-center gap-5 mt-5">
        <div className="flex items-center">
          <input
            type="text"
            className={` px-4 py-2 rounded-lg w-full ${
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
        </div>
      </div>
      <div className={`${theme ? " bg-white" : " bg-zinc-800"} shadow-md  p-4 rounded-lg mt-5 `}>
        <div className="overflow-scroll sideBarNone rounded-lg">
          <InventoryRequestTable
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

export default InventoryRequest;
