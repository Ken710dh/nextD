"use client";

import { useEffect, useState } from "react";
import { HEADER_FIELD } from "./constants";
import { USERS } from "./dummyUser";
import Table from "@/components/table";
import CustomCheckbox from "@/components/checkbox";
import Image from "next/image";
import Edit from "@/assets/edit-icon.svg";
import Delete from "@/assets/delete-icon.svg";
import { EditModal } from "@/components/editDialog";
import UserProfileDialog from "@/components/userProfileDialog";

export default function Users() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const handleSelectAll = (checked: boolean | 'indeterminate') => {
      if (checked === true) {
        setSelectedUsers(USERS.map((user) => user.email));
      } else {
        setSelectedUsers([]);
      }
    };

    const handleItemChange = (item: string) => {
      setSelectedUsers((prevSelectedUsers) => {
        if (prevSelectedUsers.includes(item)) {
          return prevSelectedUsers.filter((user) => user !== item);
        } else {
          return [...prevSelectedUsers, item];
        }
      })
    }
const isAllSelected = selectedUsers.length === USERS.length;

  const DATA_USERS = USERS.map((user) => {
    return {
      checkbox: <CustomCheckbox 
        checked={selectedUsers.includes(user.email)} 
        onCheckedChange={() => handleItemChange(user.email)} 
      />,
      name: user.name,
      email: user.email,
      role: (
        <td className={` w-[50px] text-center text-[12px] rounded-[8px] ${getRoleClass(user.role)}`}>
          {user.role}
        </td>
      ),
      status:(
        <td className={` w-[50px] text-center text-[12px] rounded-[8px] ${getActiveClass(user.status)}`}>
          {user.status}
        </td>
      ),
      created: user.created,
      lastLogin: user.lastLogin,
      action: (
        <div className="flex gap-2 px-0 align-center">
          <EditModal dataDialog = {<UserProfileDialog />} />
          <Image src={Delete} width={24} height={24} alt="delete"/>
        </div>
      ),
    };
  });
  return (
    <main className="p-">
      <div>
        Hello User
        <Table header={HEADER_FIELD} data={DATA_USERS} 
        checked={isAllSelected} 
        handleAllItemSelect={handleSelectAll} />
      </div>
    </main>
  );
}

function getRoleClass(role: string) {
  switch (role) {
    case "student":
      return "bg-blue-100 text-blue-800";
    case "teacher":
      return "bg-green-100 text-green-800";
    case "admin":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getActiveClass(role: string) {
  switch (role) {
    case "active":
      return "bg-green-100 text-green-800"; 
    default:
      return "bg-gray-100 text-gray-800";
  }
}
