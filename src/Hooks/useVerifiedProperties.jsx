import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';

const useVerifiedProperties = (limit = null) => {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ['verified-properties', limit],
        queryFn: async () => {
            const url = limit ? `/properties/verified?limit=${limit}` : '/properties/verified';
            const res = await axiosInstance.get(url);
            return res.data;
        }
    });
};

export default useVerifiedProperties;
