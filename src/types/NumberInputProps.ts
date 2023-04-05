import { type BaseInputProps } from '../components/BaseInput';

export default interface NumberInputProps extends BaseInputProps {
  hideStepper?: boolean;
  noScroll?: boolean;
  max?: number;
  min?: number;
  step?: number | 'any';
}
