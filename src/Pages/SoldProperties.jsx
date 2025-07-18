import React from 'react';
import useAgentOffers from '../Hooks/useAgentOffers';
import { SiCashapp } from "react-icons/si";

const SoldProperties = () => {
    const { data: offers = [], isLoading, isError } = useAgentOffers();

    const soldOffers = offers.filter(offer => offer.status === 'bought');

    const totalSoldAmount = soldOffers.reduce((sum, offer) => sum + (offer.offerAmount || 0), 0);

    if (isLoading) {
        return <div className="text-center py-10 font-semibold">Loading sold properties...</div>;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500 font-semibold">Failed to load data.</div>;
    }

    if (!soldOffers.length) {
        return <div className="text-center py-10 text-gray-500 font-semibold">No sold properties found.</div>;
    }

    return (
        <div className="overflow-x-auto w-full md:w-11/12 container mx-auto rounded-md bg-white mt-6 p-6">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary md:mt-4">Sold Properties</h2>

            <table className="table w-full text-center">
                <thead className="bg-base-200">
                    <tr>
                        <th>Property Title</th>
                        <th>Location</th>
                        <th>Buyer Name</th>
                        <th>Buyer Email</th>
                        <th>Sold Price ($)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {soldOffers.map((offer) => (
                        <tr key={offer._id}>
                            <td>{offer.propertyTitle}</td>
                            <td>{offer.propertyLocation}</td>
                            <td>{offer.buyerName}</td>
                            <td>{offer.buyerEmail}</td>
                            <td>
                                {typeof offer.offerAmount === 'number'
                                    ? offer.offerAmount.toLocaleString()
                                    : 'N/A'}
                            </td>
                            <td>
                                <span className="badge bg-blue-600 text-white px-2 py-1 text-xs shadow">
                                    <SiCashapp /> Sold
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="bg-green-100 border border-green-400 text-green-800 px-2 md:px-4 py-1 rounded mt-6 shadow text-right">
                <p className="text-lg font-semibold">
                    Total Sold Amount: ${totalSoldAmount.toLocaleString()}
                </p>
            </div>

        </div>
    );
};

export default SoldProperties;
