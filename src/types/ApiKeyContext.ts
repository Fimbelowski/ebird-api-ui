export default interface ApiKeyContext {
  apiKey: string;
  formId: string;
  required: boolean;
  setApiKey: (newValue: string) => void;
  setFormId: (newValue: string) => void;
  setRequired: (newValue: boolean) => void;
}
