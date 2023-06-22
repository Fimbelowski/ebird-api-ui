import { useContext } from 'react';

import type { SelectProps } from './Select/Select';
import useTaxonomyVersions from '../services/ebird/hooks/endpoints/ref/taxonomy/useTaxonomyVersions';
import AsyncResourceSelect from './AsyncResourceSelect/AsyncResourceSelect';
import type EbirdTaxonomyVersion from '../types/EbirdTaxonomyVersion';
import TaxonomyVersionOptionsContext from '../context/TaxonomyVersionOptionsContext';

type Props = Omit<SelectProps<string>, 'id' | 'label' | 'options'>;

export default function VersionSelect(props: Props) {
  const { taxonomyVersionOptions, setTaxonomyVersionOptions } = useContext(
    TaxonomyVersionOptionsContext
  );

  const getTaxonomyVersions = useTaxonomyVersions();

  function hasQueried() {
    return taxonomyVersionOptions.length > 1;
  }

  function onLoad(versions: EbirdTaxonomyVersion[]) {
    setTaxonomyVersionOptions(
      versions.map(({ authorityVer, latest }) => {
        const versionAsString = authorityVer.toString();

        return {
          label: `${versionAsString}${latest ? ' (Latest)' : ''}`,
          value: versionAsString,
        };
      })
    );
  }

  return (
    <AsyncResourceSelect<EbirdTaxonomyVersion>
      {...props}
      hasQueried={hasQueried()}
      id="version"
      label="Taxonomy Version"
      onLoad={onLoad}
      onLoadMoreClick={getTaxonomyVersions}
      options={taxonomyVersionOptions}
      resourcePlural="versions"
    />
  );
}
