import { useState } from 'react';

import {
  BasePage,
  type BasePageProps,
  type ResultsSection,
} from './BasePage/BasePage';
import { KeyValuePairsList } from './KeyValuePairsList/KeyValuePairsList';

export type SimpleRecord = Record<string, boolean | number | string>;

type Props<T> = Omit<
  BasePageProps<SimpleRecord>,
  'onLoad' | 'parser' | 'resultsSections'
> & {
  transformer?: (result: T) => SimpleRecord;
};

export function BasePageKeyValuePairsList<T>({
  transformer = (result: T) => result as SimpleRecord,
  ...rest
}: Props<T>) {
  const [simpleRecordResult, setSimpleRecordResult] = useState({});

  const resultsSections: ResultsSection[] = [
    {
      content: (
        <KeyValuePairsList keyValuePairs={Object.entries(simpleRecordResult)} />
      ),
      title: 'Result',
    },
  ];

  function onLoad(result: T) {
    setSimpleRecordResult(transformer(result));
  }

  return (
    <BasePage<T>
      {...rest}
      onLoad={onLoad}
      resultsSections={resultsSections}
    />
  );
}
