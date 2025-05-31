import { getRoute } from '@/api/google/services';
import { mutationKeys } from '@/utils/mutationKeys';
import { save, storageKeys } from '@/utils/storage';
import { useMutation } from '@tanstack/react-query';

const useGoogleRoutes = () => {
  return useMutation({
    mutationKey: [mutationKeys.routesApi],
    mutationFn: getRoute,
    onSuccess: response => {
      const data = response?.data?.routes?.[0];
      save(storageKeys.route, data);
    },
  });
};

export { useGoogleRoutes };
