// src/components/FaqCard.jsx
import React from 'react';

const FaqCard = ({ faq, index }) => { // Receive index prop
    return (
        // Use a unique name for each radio group based on the index
        <div className="collapse collapse-arrow join-item border-base-300 border-b-2 last:border-b-0 bg-white">
            <input type="radio" name="my-accordion" /> {/* Unique name for each radio group */}
            <div className="collapse-title font-semibold text-gray-800 md:text-lg py-2 md:py-4 pr-10"> {/* Adjusted padding */}
                {faq.question}
            </div>
            <div className="collapse-content text-gray-700 text-sm md:text-base pb-4"> {/* Adjusted padding */}
                {faq.answer}
            </div>
        </div>
    );
};

export default FaqCard;