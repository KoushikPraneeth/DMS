import { useState } from 'react';
import { Search } from 'lucide-react';
import FileGrid from '@/components/file-manager/FileGrid';
import FileUpload from '@/components/file-manager/FileUpload';
import FolderNavigation from '@/components/file-manager/FolderNavigation';
import FileActions from '@/components/file-manager/FileActions';
import { useFiles, useFileDelete } from '@/hooks/queries/useFiles';
import { FileItem } from '@/types/files';

export default function FileManager() {
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: files = [], isLoading } = useFiles({
    path: currentPath,
    search: searchQuery,
  });

  const deleteFiles = useFileDelete();

  const handleFileSelect = (file: FileItem) => {
    setSelectedFiles((prev) =>
      prev.includes(file)
        ? prev.filter((f) => f !== file)
        : [...prev, file]
    );
  };

  const handleActionComplete = () => {
    setSelectedFiles([]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r dark:border-gray-700 overflow-y-auto">
        <FolderNavigation
          folders={[]} // Add your folder structure here
          currentPath={currentPath}
          onNavigate={setCurrentPath}
        />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <FileActions
              selectedFiles={selectedFiles}
              onActionComplete={handleActionComplete}
            />
          </div>
          <FileUpload />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
            </div>
          ) : (
            <FileGrid
              files={files}
              selectedFiles={selectedFiles}
              onFileSelect={handleFileSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}