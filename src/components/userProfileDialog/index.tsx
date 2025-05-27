
import { Button } from "@radix-ui/themes";
import React from "react";
/**
 * A dialog component to display user profile information.
 *
 * The component displays the user's avatar, name, email, bio, phone number, and role.
 *
 * @param {Object} props The component props.
 * @param {() => void} props.handleClose The function to call when the cancel Button is clicked.
 * @returns {React.ReactElement} The dialog component.
 */
export default function UserProfileDialog({handleClose}: {handleClose: () => void}) {
  const user = {
    name: "Lê Minh Tuấn",
    email: "tuan.le@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    bio: "Fullstack Developer yêu thích React, Tailwind, và UI đẹp.",
    phone: "0987 654 321",
    role: "Admin",
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-24 h-24 rounded-full border shadow"
          />
          <h2 className="mt-4 text-xl font-semibold text-zinc-800 dark:text-zinc-100">{user.name}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
        </div>

        <div className="space-y-4">
          <InfoField label="Bio" value={user.bio} />
          <InfoField label="Số điện thoại" value={user.phone} />
          <InfoField label="Vai trò" value={user.role} />
        </div>
        <Button onClick={handleClose}>Cancel</Button>
      </div>

    </>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
      <p className="text-xs uppercase font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-100">{value}</p>
    </div>
  );
}