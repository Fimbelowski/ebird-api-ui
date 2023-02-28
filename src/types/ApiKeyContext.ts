export default interface ApiKeyContext {
  apiKey: string;
  setApiKey: (newValue: string) => void;
}
