export default function millions(x) {
  if (x > 1000000000) return `$ ${(x / 1000000000).toFixed(2)}b`;
  if (x > 1000000) return `$ ${(x / 1000000).toFixed(2)}m`;
  if (x > 1000) return `$ ${(x / 1000).toFixed(2)}t`;
  return `$ ${x.toFixed(2)}`;
}
