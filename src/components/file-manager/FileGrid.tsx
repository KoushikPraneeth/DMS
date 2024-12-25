import { File, Folder } from 'lucide-react';
import { formatFileSize, formatDate } from '@/lib/utils';
import { FileItem } from '@/types/files';

interface FileGridProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  selectedFiles: FileItem[];
}

export default function FileGrid({ files, onFileSelect, selectedFiles }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => onFileSelect(file)}
          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
            selectedFiles.includes(file)
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center space-x-3">
            {file.type === 'folder' ? (
              <Folder className="h-8 w-8 text-primary-500" />
            ) : (
              <File className="h-8 w-8 text-gray-500" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(file.size)} • {formatDate(file.modifiedAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}