import PATHS from '../../../utilities/PATHS';

const PAGE = {
  EbirdTaxonomy: {
    description:
      'Fetches the taxonomy (species, species codes, common names, scientific names, etc.) used by Ebird',
    path: PATHS.EbirdTaxonomy,
    requiresApiKey: true,
    title: 'eBird Taxonomy',
  },
  TaxaLocaleCodes: {
    description:
      'Fetches a list of supported locale codes and names used for species common names, as well as the last time they were updated.',
    path: PATHS.TaxaLocaleCodes,
    requiresApiKey: true,
    title: 'Taxa Locale Codes',
  },
  TaxonomicForms: {
    description:
      'For a given species, fetches a list of subspecies recognised by the eBird taxonomy (including the given species).',
    path: PATHS.TaxonomicForms,
    requiresApiKey: true,
    title: 'Taxonomic Forms',
  },
  TaxonomicGroups: {
    description: 'Fetches a list of species groups (terns, finches, etc.)',
    path: PATHS.TaxonomicGroups,
    requiresApiKey: true,
    title: 'Taxonomic Groups',
  },
  TaxonomyVersions: {
    description:
      "Fetches a list of all versions of eBird's taxonomy, with a flag indicating the latest version.",
    path: PATHS.TaxonomyVersions,
    title: 'Taxonomy Versions',
  },
} as const;

export default PAGE;
