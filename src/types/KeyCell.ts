export default interface KeyCell<T> {
  key: keyof T;
  type: 'key';
}
