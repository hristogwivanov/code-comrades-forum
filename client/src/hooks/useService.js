import { useMemo } from 'react';

export const useService = (serviceFactory) => {
    // Memoize the service so it doesn't get recreated unnecessarily
    const service = useMemo(() => serviceFactory(), [serviceFactory]);

    return service;
};
