'use client'

import { useEffect, useState } from "react"
import { User } from "./type"
import Table from "components/table"
import { HEADER_FIELD } from "./constants"
import ProductCard from "@/components/productCard"

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  useEffect(()=>{
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      console.log(data)
      setUsers(data)
    }
    fetchUsers()
  }, [])
    

  return (
    <main className="">
      <div className="dark">Hello User
      <Table header={HEADER_FIELD} data={users} />
      <ProductCard/>
      </div>
    </main>
  )
}

const renderStatus = (value: string, row: string | number | React.ReactElement) => {
  const styleMap: {[key: string]: string} ={
    admin: "bg-red-600 text-white",
    teacher: "bg-gray-200 text-black",
    parent: "bg-blue-500 text-white",
    student: "bg-green-500 text-white"
  };
  return (
    <span className={`px-2 py-1 rounded text-xs ${styleMap[value] || ""}`}>
      {value}
    </span>
  )

}
