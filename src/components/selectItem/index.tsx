'use client';

import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Label } from "@radix-ui/react-label";
type SelectOption = string | { label: string; value: string | number };

function isObjectOption(option: SelectOption): option is { label: string; value: string | number } {
  return typeof option === "object" && option !== null && "label" in option && "value" in option;
}

export default function SelectItem({
  value,
  selectOption,
  name,
  label,
  onValueChange,
  width,
  height

}: {
  label?: string;
  name?: string;
  value: string;
  selectOption: SelectOption[];
  onValueChange: (val: string) => void;
  width?: string;
  height?: string;
}) {
  return (
    <div className="w-full">
      <Select.Root value={value} onValueChange={onValueChange} name={name}>
        <Label className="text-sm font-medium">
          {label}
        </Label>
        <Select.Trigger
          className={` ${width} ${height} text-gray-700 inline-flex items-center  justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:border-gray-400 focus:outline-none`}
          aria-label={label}
        >
          <Select.Value placeholder={name ? `Filter by ${name}` : ''} />
          <Select.Icon className="ml-2">
            <ChevronDownIcon className="text-gray-700" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="z-50 text-red-500 w-[150px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in"
            position="popper"
          >
            <Select.Viewport className="p-1">
              <Select.Group>
                {selectOption.map((item, index) => {
                  const val = isObjectOption(item) ? String(item.value) : item;
                  const label = isObjectOption(item) ? item.label : item;

                  return (
                    <Select.Item
                      key={index}
                      value={val}
                      className="relative text-gray-700 flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-blue-100 focus:bg-blue-100"
                    >
                      <Select.ItemText>{label}</Select.ItemText>
                      <Select.ItemIndicator className="absolute right-2 inline-flex items-center">
                        <CheckIcon className="h-4 w-4 text-blue-600" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                })}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
