import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useUserRole = (email) => {
    const axiosInstance = useAxios();

    const { data: user = {}, isLoading, isError } = useQuery({
        queryKey: ['user-role', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?email=${email}`);
            return res.data;
        },
    });

    return {
        role: user?.role || 'user',
        isLoading,
        isError
    };
};

export default useUserRole;
