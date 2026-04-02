import React from 'react';
import { PenTool } from 'lucide-react';

export const AddBlogPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Blog</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new blog post
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-12">
        <div className="text-center">
          <PenTool className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Add Blog Form</h3>
          <p className="mt-1 text-sm text-gray-500">
            Blog creation form will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};