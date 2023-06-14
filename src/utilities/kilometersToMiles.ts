export default function kmToMi(distanceKm: number) {
  const KM_TO_MI_COEFFICIENT = 0.62137119;

  return distanceKm * KM_TO_MI_COEFFICIENT;
}
