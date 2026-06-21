"use client";

import React from "react";
import { Input, Select, ListBox, Label, SearchField } from "@heroui/react";
import { FiSearch, FiSliders } from "react-icons/fi";

export default function TaskFilter() {
  const categories = [
    { id: "all_cat", name: "All Categories" },
    { id: "web_dev", name: "Web Development" },
    { id: "full_stack", name: "Full Stack Development" },
    { id: "graphics", name: "Graphics Design" },
    { id: "writing", name: "Content Writing" },
    { id: "ui_ux", name: "UI/UX Design" },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
        <FiSliders className="text-indigo-600 w-4 h-4" />
        <span>Filter & Search</span>
      </div>

      {/* Search Input field */}
      <div className="space-y-1.5">
        <SearchField name="search">
          <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Search Keyword
          </Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-full" placeholder="e.g., Landing page, Bug fix..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      {/* Category Dropdown*/}
      <div className="space-y-1.5 flex flex-col">
        <Select className="w-full" placeholder="Select Category">
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
        <Select className="w-full" placeholder="All Budgets">
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
