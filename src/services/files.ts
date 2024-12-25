import { FileItem } from '@/types/files';
import { mockFiles } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function uploadFile(file: File, onProgress: (progress: number) => void): Promise<void> {
  // Simulate upload progress
  for (let progress = 0; progress <= 100; progress += 10) {
    onProgress(progress);
    await delay(500);
  }
}

export async function downloadFile(fileId: string): Promise<void> {
  await delay(1000);
  console.log(`Downloading file ${fileId}`);
}

export async function deleteFiles(fileIds: string[]): Promise<void> {
  await delay(1000);
  console.log(`Deleting files`, fileIds);
}

export async function getFiles(path: string[] = []): Promise<FileItem[]> {
  await delay(500);
  return mockFiles.filter(file => 
    path.length === 0 || file.path.join('/') === path.join('/')
  );
}