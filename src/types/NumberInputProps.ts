import type CommonInputProps from './CommonInputProps';

export default interface NumberInputProps extends CommonInputProps {
  hideStepper?: boolean;
  noScroll?: boolean;
  max?: number;
  min?: number;
  step?: number | 'any';
}
