import { Download, Trash2 } from 'lucide-react';
import Button from '../ui/button';
import { useState } from 'react';
import { FileItem } from '@/types/files';
import { downloadFile, deleteFiles } from '@/services/files';

interface FileActionsProps {
  selectedFiles: FileItem[];
  onActionComplete: () => void;
}

export default function FileActions({ selectedFiles, onActionComplete }: FileActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDownload = async () => {
    for (const file of selectedFiles) {
      await downloadFile(file.id);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFiles(selectedFiles.map((f) => f.id));
      setShowDeleteModal(false);
      onActionComplete();
    } catch (error) {
      console.error('Failed to delete files:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button
          variant="secondary"
          onClick={handleDownload}
          disabled={selectedFiles.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button
          variant="secondary"
          onClick={() => setShowDeleteModal(true)}
          disabled={selectedFiles.length === 0}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete {selectedFiles.length} selected {selectedFiles.length === 1 ? 'file' : 'files'}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}