import type EbirdTaxonomyCategory from '../types/EbirdTaxonomyCategory';

export default function taxonomyCategoryToLabel(
  category: EbirdTaxonomyCategory
) {
  if (category === '') {
    return 'All';
  }

  if (category === 'issf') {
    return 'Identifiable Sub-specific Group';
  }

  return `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
}
