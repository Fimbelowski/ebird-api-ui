interface EbirdBounds {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

export default interface EbirdRegionInfo {
  bounds: EbirdBounds;
  result: string;
}
