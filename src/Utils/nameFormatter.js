export default function nameFormatter(name) {
  if (name.length < 20) return name;

  const initial = name.slice(0, 10);

  const extension = name.split(".")[1];
  if (extension) {
    return initial + "...." + extension;
  }
  return initial;
}
