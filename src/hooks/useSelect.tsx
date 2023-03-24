import Select from '../components/Select';
import type SelectOption from '../types/SelectOption';
import type SelectProps from '../types/SelectProps';

export default function useSelect<T extends string>(
  options: Array<SelectOption<T>>
) {
  function CurriedSelect(props: Omit<SelectProps<T>, 'options'>) {
    return (
      <Select<T>
        {...props}
        options={options}
      />
    );
  }

  return CurriedSelect;
}
