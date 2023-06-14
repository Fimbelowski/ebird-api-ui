interface Props {
  object: Record<string, unknown>;
}

export default function KeyValuePairsList({ object }: Props) {
  function List() {
    const listItems = Object.entries(object).map(([key, value = '']) => {
      if (typeof value === 'object') {
        throw Error(
          'Object value found. Only objects with primitive values can be used.'
        );
      }

      return (
        <div key={key}>
          <dt className="key-value-pairs-list__key">{key}: </dt>
          <dd className="key-value-pairs-list__value">{value.toString()}</dd>
        </div>
      );
    });

    return <dl className="key-value-pairs-list">{listItems}</dl>;
  }

  return <List />;
}
