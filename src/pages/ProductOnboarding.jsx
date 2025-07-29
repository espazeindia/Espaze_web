import { useEffect, useState } from "react";
import { useMode } from "../contexts/themeModeContext";
import AddMetaData from "../components/modal/AddMetaData";
import ProductOnboardingTable from "../components/table/ProductOnboardingTable";

function ProductOnboarding() {
  const [page,setPage]=useState(0)
  const [limit,setLimit]=useState(10)
  const [openAddMetaData, setOpenAddMetaData] = useState(false);

  const handleOpenAddMetaDataModal = () => {
    setOpenAddMetaData(true);
  };
  const { theme } = useMode();

  const [onboardingData, setOnboardingData] = useState([
    {
      productName: "Mango",
      productDescription: "Summer is here",
      category: "Fruit and vegetable",
      subCategory: "Fruit",
      code: "ghu243g",
      mrp: 34,
      image: "",
      id : 0
    },
    {
      productName: "Pineapple",
      productDescription: "Very juicy",
      category: "Fruit and vegetable",
      subCategory: "Fruit",
      code: "bth653v",
      mrp: 60,
      image: "",
      id: 1
    },
  ]);



  const [searchData, setSearchData] = useState("");

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };


  return (
    <div
      className={`p-5 min-h-full ${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      }`}
    >
      <div className=" font-bold text-2xl">Product Onboarding</div>
      <div className="flex justify-between mt-5">
        <input
          onChange={handleChange}
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
            theme
              ? "text-zinc-700 border-1 border-zinc-700"
              : "border-zinc-200 border-1 text-white"
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
      <ProductOnboardingTable onboardingData={onboardingData} setOnboardingData={setOnboardingData} setPage={setPage} page={page} limit={limit} setLimit={setLimit}/>
      <AddMetaData
        isOpen={openAddMetaData}
        onClose={() => {
          setOpenAddMetaData(false);
        }}
        setOnboardingData={setOnboardingData}
      />
    </div>
  );
}

export default ProductOnboarding;
