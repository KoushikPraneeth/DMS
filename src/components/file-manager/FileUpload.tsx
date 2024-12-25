import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import Button from '../ui/button';
import { uploadFile } from '@/services/files';

export default function FileUpload() {
  const [uploads, setUploads] = useState<{ file: File; progress: number; error?: string }[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newUploads = acceptedFiles.map((file) => ({ file, progress: 0 }));
    setUploads((prev) => [...prev, ...newUploads]);

    for (const upload of newUploads) {
      try {
        await uploadFile(upload.file, (progress) => {
          setUploads((prev) =>
            prev.map((u) =>
              u.file === upload.file ? { ...u, progress } : u
            )
          );
        });
      } catch (error) {
        setUploads((prev) =>
          prev.map((u) =>
            u.file === upload.file ? { ...u, error: 'Upload failed' } : u
          )
        );
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-700'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Drag & drop files here, or click to select files
        </p>
      </div>

      {uploads.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploads.map(({ file, progress, error }) => (
            <div key={file.name} className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">{file.name}</span>
                <span className="text-gray-500 dark:text-gray-400">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full ${
                    error ? 'bg-red-500' : 'bg-primary-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}