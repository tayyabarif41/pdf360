const segments = [
  'Employee Banking',
  'Affluent Banking',
  'Private Banking',
  'Large Corporate',
  'Institutional Banking',
  'MSME',
  'Riyad Capital',
];

const statuses = ['Completed', 'Pending', 'Failed', 'In Progress'];
const names = [
  'John Doe',
  'Jane Smith',
  'Bob Johnson',
  'Alice Brown',
  'Charlie Green',
  'David Miller',
  'Emma Wilson',
];

export const createDummyRecords = () =>
  Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    name: `${names[index % names.length]} ${index + 1}`,
    email: `user${index + 1}@example.com`,
    segment: segments[index % segments.length],
    status: statuses[index % statuses.length],
    amount: `$${((index * 47) % 900) + 100}`,
  }));
