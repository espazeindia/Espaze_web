import { useCallback, useEffect, useState } from "react";
import { useMode } from "../contexts/themeModeContext";
import AddMetaData from "../components/modal/AddMetaData";
import ProductOnboardingTable from "../components/table/ProductOnboardingTable";
import { notifyError } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import MetaDataServices from "../services/MetaDataServices";

function ProductOnboarding() {
  const router = useNavigate();
  const { theme } = useMode();

  const [page, setPage] = useState(0);
  const [totalDetails, setTotalDetails] = useState({});
  const [limit, setLimit] = useState(10);
  const [openAddMetaData, setOpenAddMetaData] = useState(false);
  const [onboardingData, setOnboardingData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const handleOpenAddMetaDataModal = () => {
    setOpenAddMetaData(true);
  };

  useEffect(() => {
    const getMetadata = async () => {
      try {
        setLoading(true);
        console.log(limit, page, search);
        const result = await MetaDataServices.FetchMetadata(limit, page, search);
        if (result.success === true) {
          const { total_pages, metadata, total } = result.data;
          let transformedMetadata = [];
          if (metadata && metadata.length > 0) {
            transformedMetadata = metadata.map((data) => {
              return {
                productName: data.name,
                productDescription: data.description,
                category: data.category_id,
                subCategory: data.subcategory_id,
                code: data.hsn_code,
                mrp: data.mrp,
                image: data.image,
                id: data.id,
                category_name:data.category_name,
                subcategory_name:data.subcategory_name
              };
            });
          }
          console.log(transformedMetadata)

          setTotalDetails({ total: total, total_pages: total_pages });
          setOnboardingData(transformedMetadata);
        }

        setLoading(false);
      } catch (err) {
        if (err === "cookie error") {
          Cookies.remove("EspazeCookie");
          router("/login");
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err?.response?.data?.message || err.message);
        }
        setLoading(false);
      }
    };
    getMetadata();
  }, [search, page, limit, reload]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  const handleChangeDebounce = useCallback((searchData) => {
    setSearchInput(searchData);
  }, []);

  return (
    <div
      className={`p-5 min-h-full ${theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"}`}
    >
      <div className=" font-bold text-2xl">Product Onboarding</div>
      <div className="flex justify-between mt-5">
        <input
          onChange={(e) => {
            handleChangeDebounce(e.target.value);
          }}
          className={`w-[70vw] p-1 px-4  rounded-md  focus:outline-0
          ${
            theme
              ? "bg-white text-zinc-700 shadow-zinc-300"
              : "bg-zinc-800 text-zinc-200 shadow-zinc-700"
          }`}
          placeholder="Search By MetaData Name"
        />
        <div className="flex gap-2">
          <div
            className={`p-1 px-6 rounded-md font-medium
          ${
            theme ? "text-zinc-700 border-1 border-zinc-700" : "border-zinc-200 border-1 text-white"
          }`}
          >
            Filters
          </div>
          <button
            onClick={handleOpenAddMetaDataModal}
            className={`p-1 px-7 rounded-md font-medium cursor-pointer  hover:bg-green-600 hover:text-white 
           ${
             theme
               ? "text-green-600 border-1 border-green-600"
               : "text-green-500 border-1 border-green-500"
           }`}
          >
            Add
          </button>
        </div>
      </div>
      <ProductOnboardingTable
        onboardingData={onboardingData}
        setOnboardingData={setOnboardingData}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        totalDetails={totalDetails}
        loading={loading}
        setReload={setReload}
      />
      <AddMetaData
        isOpen={openAddMetaData}
        onClose={() => {
          setOpenAddMetaData(false);
        }}
        setReload={setReload}
      />
    </div>
  );
}

export default ProductOnboarding;
