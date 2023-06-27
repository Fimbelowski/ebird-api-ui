import { NumberInput, type NumberInputProps } from './NumberInput';

type Props = Omit<NumberInputProps, 'id' | 'inline' | 'label' | 'noScroll'> & {
  max: number;
};

export default function PageInput(props: Props) {
  return (
    <NumberInput
      {...props}
      id="go-to-page"
      label="Go to Page"
      noScroll
      min={1}
    />
  );
}
