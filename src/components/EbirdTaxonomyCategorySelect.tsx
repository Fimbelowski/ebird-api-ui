import type EbirdTaxonomyCategory from '../types/EbirdTaxonomyCategory';
import {
  Select,
  type SelectProps,
  type SelectOptionArray,
} from './Select/Select';

type Props = Omit<
  SelectProps<EbirdTaxonomyCategory>,
  'id' | 'label' | 'options'
>;

export default function EbirdTaxonomyCategorySelect(props: Props) {
  const options: SelectOptionArray<EbirdTaxonomyCategory> = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Domestic',
      value: 'domestic',
    },
    {
      label: 'Form',
      value: 'form',
    },
    {
      label: 'Hybrid',
      value: 'hybrid',
    },
    {
      label: 'Intergrade',
      value: 'intergrade',
    },
    {
      label: 'Identifiable Sub-specific Group',
      value: 'issf',
    },
    {
      label: 'Slash',
      value: 'slash',
    },
    {
      label: 'Species',
      value: 'species',
    },
    {
      label: 'Spuh',
      value: 'spuh',
    },
  ];

  return (
    <Select<EbirdTaxonomyCategory>
      {...props}
      id="category"
      label="Category"
      options={options}
    />
  );
}
