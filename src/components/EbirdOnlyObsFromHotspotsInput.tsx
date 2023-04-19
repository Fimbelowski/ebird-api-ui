import { CheckboxInput, type CheckboxInputProps } from './CheckboxInput';

type Props = Omit<CheckboxInputProps, 'id' | 'label'>;

export default function EbirdOnlyObsFromHotspotsInput(props: Props) {
  return (
    <CheckboxInput
      {...props}
      id="only-obs-from-hotspots"
      label="Only Observations from Hotspots"
    />
  );
}
