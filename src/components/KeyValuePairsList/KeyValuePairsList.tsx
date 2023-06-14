interface Props {
  keyValuePairs: KeyValueTuple[];
}

export type KeyValueTuple = [string, boolean | number | string];

export function KeyValuePairsList({ keyValuePairs }: Props) {
  function List() {
    const listItems = keyValuePairs.map(([key, value]) => {
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
