import { useCallback, useEffect, useState } from "react";
import { useMode } from "../contexts/themeModeContext";
import AddMetaData from "../components/modal/AddMetaData";
import ProductOnboardingTable from "../components/table/ProductOnboardingTable";
import { notifyError } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import ProductOnboardingServices from "../services/ProductOnboardingServices";

function ProductOnboarding() {
  const router = useNavigate();
  const { theme } = useMode();

  const [page, setPage] = useState(0);
  const [pageDetails, setPageDetails] = useState({});
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
        const result = await ProductOnboardingServices.FetchMetadata(limit, page, search);
        if (result.success === true) {
          const { total_pages, metadata, has_previous, has_next, total } = result.data;
          console.log(metadata);
          const transformedMetadata = metadata.map((data) => {
            return {
              productName: data.name,
              productDescription: data.description,
              category: data.category_id,
              subCategory: data.subcategory_id,
              code: data.hsn_code,
              mrp: data.mrp,
              image: data.image,
              id: data.product_id,
            };
          });
          
            setPageDetails({ next: has_next, prev: has_previous });
            setTotalDetails({ total: total, total_pages: total_pages });
            setOnboardingData(transformedMetadata);
          
        } else {
          notifyError(`Error Fetching Metadata ${result.message}`);
        }

        setLoading(false);
      } catch (err) {
        if (err === "cookie error") {
          Cookies.remove("EspazeCookie");
          router("/login");
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err.message);
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
            className={`p-1 px-7 rounded-md font-medium
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
        pageDetails={pageDetails}
        totalDetails={totalDetails}
        loading={loading}
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
