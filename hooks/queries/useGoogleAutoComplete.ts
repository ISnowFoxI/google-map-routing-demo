import { getGoogleAutoComplete } from '@/api/google/queries';
import { queryKeys } from '@/utils/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

const useGoogleAutoComplete = (searchText: string, enabled: boolean) => {
  const debouncedSearchText = useDebounce(searchText, 500);
  return useQuery({
    queryKey: [queryKeys.googleAutoComplete, debouncedSearchText],
    queryFn: () => getGoogleAutoComplete(debouncedSearchText),
    staleTime: Infinity,
    enabled: !!debouncedSearchText && enabled,
  });
};

export { useGoogleAutoComplete };
