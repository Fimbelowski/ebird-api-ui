export default interface ApiKeyContext {
  apiKey: string;
  required: boolean;
  setApiKey: (newValue: string) => void;
  setRequired: (newValue: boolean) => void;
}
