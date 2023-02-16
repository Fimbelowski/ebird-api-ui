import type BaseInputProps from './BaseInputProps';

export default interface NumberInputProps extends BaseInputProps {
  hideStepper?: boolean;
  noScroll?: boolean;
  max?: number;
  min?: number;
  step?: number | 'any';
}
