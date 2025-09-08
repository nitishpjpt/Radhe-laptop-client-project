"use client";

import { useState, useContext, useMemo } from "react";
import { ProductContext } from "../../Context/ProductContext/ProductContext"; // Adjust the import path
import ProductListing from "./ProductListing";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Filter() {
  const { productDetails } = useContext(ProductContext);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique brands and categories from productDetails
  const uniqueBrands = useMemo(() => {
    const brands = new Set(productDetails.map((product) => product.brandName));
    return Array.from(brands).map((brand) => ({
      value: brand,
      label: brand,
    }));
  }, [productDetails]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(
      productDetails.map((product) => product.category.toLowerCase())
    );
    return Array.from(categories).map((category) => ({
      value: category,
      label: category,
    }));
  }, [productDetails]);

  // Dynamically generate filters based on unique brands and categories
  const filters = [
    {
      id: "brand",
      name: "Brand",
      options: uniqueBrands,
    },
    {
      id: "category",
      name: "Category",
      options: uniqueCategories,
    },
  ];

  // Handle brand filter change
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter products based on selected brands and categories
  const filteredProducts = productDetails.filter((product) => {
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brandName);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === "" ||
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()); // Search logic
    return matchesBrand && matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters for mobile */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <div
                      key={section.id}
                      className="border-b border-gray-200 py-6 px-4"
                    >
                      <h3 className="-my-3 flow-root">
                        <div className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                        </div>
                      </h3>
                      <div className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${section.id}-${option.value}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                checked={
                                  section.id === "brand"
                                    ? selectedBrands.includes(option.value)
                                    : selectedCategories.includes(option.value)
                                }
                                onChange={() =>
                                  section.id === "brand"
                                    ? handleBrandChange(option.value)
                                    : handleCategoryChange(option.value)
                                }
                              />
                              <label
                                htmlFor={`filter-${section.id}-${option.value}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:w-40 md:w-86 lg:w-[15rem] border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />

          {/* Mobile filter button */}
          <button
            type="button"
            className="inline-block lg:hidden text-gray-400 hover:text-gray-500"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="sr-only">Filters</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <section aria-labelledby="products-heading" className="">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="flex gap-8">
            {/* Filters for desktop */}
            <form className="hidden lg:block">
              {filters.map((section) => (
                <div key={section.id} className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <div className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                    </div>
                  </h3>
                  <div className="pt-6">
                    <div className="space-y-4">
                      {section.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${option.value}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={
                              section.id === "brand"
                                ? selectedBrands.includes(option.value)
                                : selectedCategories.includes(option.value)
                            }
                            onChange={() =>
                              section.id === "brand"
                                ? handleBrandChange(option.value)
                                : handleCategoryChange(option.value)
                            }
                          />
                          <label
                            htmlFor={`filter-${section.id}-${option.value}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </form>

            {/* Product grid */}
            <div className="">
              <ProductListing products={filteredProducts} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
