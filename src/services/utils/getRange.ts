interface RangeProps {
  from: number;
  to: number;
  step: number;
  exclude?: number[];
}

export const getRange = ({ from, to, step = 1, exclude }: RangeProps) => {
  const range = [];

  while (from <= to) {
    if (!exclude?.includes(from)) {
      range.push(from);
    }
    from += step;
  }
  return range;
};
