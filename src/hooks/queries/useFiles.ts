import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { filesApi, FileListParams } from '@/services/api/files';

export const fileKeys = {
  all: ['files'] as const,
  list: (params: FileListParams) => [...fileKeys.all, 'list', params] as const,
  detail: (id: string) => [...fileKeys.all, 'detail', id] as const,
};

export function useFiles(params: FileListParams = {}) {
  return useQuery({
    queryKey: fileKeys.list(params),
    queryFn: () => filesApi.list(params),
  });
}

export function useFileUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { file: File; onProgress?: (progress: number) => void }) =>
      filesApi.upload(args.file, args.onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys.all });
    },
  });
}

export function useFileDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: filesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys.all });
    },
  });
}