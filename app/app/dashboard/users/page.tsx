'use client'

import { useEffect, useState } from "react"
import { User } from "./type"

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
      <div>Hello User</div>
      <div>{users.map((user: any, index)=>(
        <div key={index}>
          <h3>{user.name}</h3>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ))}</div>
    </main>
  )
}