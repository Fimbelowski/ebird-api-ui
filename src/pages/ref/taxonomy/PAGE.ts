import PATH from '../../../types/PATH';

const PAGE = {
  EbirdTaxonomy: {
    description:
      'Fetches the taxonomy (species, species codes, common names, scientific names, etc.) used by Ebird',
    path: PATH.EbirdTaxonomy,
    requiresApiKey: true,
    title: 'eBird Taxonomy',
  },
  TaxaLocaleCodes: {
    description:
      'Fetches a list of supported locale codes and names used for species common names, as well as the last time they were updated.',
    path: PATH.TaxaLocaleCodes,
    requiresApiKey: true,
    title: 'Taxa Locale Codes',
  },
  TaxonomicForms: {
    description:
      'For a given species, fetches a list of subspecies recognised by the eBird taxonomy (including the given species).',
    path: PATH.TaxonomicForms,
    requiresApiKey: true,
    title: 'Taxonomic Forms',
  },
  TaxonomicGroups: {
    description: 'Fetches a list of species groups (terns, finches, etc.)',
    path: PATH.TaxonomicGroups,
    requiresApiKey: true,
    title: 'Taxonomic Groups',
  },
  TaxonomyVersions: {
    description:
      "Fetches a list of all versions of eBird's taxonomy, with a flag indicating the latest version.",
    path: PATH.TaxonomyVersions,
    title: 'Taxonomy Versions',
  },
} as const;

export default PAGE;
