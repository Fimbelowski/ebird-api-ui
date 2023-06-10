import { Textarea, type TextareaProps } from './Textarea/Textarea';

type Props = Omit<
  TextareaProps,
  'id' | 'label' | 'onChange' | 'placeholder' | 'rows' | 'value'
> & {
  onChange: (value: string[]) => void;
  value: string[];
};

export default function LocationTextarea({
  onChange: onChangeProp,
  value,
  ...rest
}: Props) {
  function onChange(value: string) {
    onChangeProp(value.split('\n'));
  }

  function valueAsString() {
    return value.join('\n');
  }

  return (
    <Textarea
      {...rest}
      id="locations"
      label="Locations"
      onChange={onChange}
      placeholder="L140473&#10;L2747329"
      rows={2}
      value={valueAsString()}
    />
  );
}
