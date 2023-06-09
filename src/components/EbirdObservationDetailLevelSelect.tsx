import type EbirdObservationDetailLevel from '../types/EbirdObservationDetailLevel';
import {
  Select,
  type SelectOptionArray,
  type SelectProps,
} from './Select/Select';

type Props = Omit<
  SelectProps<EbirdObservationDetailLevel>,
  'id' | 'label' | 'options'
>;

export default function EbirdObservationDetailLevelSelect(props: Props) {
  const options: SelectOptionArray<EbirdObservationDetailLevel> = [
    {
      label: 'Full',
      value: 'full',
    },
    {
      label: 'Simple',
      value: 'simple',
    },
  ];

  return (
    <Select<EbirdObservationDetailLevel>
      {...props}
      id="observation-detail-level"
      label="Detail Level"
      options={options}
    />
  );
}
