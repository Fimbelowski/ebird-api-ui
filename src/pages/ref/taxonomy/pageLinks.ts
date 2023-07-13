import type Page from '../../../types/Page';

const pageLinks: Page[] = [
  {
    description:
      'Fetches the taxonomy (species, species codes, common names, scientific names, etc.) used by Ebird',
    path: 'ebird-taxonomy',
    requiresApiKey: true,
    title: 'eBird Taxonomy',
  },
  {
    description:
      'Fetches a list of supported locale codes and names used for species common names, as well as the last time they were updated.',
    path: 'taxa-locale-codes',
    requiresApiKey: true,
    title: 'Taxa Locale Codes',
  },
  {
    description:
      'For a given species, fetches a list of subspecies recognised by the eBird taxonomy (including the given species).',
    path: 'taxonomic-forms',
    requiresApiKey: true,
    title: 'Taxonomic Forms',
  },
  {
    description: 'Fetches a list of species groups (terns, finches, etc.)',
    path: 'taxonomic-groups',
    requiresApiKey: true,
    title: 'Taxonomic Groups',
  },
  {
    description:
      "Fetches a list of all versions of eBird's taxonomy, with a flag indicating the latest version.",
    path: 'taxonomy-versions',
    title: 'Taxonomy Versions',
  },
];

export default pageLinks;
