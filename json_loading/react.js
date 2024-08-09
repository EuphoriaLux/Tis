import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CruiseInfo = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSection = (title, content, key) => (
    <div className="mb-4">
      <button
        className="flex justify-between items-center w-full bg-blue-100 p-2 rounded"
        onClick={() => toggleSection(key)}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {expandedSections[key] ? <ChevronUp /> : <ChevronDown />}
      </button>
      {expandedSections[key] && (
        <div className="mt-2 p-2 bg-gray-50 rounded">
          {content}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{data.tour.title}</h1>
      
      {renderSection("Tour Details", (
        <div>
          <p><strong>Tour Number:</strong> {data.tour.tourNumber}</p>
          <p><strong>Duration:</strong> {data.tour.daysCount} days</p>
          <p><strong>Countries:</strong> {data.tour.countries.map(c => c.name).join(', ')}</p>
          <p><strong>Categories:</strong> {data.tour.categories.join(', ')}</p>
        </div>
      ), 'details')}

      {renderSection("Description", (
        <div dangerouslySetInnerHTML={{ __html: data.tour.teaser }} />
      ), 'description')}

      {renderSection("Itinerary", (
        <ul>
          {data.tour.days.map((day, index) => (
            <li key={index}>
              <strong>Day {day.interval}:</strong> {day.title}
            </li>
          ))}
        </ul>
      ), 'itinerary')}

      {renderSection("Ship Information", (
        <div>
          <h3 className="font-semibold">{data.tour.ship.title}</h3>
          <p><strong>Capacity:</strong> {data.tour.ship.capacity} passengers</p>
          <p><strong>Crew:</strong> {data.tour.ship.crew} members</p>
          <div dangerouslySetInnerHTML={{ __html: data.tour.ship.description }} />
        </div>
      ), 'ship')}

      {renderSection("Included Services", (
        <div dangerouslySetInnerHTML={{ __html: data.tour.teaser.match(/<h2>IMMER MIT DABEI: UNSER VIVA ALL-INCLUSIVE<\/h2>[\s\S]*?<\/div>/)[0] }} />
      ), 'included')}

      {renderSection("Additional Services", (
        <ul>
          {data.tour.additionalServices.map((service, index) => (
            <li key={index}>
              <strong>{service.title}</strong> - {service.price.amount} {service.price.currency}
            </li>
          ))}
        </ul>
      ), 'additional')}
    </div>
  );
};

export default CruiseInfo;