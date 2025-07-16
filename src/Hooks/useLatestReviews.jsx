import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useLatestReviews = () => {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ['latest-reviews'],
        queryFn: async () => {
            const res = await axiosInstance.get('/all-reviews');
            return res.data;
        },
    });
};

export default useLatestReviews;