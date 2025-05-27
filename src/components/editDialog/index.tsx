import * as React from 'react';
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { Dialog } from "radix-ui";
import Image from 'next/image';
import Edit from '@/assets/edit-icon.svg';

/**
 * A modal component for editing user information.
 * This component provides a dialog interface that prompts the user for
 * confirmation before proceeding with the deletion of a user. It includes
 * options to cancel the action or confirm the deletion.
 * @param {Object} props - The properties for the EditModal component.
 * @param {React.ReactNode} props.dataDialog - The content to be displayed inside the modal.
 * @param {boolean} props.open - Controls the visibility of the modal.
 * @param {function} props.handleOpen - Callback function executed when the modal open state changes.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @return {JSX.Element}
 */
export function EditModal({ dataDialog, open, handleOpen }: { dataDialog: React.ReactNode,
  open: boolean,
  handleOpen: () => void
  }) {
  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
  <Dialog.Trigger asChild>
    <button>
      <Image src={Edit} width={20} height={20} alt="Edit" />
    </button>
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/3 z-40" />
    <Dialog.Content
      style={{ maxWidth: '1000px', maxHeight: '90vh', width: '100%' }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-white dark:bg-zinc-600 rounded-[6px] border-[var(--border-color-1)] shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-11 z-50"
    >
      {dataDialog}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
  )
}