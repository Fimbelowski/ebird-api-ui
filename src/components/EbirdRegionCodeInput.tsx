import { TextInput, type TextInputProps } from './TextInput';

type Props = Omit<TextInputProps, 'id' | 'label' | 'required'> & {
  allowCountry?: boolean;
  allowLocation?: boolean;
  allowMajorRegion?: boolean;
  allowSubnational1?: boolean;
  allowSubnational2?: boolean;
  allowUsfws?: boolean;
};

export default function EbirdRegionCodeInput({
  allowCountry = false,
  allowLocation = false,
  allowMajorRegion = false,
  allowSubnational1 = false,
  allowSubnational2 = false,
  allowUsfws = false,
  ...rest
}: Props) {
  function label() {
    const locationTypes: string[] = [];

    if (allowMajorRegion) {
      locationTypes.push('Major Region');
    }

    if (allowCountry) {
      locationTypes.push('Country');
    }

    if (allowSubnational1) {
      locationTypes.push('Subnational 1');
    }

    if (allowSubnational2) {
      locationTypes.push('Subnational 2');
    }

    if (allowUsfws) {
      locationTypes.push('USFWS');
    }

    if (allowLocation) {
      locationTypes.push('Location');
    }

    if (locationTypes.length === 1) {
      return `Region Code (${locationTypes[0]} Code)`;
    }

    return `Region Code (${locationTypes
      .slice(0, locationTypes.length - 1)
      .join(', ')}, or ${locationTypes[locationTypes.length - 1]} Code)`;
  }

  function pattern() {
    const regexSources: string[] = [];

    if (allowCountry) {
      regexSources.push('^[A-Z]{2}$');
    }

    if (allowLocation) {
      regexSources.push('^L(?:\\d{1,3}|\\d{5,8})$');
    }

    if (allowMajorRegion) {
      regexSources.push(
        '^(?:aba|abac|af|ao|aou|as|au|aut|ca|caribbean|eh|es|eu|io|lower48|na|po|sa|saf|sp|wh|world|wp)$'
      );
    }

    if (allowSubnational1) {
      regexSources.push('^[A-Z]{2}-(?:[A-Z]{2,3}|\\d{2})$');
    }

    if (allowSubnational2) {
      regexSources.push(
        '^[A-Z]{2}-(?:[A-Z]{2,3}|\\d{2})-(?:[A-Z]{2,3}|\\d{3})$'
      );
    }

    if (allowUsfws) {
      regexSources.push('^USFWS_\\d{1,3}$');
    }

    return regexSources.map((regexSource) => `(?:${regexSource})`).join('|');
  }

  return (
    <TextInput
      {...rest}
      id="region-code"
      label={label()}
      pattern={pattern()}
      required
    />
  );
}
