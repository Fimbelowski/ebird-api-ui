export default function classNames(
  classes: Array<string | Record<string, boolean>>
) {
  return classes
    .filter((item) => {
      if (typeof item === 'string') {
        return true;
      }

      const conditional = Object.values(item)[0];

      return conditional;
    })
    .map((item) => {
      if (typeof item === 'string') {
        return item;
      }

      return Object.keys(item)[0];
    })
    .join(' ');
}
