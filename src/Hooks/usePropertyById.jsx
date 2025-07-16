import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const usePropertyById = (id) => {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ['property', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosInstance.get(`/properties/${id}`);
            return res.data;
        },
    });
};

export default usePropertyById;