export default function fileSizeFormatter(size) {
  if (size >= 1.024e9 && size <= 1.024e12)
    return `${(size / 1e9).toFixed(1)} GB`;
  if (size >= 1024000 && size <= 1.024e9)
    return `${(size / 1e6).toFixed(1)} MB`;
  if (size <= 1024000) return `${(size / 1000).toFixed(1)} KB`;
}
