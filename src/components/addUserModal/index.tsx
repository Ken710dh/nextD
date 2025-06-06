import { VisuallyHidden } from "@radix-ui/themes";
import { Dialog } from "radix-ui";

export default function AddUserModal({ dataDialog, open, handleOpen }: {
  dataDialog: React.ReactNode,
  open: boolean,
  handleOpen: () => void
}){
  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <button  className="w-[100px] h-[33px] rounded-md border text-white border-gray- bg-orange-500 px-3 text-sm shadow-sm hover:border-orange-600 focus:outline-none  focus:border-gray-70 self-end">
          Add
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/3 z-40" />
        <VisuallyHidden>
          <Dialog.Title>Edit User Profile</Dialog.Title>
        </VisuallyHidden>

        <Dialog.Content aria-describedby={undefined} 
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