import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useUrlParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const route = useRouter();
  const urlSearchParams = new URLSearchParams(searchParams);

  function setUrlSearchParams(key: string, values: string[]) {
    urlSearchParams.delete(key);

    values.forEach((value) => urlSearchParams.append(key, value));
    route.replace(`${pathname}?${urlSearchParams}`, { scroll: false });
  }

  function clearUrlSearchParams(keys: string[]) {
    keys.forEach((key) => urlSearchParams.delete(key));
    route.replace(`${pathname}?${urlSearchParams}`, { scroll: false });
  }

  return { setUrlSearchParams, clearUrlSearchParams };
}
