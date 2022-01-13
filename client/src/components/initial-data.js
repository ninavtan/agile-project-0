const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
    'task-5': { id: 'task-5', content: 'Brush teeth' },
    'task-6': { id: 'task-6', content: 'Shower' },
    'task-7': { id: 'task-7', content: 'Find Wallet' },
    'task-8': { id: 'task-8', content: 'Take out the garbage' },
    'task-9': { id: 'task-9', content: 'Watch my favorite show' },
    'task-10': { id: 'task-10', content: 'Charge my phone' },
    'task-11': { id: 'task-11', content: 'Cook dinner' },
    'task-12': { id: 'task-12', content: 'Brush teeth' },
    'task-13': { id: 'task-13', content: 'Shower' },
    'task-14': { id: 'task-14', content: 'Find Wallet' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Working on it',
      taskIds: ['task-5', 'task-6'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-7'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Great',
      taskIds: ['task-13', 'task-10', 'task-8', 'task-9'],
    },
    'column-5': {
      id: 'column-5',
      title: 'OK',
      taskIds: ['task-12', 'task-14'],
    },
    'column-6': {
      id: 'column-6',
      title: 'Baaaad',
      taskIds: ['task-11'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: [ 'column-1', 'column-2', 'column-3','column-4', 'column-5', 'column-6'],
 };
 
 export default initialData;