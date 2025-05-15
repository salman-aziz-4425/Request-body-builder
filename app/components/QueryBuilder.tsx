import React from 'react'
import PropertyField from './PropertyField';

function QueryBuilder({properties, setProperties, handleAddProperty}: {properties: any[], setProperties: any, handleAddProperty: any}) {
  return (
    <div>
           {properties.map((property, index) => (
            <div key={index} className="border-b last:border-b-0">
              <PropertyField 
                property={property} 
                onPropertyChange={(updatedProperty) => {
                  const newProperties = [...properties];
                  newProperties[index] = updatedProperty;
                  setProperties(newProperties);
                }}
                onDelete={() => {
                  setProperties(properties.filter((_, i) => i !== index));
                }}
              />
            </div>
          ))}
          
          <div className="p-4">
            <button
              onClick={handleAddProperty}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Property
            </button>
          </div>
    </div>
  )
}

export default QueryBuilder
