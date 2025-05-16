'use client'

import { useEffect, useState } from "react"
import { User } from "./type"
import Table from "components/table"
import { HEADER_FIELD } from "./constants"

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
    <main className="p-">
      <div>Hello User
      <Table header={HEADER_FIELD} data={users} />
      </div>
    </main>
  )
}