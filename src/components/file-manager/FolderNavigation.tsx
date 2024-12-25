import { ChevronRight, FolderIcon } from 'lucide-react';
import { useState } from 'react';

interface Folder {
  id: string;
  name: string;
  children?: Folder[];
}

interface FolderNavigationProps {
  folders: Folder[];
  currentPath: string[];
  onNavigate: (path: string[]) => void;
}

export default function FolderNavigation({ folders, currentPath, onNavigate }: FolderNavigationProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleFolder = (folderId: string) => {
    setExpanded((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const renderFolder = (folder: Folder, depth = 0) => (
    <div key={folder.id} style={{ paddingLeft: `${depth * 1.5}rem` }}>
      <button
        onClick={() => toggleFolder(folder.id)}
        className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        <ChevronRight
          className={`h-4 w-4 transition-transform ${
            expanded.includes(folder.id) ? 'rotate-90' : ''
          }`}
        />
        <FolderIcon className="h-4 w-4 text-primary-500" />
        <span className="text-sm">{folder.name}</span>
      </button>
      {expanded.includes(folder.id) && folder.children?.map((child) => renderFolder(child, depth + 1))}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 p-4 border-b dark:border-gray-700">
        {currentPath.map((folder, index) => (
          <div key={folder} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            <button
              onClick={() => onNavigate(currentPath.slice(0, index + 1))}
              className="text-sm hover:text-primary-500"
            >
              {folder}
            </button>
          </div>
        ))}
      </div>
      <div className="p-4">{folders.map((folder) => renderFolder(folder))}</div>
    </div>
  );
}