import { TextInput, type TextInputProps } from './TextInput';

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

interface AllowLocationTypeProps {
  allowCountry?: boolean;
  allowLocation?: boolean;
  allowMajorRegion?: boolean;
  allowSubnational1?: boolean;
  allowSubnational2?: boolean;
  allowUsfws?: boolean;
  allowWorld?: boolean;
}

type Props = Omit<TextInputProps, 'id' | 'label' | 'placeholder' | 'required'> &
  RequireAtLeastOne<AllowLocationTypeProps>;

export default function EbirdRegionCodeInput({
  allowCountry = false,
  allowLocation = false,
  allowMajorRegion = false,
  allowSubnational1 = false,
  allowSubnational2 = false,
  allowUsfws = false,
  allowWorld = false,
  ...rest
}: Props) {
  function label() {
    const locationTypes: string[] = [];

    if (allowWorld) {
      locationTypes.push('"world"');
    }

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
      if (locationTypes[0] === '"world"') {
        return `Region Code (${locationTypes[0]})`;
      }

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

    if (allowWorld) {
      regexSources.push('^world$');
    }

    return regexSources.map((regexSource) => `(?:${regexSource})`).join('|');
  }

  function placeholder() {
    const placeholders: string[] = [];

    if (allowCountry) {
      placeholders.push('US');
    }

    if (allowLocation) {
      placeholders.push('L1379126');
    }

    if (allowMajorRegion) {
      placeholders.push('AQ');
    }

    if (allowSubnational1) {
      placeholders.push('ES-GA');
    }

    if (allowSubnational2) {
      placeholders.push('US-HI-007');
    }

    if (allowUsfws) {
      placeholders.push('USFWS_614');
    }

    if (allowWorld) {
      placeholders.push('world');
    }

    const randomIndex = Math.floor(Math.random() * placeholders.length);

    return placeholders[randomIndex];
  }

  return (
    <TextInput
      {...rest}
      id="region-code"
      label={label()}
      pattern={pattern()}
      placeholder={placeholder()}
      required
    />
  );
}
