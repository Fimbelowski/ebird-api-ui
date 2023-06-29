import { TextInput, type TextInputProps } from './TextInput';

type Props = Omit<
  TextInputProps,
  'id' | 'label' | 'placeholder' | 'required'
> & {
  allowCustomRegion?: boolean;
  allowMajorRegion?: boolean;
  allowUsfws?: boolean;
  disallowLocation?: boolean;
  disallowSubnational2?: boolean;
  label?: string;
};

export default function EbirdRegionCodeInput({
  label = 'Region Code (Country, Subnational 1, or Subnational 2 Code)',
  ...rest
}: Props) {
  const countryRegexSource = '^[A-Z]{2}$';
  const locationRegexSource = '^L(?:\\d{1,3}|\\d{5,8})$';
  const subnational1RegexSource = '^[A-Z]{2}-[A-Z]{2,3}$';
  const subnational2RegexSource = '^[A-Z]{2}-[A-Z]{2,3}-(?:[A-Z]{2,3}|\\d{3})$';

  return (
    <TextInput
      {...rest}
      id="region-code"
      label={label}
      placeholder="US-CO"
      required
    />
  );
}
