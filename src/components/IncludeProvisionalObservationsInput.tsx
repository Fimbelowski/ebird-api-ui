import {
  CheckboxInput,
  type CheckboxInputProps,
} from './CheckboxInput/CheckboxInput';

type Props = Omit<CheckboxInputProps, 'id' | 'label'>;

export default function IncludeProvisionalObservationsInput(props: Props) {
  return (
    <CheckboxInput
      {...props}
      id="include-provisional"
      label="Include Provisional Observations"
    />
  );
}
