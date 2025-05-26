import * as React from 'react';
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { Dialog } from "radix-ui";
import Image from 'next/image';
import Edit from '@/assets/edit-icon.svg';

export function EditModal({ dataDialog }: { dataDialog: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>
          <Image src={Edit} width={20} height={20} alt="Edit" />
        </button>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content
  style={{ maxWidth: '600px', width: '100%' }}
  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 z-50"
>
  {dataDialog}
</Dialog.Content>
    </Dialog.Root>
  )
}