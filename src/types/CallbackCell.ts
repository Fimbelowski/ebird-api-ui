export default interface CallbackCell<T> {
  callback: (item: T) => string;
  type: 'callback';
}
