export default function useQueryParams(url: string | null = null) {
  const paramsObj = new URLSearchParams(url ? url : window.location.search);
  const newObj: { [key: string]: string } = {};
  for (const [key, value] of paramsObj) {
    newObj[key] = value;
  }
  return newObj;
}
