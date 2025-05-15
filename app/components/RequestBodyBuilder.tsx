import React, { useState } from 'react'
import PropertyField from './PropertyField';
import QueryBuilder from './QueryBuilder';

interface RequestBodyProperty {
  name: string;
  type: string;
  description?: string;
  required: boolean;
  properties?: RequestBodyProperty[];
}

interface RequestBodyBuilderProps {
  onSchemaChange?: (schema: RequestBodyProperty[]) => void;
}

function RequestBodyBuilder({ onSchemaChange }: RequestBodyBuilderProps) {
  const [properties, setProperties] = useState<RequestBodyProperty[]>([]);

  const handleAddProperty = () => {
    setProperties([...properties, {
      name: `property${properties.length + 1}`,
      type: 'string',
      description: '',
      required: false,
      properties: []
    }]);
  }

  const generateSampleValue = (prop: RequestBodyProperty): any => {
    switch (prop.type) {
      case 'string':
        return prop.description || 'sample_text';
      case 'number':
        return 0;
      case 'boolean':
        return false;
      case 'object':
        if (!prop.properties?.length) return {};
        return prop.properties.reduce((acc, nestedProp) => ({
          ...acc,
          [nestedProp.name]: generateSampleValue(nestedProp)
        }), {});
      case 'array':
        return [];
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Request Body Parameters</h2>
        <div className="w-11 h-6 bg-gray-200 rounded-full relative">
          <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">API Request Body Structure</h3>
          </div>
          <QueryBuilder properties={properties} setProperties={setProperties} handleAddProperty={handleAddProperty}/>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-900">Sample JSON</h4>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Hide Sample JSON
            </button>
          </div>
          <pre className="bg-white text-black p-4 rounded-md overflow-x-auto">
            <code>
              {JSON.stringify(
                properties.reduce((acc, prop) => ({
                  ...acc,
                  [prop.name]: generateSampleValue(prop)
                }), {}),
                null,
                2
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default RequestBodyBuilder;
