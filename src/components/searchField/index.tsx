import Form from 'next/form'
import React from 'react';
 
/**
 * A search field component that includes an input for search queries and a submit button.
 * 
 * @param {Object} props - The properties object.
 * @param {function} props.handleChange - A callback function that is triggered when the search input value changes.
 * @param {string} props.query - The current value of the search input.
 */

export default function SearchField({handleChange, query}:
  {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    query: string;
  } = { handleChange: () => {}, query: '' }
) {
  return (
    <Form action="">
      <input className="h-[33px]  text-gray-700 inline-flex items-center  justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:border-gray-400 focus:outline-none" name="query" onChange={handleChange} value={query} type="search" placeholder="Search..."/>
    </Form>
  )
}