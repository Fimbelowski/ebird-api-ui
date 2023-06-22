import type EbirdTaxonomyCategory from '../types/EbirdTaxonomyCategory';
import {
  Select,
  type SelectProps,
  type SelectOptionArray,
} from './Select/Select';
import taxonomyCategoryToLabel from '../utilities/taxonomyCategoryToLabel';

type Props = Omit<
  SelectProps<EbirdTaxonomyCategory>,
  'id' | 'label' | 'options'
>;

export default function EbirdTaxonomyCategorySelect(props: Props) {
  const categories: EbirdTaxonomyCategory[] = [
    '',
    'domestic',
    'form',
    'hybrid',
    'intergrade',
    'issf',
    'slash',
    'species',
    'spuh',
  ];

  const options: SelectOptionArray<EbirdTaxonomyCategory> = categories.map(
    (category) => {
      return {
        label: taxonomyCategoryToLabel(category),
        value: category,
      };
    }
  );

  return (
    <Select<EbirdTaxonomyCategory>
      {...props}
      id="category"
      label="Category"
      options={options}
    />
  );
}
