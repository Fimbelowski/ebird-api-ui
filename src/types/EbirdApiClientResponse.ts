type EbirdApiClientResponse<T> = Promise<{
  parsedResponse: T;
  rawResponse: string;
}>;

export default EbirdApiClientResponse;
