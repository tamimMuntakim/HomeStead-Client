import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';

const useAgentOffers = () => {
    const axiosInstance = useAxios();
    const { user } = useAuth();

    const query = useQuery({
        queryKey: ['agent-offers', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosInstance.get(`/offers-by-agent?agentEmail=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    return query;
};

export default useAgentOffers;
