import { useContext } from 'react';

import useTaxonomyVersions from '../services/ebird/hooks/endpoints/ref/taxonomy/useTaxonomyVersions';
import {
  AsyncResourceSelect,
  type AsyncResourceSelectProps,
} from './AsyncResourceSelect/AsyncResourceSelect';
import type EbirdTaxonomyVersion from '../types/EbirdTaxonomyVersion';
import TaxonomyVersionOptionsContext from '../context/TaxonomyVersionOptionsContext';

type Props = Omit<
  AsyncResourceSelectProps<string>,
  | 'hasQueried'
  | 'id'
  | 'label'
  | 'onLoad'
  | 'onLoadOptionsClick'
  | 'options'
  | 'resourcePlural'
>;

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
      onLoadOptionsClick={getTaxonomyVersions}
      options={taxonomyVersionOptions}
      resourcePlural="versions"
    />
  );
}
