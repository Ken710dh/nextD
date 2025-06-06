'use client';

import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

export default function SelectItem({
  value,
  selectOption,
  name,
  label,
  onValueChange
}: {
  label?: string;
  name?: string;
  value: string;
  selectOption: string[];
  onValueChange: (value: string) => void

}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Select.Root value={value} onValueChange={onValueChange} name={name}>
        <Select.Trigger
        className="h-[33px] text-gray-700 inline-flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:border-gray-400 focus:outline-non"
        aria-label={label}
>
          <Select.Value className="text-[12px] text-red-500" placeholder={`Filter by ${name}`}/>
          <Select.Icon className="ml-2">
            <ChevronDownIcon className="text-gray-700"/>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="z-50 text-red-500 w-[150px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in"
            position="popper"
          >
            <Select.Viewport className="p-1">
              <Select.Group>
                {selectOption.map((item, index) => (
                  <Select.Item
                    key={index}
                    value={item}
                    className="relative text-gray-700 flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-blue-100 focus:bg-blue-100"
                  >
                    <Select.ItemText>{item}</Select.ItemText>
                    <Select.ItemIndicator className="absolute right-2 inline-flex items-center">
                      <CheckIcon className="h-4 w-4 text-blue-600" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
