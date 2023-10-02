import {
  AsyncResourceSelect,
  type AsyncResourceSelectProps,
} from './AsyncResourceSelect/AsyncResourceSelect';
import type EbirdTaxonomyVersion from '../types/EbirdTaxonomyVersion';
import { updateTaxonomyVersionOptions } from '../store/slices/taxonomyVersionOptionsSlice';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';
import useTaxonomyVersions from '../services/ebird/hooks/endpoints/ref/taxonomy/useTaxonomyVersions';

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
  const dispatch = useAppDispatch();
  const taxonomyVersionOptions = useAppSelector(
    (state) => state.taxonomyVersionOptions.value
  );

  const getTaxonomyVersions = useTaxonomyVersions();

  function hasQueried() {
    return taxonomyVersionOptions.length > 1;
  }

  function onLoad(versions: EbirdTaxonomyVersion[]) {
    dispatch(
      updateTaxonomyVersionOptions(
        versions.map(({ authorityVer, latest }) => {
          const versionAsString = authorityVer.toString();

          return {
            label: `${versionAsString}${latest ? ' (Latest)' : ''}`,
            value: versionAsString,
          };
        })
      )
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
