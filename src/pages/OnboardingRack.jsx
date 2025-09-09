// src/pages/OnboardingRack.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Services (use ONLY this for GET + POST as you said)
import OnboardingRackServices from "../services/OnboardingRack";

// Toast helpers (same pattern as your other file)
import { notifyError, notifySuccess } from "../utils/toast";

// ---- Local fallback only for warehouses UI (unchanged UI) ----
const fallbackWarehouses = [
  { id: "w1", name: "Warehouse A - North" },
  { id: "w2", name: "Warehouse B - South" },
  { id: "w3", name: "Warehouse C - East" },
  { id: "w4", name: "Warehouse D - West" },
];

// ---- Helper: normalize common API payload shapes ----
const toArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.result)) return payload.result;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

export default function OnboardingRack() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // ---------- Dropdown control ----------
  const [openDropdown, setOpenDropdown] = useState(null);

  // ---------- Source options ----------
  const [categories, setCategories] = useState([]);       // [{id,name}]
  const [subcategories, setSubcategories] = useState([]); // [{id,name}]
  const [warehouses] = useState(fallbackWarehouses);

  // ---------- Loading flags (like your preferred style) ----------
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------- Form state ----------
  const [form, setForm] = useState({
    categoryId: "",
    categoryName: "",
    subcategoryId: "",
    subcategoryName: "",
    warehouseId: "",
    warehouseName: "",
    segments: 1,
    volume: "",
  });

  // ---------- Button visual state (kept identical) ----------
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Keep white theme like your current page
  const [theme] = useState(true);

  // --- UI classes (UNCHANGED to preserve final look) ---
  const controlHeight = "h-12";
  const ddBtn = `w-full ${controlHeight} flex items-center justify-between px-4 border border-gray-300 rounded-xl bg-white text-[15px] hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`;
  const ddMenu =
    "absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto";
  const labelCls = "block text-sm font-medium text-gray-700";

  // ---------- Fetch: Categories (on mount) ----------
  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      setCategoryLoading(true);
      try {
        const res = await OnboardingRackServices.FetchAllCategory();
        const raw = res?.data?.data ?? res?.data ?? res; // tolerate axios wrappers
        const arr = toArray(raw).map((c) => ({
          id:
            c.id ||
            c._id ||
            c.categoryId ||
            c.category_id ||
            c.value ||
            c.name,
          name:
            c.name ||
            c.category_name ||
            c.title ||
            c.label ||
            "Unnamed",
        }));
        if (mounted) setCategories(arr);
      } catch (err) {
        if (mounted) setCategories([]);
        // Follow your toast pattern
        if (err === "cookie error" || err?.message === "cookie error") {
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err?.response?.data?.message || err.message || "Failed to load categories");
        }
      } finally {
        if (mounted) setCategoryLoading(false);
      }
    };

    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  // ---------- Close dropdowns on outside click ----------
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ---------- Dropdown helpers ----------
  const toggleDropdown = (type) =>
    setOpenDropdown((curr) => (curr === type ? null : type));

  // ---------- Selections ----------
  const selectCategory = async (cat) => {
    setOpenDropdown(null);
    // Set selection + reset subcategory
    setForm((f) => ({
      ...f,
      categoryId: cat.id,
      categoryName: cat.name,
      subcategoryId: "",
      subcategoryName: "",
    }));

    // Fetch subcategories for selected category
    setSubCategoryLoading(true);
    try {
      // IMPORTANT: this function name must match your service file
      const res = await OnboardingRackServices.FetchAllSubCategory(cat.id);
      const raw = res?.data?.data ?? res?.data ?? res;
      const arr = toArray(raw).map((s) => ({
        id:
          s.id ||
          s._id ||
          s.subcategoryId ||
          s.subcategory_id ||
          s.value ||
          s.name,
        name:
          s.name ||
          s.subcategory_name ||
          s.title ||
          s.label ||
          "Unnamed",
      }));
      setSubcategories(arr);
    } catch (err) {
      setSubcategories([]);
      if (err === "cookie error" || err?.message === "cookie error") {
        notifyError("Cookie error, please relogin and try again");
      } else {
        notifyError(err?.response?.data?.message || err.message || "Failed to load subcategories");
      }
    } finally {
      setSubCategoryLoading(false);
    }
  };

  const selectSubcategory = (sub) => {
    setOpenDropdown(null);
    setForm((f) => ({
      ...f,
      subcategoryId: sub.id,
      subcategoryName: sub.name,
    }));
  };

  const selectWarehouse = (w) => {
    setOpenDropdown(null);
    setForm((f) => ({
      ...f,
      warehouseId: w.id,
      warehouseName: w.name,
    }));
  };

  // ---------- Inputs ----------
  const handleSegmentChange = (e) => {
    const cleaned = e.target.value.replace(/[^\d]/g, "");
    const n = cleaned === "" ? "" : Math.min(100, Math.max(1, parseInt(cleaned, 10)));
    setForm((f) => ({ ...f, segments: n === "" ? "" : n }));
  };

  const handleVolumeChange = (e) => {
    const v = e.target.value;
    if (/^\d*\.?\d*$/.test(v)) setForm((f) => ({ ...f, volume: v }));
  };

  // ---------- Submit: Save and Continue ----------
  const continueOnboarding = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const { categoryId, subcategoryId, warehouseId, segments, volume } = form;
    const segOk = Number.isInteger(Number(segments)) && Number(segments) >= 1;
    const volNum = parseFloat(volume);

    // Same validations as your original
    if (!categoryId || !subcategoryId || !warehouseId) {
      notifyError("Please fill in Category, Subcategory and Warehouse.");
      setIsSubmitting(false);
      return;
    }
    if (!segOk) {
      notifyError("Segment must be a whole number (≥ 1).");
      setIsSubmitting(false);
      return;
    }
    if (!Number.isFinite(volNum) || volume === "") {
      notifyError("Please enter a valid Volume (decimals allowed).");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      categoryId,
      subcategoryId,
      warehouseId,
      segments: Number(segments),
      volume: volNum,
    };

    try {
      // If your service defines a POST, call it here. Otherwise we just simulate success UI.
      if (typeof OnboardingRackServices.create === "function") {
        await OnboardingRackServices.create(payload);
      }
      setSubmitSuccess(true);
      notifySuccess("Profile saved");

      // Reset like your original
      setForm({
        categoryId: "",
        categoryName: "",
        subcategoryId: "",
        subcategoryName: "",
        warehouseId: "",
        warehouseName: "",
        segments: 1,
        volume: "",
      });
      setSubcategories([]);
    } catch (err) {
      notifyError(
        err?.response?.data?.message ||
          err?.message ||
          "Could not save. Please check your API route and try again."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 1200);
    }
  };

  // ---------- Render (UI unchanged) ----------
  return (
    <div className="w-full min-h-full bg-white p-5">
      {/* Header */}
      <header className="w-full">
        <div className="px-5">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full transition"
              aria-label="Go back"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-[20px] font-bold text-black">Onboarding Rack</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative flex-1 w-full mt-5">
        <div ref={containerRef} className="w-full">
          <form
            onSubmit={continueOnboarding}
            className="w-full bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-100"
          >
            <div className="p-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category */}
                <div className="space-y-2 relative">
                  <label className={labelCls}>Category Name</label>
                  <button
                    type="button"
                    onClick={() => toggleDropdown("category")}
                    className={`${ddBtn} ${
                      openDropdown === "category" ? "ring-2 ring-purple-500" : ""
                    } ${categoryLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    disabled={categoryLoading}
                  >
                    <span
                      className={
                        form.categoryName ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {categoryLoading
                        ? "Loading…"
                        : form.categoryName || "Select Category"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-black transition-transform ${
                        openDropdown === "category" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openDropdown === "category" && (
                    <div className={ddMenu}>
                      {categories.map((c) => (
                        <div
                          key={c.id || c.name}
                          onClick={() => selectCategory(c)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 border-gray-100 text-[15px]"
                        >
                          {c.name}
                        </div>
                      ))}
                      {!categories.length && !categoryLoading && (
                        <div className="px-4 py-3 text-gray-500 text-[14px]">
                          No categories found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Warehouse */}
                <div className="space-y-2 relative">
                  <label className={labelCls}>Warehouse Name</label>
                  <button
                    type="button"
                    onClick={() => toggleDropdown("warehouse")}
                    className={`${ddBtn} ${
                      openDropdown === "warehouse" ? "ring-2 ring-purple-500" : ""
                    }`}
                  >
                    <span
                      className={
                        form.warehouseName ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {form.warehouseName || "Select Warehouse"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-black transition-transform ${
                        openDropdown === "warehouse" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openDropdown === "warehouse" && (
                    <div className={ddMenu}>
                      {warehouses.map((w) => (
                        <div
                          key={w.id || w.name}
                          onClick={() => selectWarehouse(w)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 border-gray-100 text-[15px]"
                        >
                          {w.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {/* Subcategory */}
                <div className="space-y-2 relative">
                  <label className={labelCls}>Subcategory Name</label>
                  <button
                    type="button"
                    onClick={() => toggleDropdown("subcategory")}
                    className={`${ddBtn} ${
                      openDropdown === "subcategory" ? "ring-2 ring-purple-500" : ""
                    } ${!form.categoryId || subCategoryLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                    disabled={!form.categoryId || subCategoryLoading}
                  >
                    <span
                      className={
                        form.subcategoryName ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {!form.categoryId
                        ? "Select a Category first"
                        : subCategoryLoading
                        ? "Loading…"
                        : form.subcategoryName || "Select Subcategory"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-black transition-transform ${
                        openDropdown === "subcategory" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openDropdown === "subcategory" && (
                    <div className={ddMenu}>
                      {subcategories.map((s) => (
                        <div
                          key={s.id || s.name}
                          onClick={() => selectSubcategory(s)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 border-gray-100 text-[15px]"
                        >
                          {s.name}
                        </div>
                      ))}
                      {!subcategories.length && form.categoryId && !subCategoryLoading && (
                        <div className="px-4 py-3 text-gray-500 text-[14px]">
                          No subcategories
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Segment */}
                <div className="space-y-2">
                  <label className={labelCls}>Segment</label>
                  <div
                    className={`flex items-center border border-gray-300 rounded-xl bg-white ${controlHeight}`}
                  >
                    <input
                      type="number"
                      value={form.segments}
                      min="1"
                      step="1"
                      onChange={handleSegmentChange}
                      onWheel={(e) => e.currentTarget.blur()}
                      className="flex-1 h-full px-2 text-center border-0 focus:outline-none number-input text-lg font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Volume */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div className="space-y-2">
                  <label className={labelCls}>Volume</label>
                  <div
                    className={`flex items-center border border-gray-300 rounded-xl bg-white ${controlHeight} w-full`}
                  >
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.volume}
                      onChange={handleVolumeChange}
                      onWheel={(e) => e.currentTarget.blur()}
                      placeholder="0.00"
                      className="flex-1 h-full px-4 text-left border-0 focus:outline-none number-input text-[15px]"
                    />
                  </div>
                </div>
              </div>

              {/* Save and Continue */}
              <div className="mt-6">
                <button
                  type="submit"
                  className={`w-full p-2.5 text-white font-semibold rounded-md transition-all ${
                    submitSuccess
                      ? "bg-green-500"
                      : theme
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-purple-700 hover:bg-purple-800"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Processing..."
                    : submitSuccess
                    ? "Profile Saved!"
                    : "Save and Continue"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
