// Sample mock data
export const mockFiles = [
  {
    id: '1',
    name: 'Project Proposal.pdf',
    type: 'file',
    size: 1024576, // 1MB
    modifiedAt: new Date().toISOString(),
    path: ['Home', 'Documents']
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    size: 0,
    modifiedAt: new Date().toISOString(),
    path: ['Home']
  },
  {
    id: '3',
    name: 'Meeting Notes.docx',
    type: 'file',
    size: 512000, // 500KB
    modifiedAt: new Date().toISOString(),
    path: ['Home', 'Documents']
  }
];