'use client'

import * as Dialog from '@radix-ui/react-dialog'
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
 */

export default function DeleteModal({ open, handleOpen, deleteUserDialog
}: {
  open: boolean,
  handleOpen: () => void
  deleteUserDialog: React.ReactNode
}) {
  return (
    <Dialog.Root  onOpenChange={handleOpen} open={open}>
      <Dialog.Trigger>
        <Image src={Delete} alt=""style={{height: '25px', width: '25px'}}/>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/3 z-40" />
        <Dialog.Content asChild>
          {deleteUserDialog}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
