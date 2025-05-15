import React from 'react'
import QueryBuilder from './QueryBuilder';

interface PropertyFieldProps {
  property: {
    name: string;
    type: string;
    description?: string;
    required: boolean;
    properties?: PropertyFieldProps['property'][];
  };
  onPropertyChange: (property: PropertyFieldProps['property']) => void;
  onDelete: () => void;
}

function PropertyField({ property, onPropertyChange, onDelete }: PropertyFieldProps) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <label className="block text-sm font-medium text-gray-700">Property Name</label>
          <input
            type="text"
            value={property.name}
            onChange={(e) => onPropertyChange({ ...property, name: e.target.value })}
            className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={property.type}
            onChange={(e) => onPropertyChange({ ...property, type: e.target.value })}
            className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="boolean">boolean</option>
            <option value="object">object</option>
            <option value="array">array</option>
          </select>
        </div>
        <div className="col-span-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            value={property.description || ''}
            onChange={(e) => onPropertyChange({ ...property, description: e.target.value })}
            className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>
        {
            property.type === 'object' && (
                <div className="col-span-12">
                    <label className="block text-sm font-medium text-gray-700">Properties</label>
                    <QueryBuilder 
                      properties={property.properties || []}
                      setProperties={(newProps: PropertyFieldProps['property'][]) => onPropertyChange({ ...property, properties: newProps })}
                      handleAddProperty={() => onPropertyChange({ ...property, properties: [...(property.properties || []), { name: `property${(property.properties || []).length + 1}`, type: 'string', required: false, properties: [] }] })}
                    />
                </div>
            )
        }
        <div className="col-span-1 flex items-end justify-end">
          <button 
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={property.required}
            onChange={(e) => onPropertyChange({ ...property, required: e.target.checked })}
            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          <span className="ml-2 text-sm text-gray-600">Required</span>
        </label>
      </div>
    </div>
  )
}

export default PropertyField
