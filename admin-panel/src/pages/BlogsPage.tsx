import React from 'react';
import { PenTool, Plus } from 'lucide-react';

export const BlogsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage your blog posts
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-white shadow rounded-lg p-12">
        <div className="text-center">
          <PenTool className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start writing your first blog post.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Blog Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};