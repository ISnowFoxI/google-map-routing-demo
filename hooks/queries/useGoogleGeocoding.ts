import { getGooglePlaceDetails } from '@/api/google/queries';
import { queryKeys } from '@/utils/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGoogleGeocoding = (placeId: string, enabled = true) => {
  return useQuery({
    queryKey: [queryKeys.googleGeoCoding, placeId],
    queryFn: () => getGooglePlaceDetails(placeId),
    staleTime: Infinity,
    enabled: enabled && !!placeId,
  });
};

export { useGoogleGeocoding };
