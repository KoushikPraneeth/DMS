import { api } from '@/lib/api';
import { FileItem } from '@/types/files';

export interface FileUploadResponse {
  id: string;
  name: string;
  url: string;
}

export interface FileListParams {
  path?: string[];
  search?: string;
  sort?: 'name' | 'date' | 'size';
  order?: 'asc' | 'desc';
}

export const filesApi = {
  upload: async (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post<FileUploadResponse>('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return data;
  },

  list: async (params: FileListParams = {}) => {
    const { data } = await api.get<FileItem[]>('/files', { params });
    return data;
  },

  download: async (fileId: string) => {
    const { data } = await api.get(`/files/${fileId}/download`, {
      responseType: 'blob',
    });
    return data;
  },

  delete: async (fileIds: string[]) => {
    await api.delete('/files', { data: { fileIds } });
  },
};