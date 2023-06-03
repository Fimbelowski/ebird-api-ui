export default interface EbirdTaxonomicGroup {
  groupName: string;
  groupOrder: number;
  taxonOrderBounds: [[number, number]];
}
