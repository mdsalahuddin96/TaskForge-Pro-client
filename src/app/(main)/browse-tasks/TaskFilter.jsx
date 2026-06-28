"use client";

import React, { useEffect, useState } from "react";
import { Select, ListBox, Label, SearchField, Button } from "@heroui/react";
import { FiSliders, FiXCircle } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
export default function TaskFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("searchParams",searchParams)
  const [searchInp, setSearchInp] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [budget, setBudget] = useState(searchParams.get("budget") || "");
  const isFilterActive = searchInp || category || budget;
  const categories = [
    {
      id: "All Category",
      name: "All Category",
    },
    {
      id: "Web Development",
      name: "Web Development",
    },
    {
      id: "Graphics Design",
      name: "Graphics Design",
    },
    {
      id: "Content Writing",
      name: "Content Writing",
    },
    {
      id: "UI/UX Design",
      name: "UI/UX Design",
    },
    {
      id: "Other",
      name: "Other",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchInp) params.set("search", searchInp);
      if (category) params.set("category", category);
      if (budget) params.set("budget", budget);
      router.push(`/browse-tasks?${params.toString()}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInp, category, budget, router]);
  const handleClearFilters = () => {
    setSearchInp("");
    setCategory("");
    setBudget("");
    router.push("/browse-tasks"); 
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
        <FiSliders className="text-indigo-600 w-4 h-4" />
        <span>Filter & Search</span>

        {isFilterActive && (
          <Button
            size="sm"
            variant="light"
            onClick={handleClearFilters}
            className="text-xs font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 min-w-0 h-auto p-1 px-2 rounded-lg gap-1 hover:bg-rose-500/5 transition-all"
          >
            <FiXCircle className="w-3.5 h-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Search Input field */}
      <div className="space-y-1.5">
        <SearchField name="search" value={searchInp}>
          <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Search Keyword
          </Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              className="w-full"
              placeholder="e.g., Landing page, Bug fix..."
              onChange={(e) => setSearchInp(e.target.value)}
            />
            <SearchField.ClearButton onClick={() => setSearchInp("")} />
          </SearchField.Group>
        </SearchField>
      </div>

      {/* Category Dropdown*/}
      <div className="space-y-1.5 flex flex-col">
        <Select
          className="w-full"
          placeholder="Select Category"
          value={category}
          onChange={(value) => setCategory(value)}
        >
          <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Category
          </Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {categories.map((cat) => (
                <ListBox.Item key={cat.id} id={cat.id} textValue={cat.name}>
                  {cat.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Budget Dropdown*/}
      <div className="space-y-1.5 flex flex-col">
        <Select
          className="w-full"
          placeholder="All Budgets"
          value={budget}
          onChange={(value) => setBudget(value)}
        >
          <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Budget Range
          </Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all" textValue="All Budgets">
                All Budgets
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="low" textValue="Under $50">
                Under $50
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="mid" textValue="$50 - $200">
                $50 - $200
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="high" textValue="$200+">
                $200+
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}
