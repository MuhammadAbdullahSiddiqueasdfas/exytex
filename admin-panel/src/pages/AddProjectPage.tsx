import React from 'react';
import { FolderKanban } from 'lucide-react';

export const AddProjectPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Project</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new project for your portfolio
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-12">
        <div className="text-center">
          <FolderKanban className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Add Project Form</h3>
          <p className="mt-1 text-sm text-gray-500">
            Project creation form will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};