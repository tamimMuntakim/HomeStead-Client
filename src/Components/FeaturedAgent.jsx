import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import { MdRealEstateAgent } from "react-icons/md";

const FeaturedAgents = () => {
    const axiosInstance = useAxios();

    const { data: agents = [], isLoading, isError } = useQuery({
        queryKey: ['featured-agents'],
        queryFn: async () => {
            const res = await axiosInstance.get('/agents');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-10">Loading agents...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load agents.</p>;

    return (
        <section className="py-10 bg-primary">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-6 flex items-center justify-center">
                Our Featured Agents <MdRealEstateAgent className='hidden md:inline ml-1 md:ml-2'/>
            </h2>
            <div className="flex flex-wrap gap-6 px-4 justify-center items-center">
                {agents.map(agent => (
                    <div key={agent._id} className="card p-4 shadow-md rounded-lg text-center bg-base-100  hover:shadow-xl transition">
                        <img
                            src="https://i.ibb.co.com/bg9g8j3H/agent.png"
                            alt={agent.userDisplayName}
                            className="w-12 h-12 md:w-20 md:h-20 rounded mx-auto mb-2 object-cover"
                        />
                        <h3 className="text-sm md:text-base font-semibold">{agent.userDisplayName}</h3>
                        <p className="text-xs md:text-sm text-gray-500">{agent.userEmail}</p>
                    </div>
                ))}
            </div>
        </section>

    );
};

export default FeaturedAgents;
