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

  function clearAllUrlSearchParams(keys: string[]) {
    keys.forEach((key) => urlSearchParams.delete(key));

    route.replace(`${pathname}?${urlSearchParams}`, { scroll: false });
  }

  function clearOneUrlSeachParams(key: string, value: string) {
    const remainingValues = urlSearchParams
      .getAll(key)
      .filter((currentValue) => currentValue !== value);

    urlSearchParams.delete(key);

    remainingValues.forEach((remainingValue) =>
      urlSearchParams.append(key, remainingValue)
    );

    route.replace(`${pathname}?${urlSearchParams}`, { scroll: false });
  }

  return {
    setUrlSearchParams,
    clearAllUrlSearchParams,
    clearOneUrlSeachParams
  };
}
