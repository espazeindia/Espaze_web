import React, { useState } from "react";

const CATEGORIES = [
  { id: 1, label: "Electronics"},
  { id: 2, label: "Fashion"},
  { id: 3, label: "Home & Kitchen"},
  { id: 4, label: "Sports"},
  { id: 5, label: "Books"},
  { id: 6, label: "Beauty"},
  { id: 7, label: "Toys"},
  { id: 8, label: "Automobile"},
];

function CategorySelection() {
  const [selected, setSelected] = useState([]);

  const toggle = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  const handleSave = () => {
    console.log("Selected categories →", selected);
    alert(`Saved: ${selected.join(", ") || "none"}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="px-6 pt-6 pb-3">
        <h1 className="text-2xl font-bold">Let’s select your categories</h1>
        <p className="text-gray-600">Pick one or more to proceed.</p>
      </div>

      <div className="px-6 pb-28"> 
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((c) => {
            const active = selected.includes(c.label);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.label)}
                className={[
                  "px-4 py-2 rounded-full border text-sm transition-all",
                  "flex items-center gap-2 shadow-sm",
                  active
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400",
                ].join(" ")}
              >
                <span aria-hidden>{c.icon}</span>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-white/95 backdrop-blur border-t shadow-lg">
        <div className="px-6 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Selected Categories</h2>
            <span className="text-xs text-gray-500">
              {selected.length} selected
            </span>
          </div>
          {selected.length === 0 ? (
            <p className="text-gray-500 text-sm">Nothing selected yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selected.map((label) => (
                <span
                  key={label}
                  className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {label}
                  <button
                    onClick={() =>
                      setSelected((prev) => prev.filter((x) => x !== label))
                    }
                    className="leading-none text-green-800 hover:text-green-900"
                    aria-label={`Remove ${label}`}
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={selected.length === 0}
            className={[
              "w-full rounded-xl py-3 font-medium transition-colors",
              selected.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700",
            ].join(" ")}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategorySelection;
