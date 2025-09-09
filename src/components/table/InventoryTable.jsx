import { Switch } from "@mui/joy";
import { useState } from "react";
import ViewModalComponent from "../modal/ViewInventory";
import EditModalComponent from "../modal/UpdateInventory";
import { useMode } from "../../contexts/themeModeContext";
import BottomPagination from "../pagination/BottomPagination";
import { Visibility, Edit } from "@mui/icons-material";
import InventoryServices from "../../services/InventoryServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // 👈 added for role check

function InventoryTable({
  products,
  setProducts,
  setPage,
  page,
  limit,
  setLimit,
  totalDetails,
  loading,
  setReload,
}) {
  const { theme } = useMode();
  const navigate = useNavigate();
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [editProductDetails, setEditProductDetails] = useState({});

  // 👇 get user role
  const userRole = Cookies.get("userRole") || "seller";

  const handleUpdateInventory = async (data) => {
    try {
      const body = {
        inventory_product_id: data.id,
        product_visibility: !data.visible,
        product_price: data.price,
        product_manufacturing_date: data.m_date,
        product_expiry_date: data.e_date,
      };
      const res = await InventoryServices.UpdateInventory(body);
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === data.id ? { ...p, visible: !p.visible } : p))
        );
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    }
  };

  const handleProductView = (id) => {
    navigate(`/product-details/inventory_${id}`);
  };

  const handleEdit = (data) => {
    setEditProductDetails(data);
    setOpenUpdateProduct(true);
  };

  const formatDate = (dateString) => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const [year, month, day] = dateString.split("-");
    return `${day} ${months[parseInt(month,10)-1]} ${year.slice(-2)}`;
  };

  return (
    <>
      {/* Horizontal & Vertical Scroll Wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          {/* Table Head */}
          <div className="grid grid-cols-[2fr_5fr_3fr_1fr_4fr_3fr_6fr_3fr_2fr_3fr_2fr_3fr_2fr_2fr] border-b py-4 text-sm border-gray-300 border-dotted">
            {[
              "Image","Product Name","Code","MRP","Category","SubCategory",
              "Description","Mfg Date","Qty","Expiry","Price","Status","Visible","Actions"
            ].map((h,i)=>(
              <div key={i} className={`text-center font-semibold ${theme?"text-[#4110a2]":"text-[#b898fa]"}`}>{h}</div>
            ))}
          </div>

          {/* Table Body with Vertical Scroll */}
          <div className="h-[50vh] overflow-y-scroll">
            {!loading ? (
              products.length > 0 ? (
                products.map((data,index)=>(
                  <div
                    key={index}
                    onClick={()=>handleProductView(data.id)}
                    className="grid grid-cols-[2fr_5fr_3fr_1fr_4fr_3fr_6fr_3fr_2fr_3fr_2fr_3fr_2fr_2fr] items-center text-sm border-b py-4 border-gray-300 border-dotted cursor-pointer"
                  >
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.image}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.productName}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.code}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.mrp}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.category_name}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.subcategory_name}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.productDescription}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{formatDate(data.m_date.split(" ")[0])}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.quantity}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{formatDate(data.e_date.split(" ")[0])}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>{data.price}</div>
                    <div className={`text-center font-medium ${theme?"text-zinc-800":"text-white"}`}>
                      {data.quantity>5 ? (
                        <div className={`border ${theme?"border-green-600 text-green-600":"border-green-400 text-green-400"} mx-auto text-xs px-2 py-1 rounded-full w-fit`}>In Stock</div>
                      ) : data.quantity>0 ? (
                        <div className="border border-yellow-500 text-yellow-500 mx-auto text-xs px-2 py-1 rounded-full w-fit">Few Left</div>
                      ) : (
                        <div className={`border ${theme?"border-red-600 text-red-600":"border-red-500 text-red-500"} mx-auto text-xs px-2 py-1 rounded-full w-fit`}>Sold Out</div>
                      )}
                    </div>
                    <div className="flex items-center justify-center" onClick={(e)=>e.stopPropagation()}>
                      <Switch
                        checked={data.visible}
                        onChange={(e)=>{e.stopPropagation(); handleUpdateInventory(data)}}
                        sx={{
                          "--Switch-trackRadius":"13px",
                          "--Switch-trackWidth":"40px",
                          "--Switch-trackHeight":"19px",
                          "--Switch-thumbSize":"10px",
                          "&.Mui-checked":{"--Switch-trackBackground":"#16a34a"},
                          "&.Mui-checked:hover":{"--Switch-trackBackground":"#166534"}
                        }}
                      />
                    </div>
                    <div
                      className={`text-center flex items-center justify-center gap-3 font-medium ${theme?"text-black":"text-white"}`}
                      onClick={(e)=>e.stopPropagation()}
                    >
                      {/* 👇 View icon always visible */}
                      <div
                        className="hover:cursor-pointer text-green-600 hover:text-green-700"
                        onClick={()=>handleProductView(data.id)}
                      >
                        <Visibility fontSize="small"/>
                      </div>

                      {/* 👇 Only show inline edit button if role is operations */}
                      {userRole === "operations" && (
                        <button
                          className="text-green-600 hover:text-green-700"
                          onClick={()=>handleEdit(data)}
                        >
                          <Edit fontSize="small"/>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-[48vh] flex justify-center items-center text-2xl font-semibold">
                  No Product In Your Inventory
                </div>
              )
            ) : (
              Array.from({length: limit}).map((_,i)=>(
                <div key={i} className="border-b h-14 border-gray-300 border-dotted w-full"></div>
              ))
            )}
          </div>

          <BottomPagination
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            totalDetails={totalDetails}
            loading={loading}
            textSize="base"
          />
        </div>
      </div>

      {/* Seller floating pencil 👇 */}
      {userRole === "seller" && (
        <button
          onClick={()=>handleEdit(products[0])}
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <Edit fontSize="small"/>
        </button>
      )}

      <EditModalComponent
        isOpen={openUpdateProduct}
        onClose={()=>setOpenUpdateProduct(false)}
        data={editProductDetails}
        setReload={setReload}
      />
    </>
  );
}

export default InventoryTable;
