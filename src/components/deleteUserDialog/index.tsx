import Image from "next/image";
import Close from '@/assets/close-icon.svg'
import { UserProfile } from "./type";
import * as Dialog from '@radix-ui/react-dialog'
/**
 * A dialog component to confirm the deletion of a user.
 *
 * The component displays a dialog with a confirmation message and two buttons, 'Cancel' and 'Confirm'.
 * When the 'Cancel' button is clicked, the dialog is closed. When the 'Confirm' button is clicked, the
 * `onConfirm` callback is executed.
 *
 * @param {Object} props - The properties for the DeleteUserDialog component.
 * @param {UserProfile} props.userSelectedToDelete - The user that is selected to be deleted.
 * @param {function} props.handleClose - The function to call when the 'Cancel' button is clicked.
 * @param {function} props.onConfirm - The function to call when the 'Confirm' button is clicked.
 * @returns {React.ReactElement} The dialog component.
 */
export default function DeleteUserDialog({ userSelectedToDelete, handleClose, onConfirm }:
  { userSelectedToDelete: UserProfile , 
    handleClose: () => void, 
    onConfirm: () => void }) {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2
          bg-white dark:bg-zinc-600 rounded-[6px] border-[1px] border-[var(--background-color-1)]  p-11">
        <div className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Confirm Delete {userSelectedToDelete.fullname}
          </Dialog.Title>
          <button className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white" onClick={handleClose}>
            <Image src={Close} alt="Close" width={20} height={20} />
          </button>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded text-sm border border-zinc-300 dark:border-zinc-600
            hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={handleClose}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded text-sm bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}