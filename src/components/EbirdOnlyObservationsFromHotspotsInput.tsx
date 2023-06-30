import {
  CheckboxInput,
  type CheckboxInputProps,
} from './CheckboxInput/CheckboxInput';

type Props = Omit<CheckboxInputProps, 'id' | 'label'>;

export default function EbirdOnlyObservationsFromHotspotsInput(props: Props) {
  return (
    <CheckboxInput
      {...props}
      id="only-obs-from-hotspots"
      label="Only Fetch Observations from Hotspots"
    />
  );
}
