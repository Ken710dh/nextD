'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@radix-ui/themes'
import Close from '@/assets/close-icon.svg'
import Delete from '@/assets/delete-icon.svg'
import Image from 'next/image'

/**
 * A modal component for confirming the deletion of a user.
 *
 * This component provides a dialog interface that prompts the user for
 * confirmation before proceeding with the deletion of a user. It includes
 * options to cancel the action or confirm the deletion.
 *
 * Props:
 * - `open` (boolean): Controls the visibility of the modal. 
 * - `handleOpen` (function): Callback function executed when the modal open state changes.
 * - `handleClose` (function): Callback function executed when the close button or cancel button is clicked.
 * - `onConfirm` (function): Callback function executed when the confirm button is clicked to proceed with deletion.
 */

export default function DeleteUserModal({ open, handleOpen, handleClose,
  onConfirm,
}: {
  onConfirm: () => void,
  open: boolean,
  handleClose: () => void,
  handleOpen: () => void
}) {
  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger>
        <Image src={Delete} alt="" height={20} width={20}></Image>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/3 z-40" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2
          bg-white dark:bg-zinc-600 rounded-[6px] border-[1px] border-[var(--background-color-1)]  p-11"

        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              Confirm Delete
            </h2>
            <Button className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white" onClick={handleClose}>
              <Image src={Close} alt="Close" width={20} height={20} />
            </Button>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button className="px-4 py-2 rounded text-sm border border-zinc-300 dark:border-zinc-600
            hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={handleClose}>
              Cancel  
            </Button>
            <Button
              onClick={onConfirm}
              className="px-4 py-2 rounded text-sm bg-red-600 text-white hover:bg-red-700"
            >
              Confirm
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
