interface Props<T> {
  object: T;
}

export default function KeyValuePairsList<T extends object>({
  object,
}: Props<T>) {
  function List() {
    const listItems = Object.entries(object).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        throw Error(
          'Object value found. Only objects with primitive values can be used.'
        );
      }

      return (
        <div key={key}>
          <dt className="key-value-pairs-list__key">{key}: </dt>
          <dd className="key-value-pairs-list__value">{value}</dd>
        </div>
      );
    });

    return <dl>{listItems}</dl>;
  }

  return <List />;
}
