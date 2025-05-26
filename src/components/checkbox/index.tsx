import { Checkbox } from "radix-ui";
import { CheckIcon } from '@radix-ui/react-icons';

/**
 * A custom checkbox component built on top of radix-ui's Checkbox component.
 * @param {Object} props The component props.
 * @param {boolean} props.checked Whether the checkbox is checked.
 * @param {(checked: boolean) => void} props.onCheckedChange The function to call when the checkbox is toggled.
 * @param {string} [props.label] The label to display next to the checkbox.
 * @returns {React.ReactElement} The checkbox component.
 */
export default function CustomCheckbox({checked, onCheckedChange, label}:{
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
}){
  return(
    <>  
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <Checkbox.Root
        className="w-4 h-4 flex items-center justify-center rounded 
        border border-gray-400 
        data-[state=checked]:bg-[var(--background-color-2)]
        data-[state=checked]:border-[#3A70C0] transition-colors"
        checked={checked}
        onCheckedChange={onCheckedChange}
        id="c1"
      >
        <Checkbox.Indicator className="text-white text-4xl">
          <CheckIcon className="w-5 h-4 text-4xl" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
    </>
  )
}