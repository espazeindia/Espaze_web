import { useMode } from "../../contexts/themeModeContext";
import InventoryServices from "../../services/InventoryServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import BottomPagination from "../pagination/BottomPagination";
import { Check } from "lucide-react";

function ProductRequestTable({
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

  const formatDate = (dateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [year, month, day] = dateString.split("-");
    const monthName = months[parseInt(month, 10) - 1];
    const shortYear = year;

    return `${day} ${monthName} ${shortYear}`;
  };

  const handleAcceptProduct = async (id) => {
    try {
      const result = await InventoryServices.AcceptProduct(id);
      if (result.success) {
        setReload((prevData) => !prevData);
        notifySuccess(result.message);
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <div className="w-[130vw]">
        <div className="grid grid-cols-[2fr_5fr_4fr_4fr_3fr_2fr_4fr_4fr_6fr_4fr_2fr_3fr_2fr_2fr] border-b py-4 text-sm border-gray-300 border-dotted">
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Image
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Product Name
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Seller Name
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Store Name
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Code
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            MRP
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Category
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            SubCategory
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Product Description
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Manufacturing Date
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Quantity
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Expiry Date
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Prices
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Actions
          </div>
        </div>
        <div className=" h-[50vh] overflow-scroll sideBarNone">
          {!loading ? (
            products.length > 0 ? (
              products.map((data, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleProductView(data.id);
                  }}
                  className=" grid grid-cols-[2fr_5fr_4fr_4fr_3fr_2fr_4fr_4fr_6fr_4fr_2fr_3fr_2fr_2fr] items-center  text-sm border-b py-4 border-gray-300 border-dotted"
                >
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.image}
                  </div>
                  <div
                    className={`text-center font-medium capitalize ${
                      theme ? "text-zinc-800" : "text-white"
                    }`}
                  >
                    {data.productName}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.sellerName}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.storeName}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.code}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.mrp}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.category_name}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.subcategory_name}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.productDescription}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {formatDate(data.m_date.split(" ")[0])}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.quantity}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {formatDate(data.e_date.split(" ")[0])}
                  </div>

                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.price}
                  </div>

                  <div
                    className={`text-center flex items-center justify-center gap-3 font-medium 
                    ${theme ? "text-black" : "text-white"}`}
                  >
                    <button
                      className={` cursor-pointer ${
                        theme
                          ? "text-green-600 hover:text-green-700"
                          : "text-green-400 hover:text-green-700"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAcceptProduct(data.id);
                      }}
                    >
                      <Check fontSize="large" />
                    </button>{" "}
                  </div>
                </div>
              ))
            ) : (
              <div className=" w-full h-[48vh] flex justify-center items-center text-2xl font-semibold">
                {" "}
                No Product For Request
              </div>
            )
          ) : (
            Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="border-b h-14 border-gray-300 border-dotted w-full"></div>
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
    </>
  );
}

export default ProductRequestTable;
