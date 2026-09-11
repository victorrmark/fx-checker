function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function getRange(range: {label: string; value:number}) {
  const to = new Date();

  const from = new Date(to);
  from.setDate(from.getDate() - Number(range.value));
  return { from: isoDate(from), to: isoDate(to) };
}

// export function compareRange() {
//   const to = new Date();

//   const from = new Date(to);
//   from.setDate(from.getDate() - Number(1));
//   return { from: isoDate(from), to: isoDate(to) };
// }
