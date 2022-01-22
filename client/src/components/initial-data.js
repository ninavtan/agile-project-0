const initialData = {
  cards: {
    'card-1': { id: 'card-1', title: 'Take out the garbage' },
    'card-2': { id: 'card-2', title: 'Watch my favorite show' },
    'card-3': { id: 'card-3', title: 'Charge my phone' },
    'card-4': { id: 'card-4', title: 'Cook dinner' },
    'card-5': { id: 'card-5', title: 'Brush teeth' },
    'card-6': { id: 'card-6', title: 'Shower' },
    'card-7': { id: 'card-7', title: 'Find Wallet' },
    'card-8': { id: 'card-8', title: 'Take out the garbage' },
    'card-9': { id: 'card-9', title: 'Watch my favorite show' },
    'card-10': { id: 'card-10', title: 'Charge my phone' },
    'card-11': { id: 'card-11', title: 'Cook dinner' },
    'card-12': { id: 'card-12', title: 'Brush teeth' },
    'card-13': { id: 'card-13', title: 'Shower' },
    'card-14': { id: 'card-14', title: 'Find Wallet' },
  },
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'To do',
      cardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
    },
    'list-2': {
      id: 'list-2',
      title: 'Working on it',
      cardIds: ['card-5', 'card-6'],
    },
    'list-3': {
      id: 'list-3',
      title: 'Done',
      cardIds: [],
    },
    'list-4': {
      id: 'list-4',
      title: 'Great',
      cardIds: ['card-13', 'card-10', 'card-8', 'card-9'],
    },
    'list-5': {
      id: 'list-5',
      title: 'OK',
      cardIds: ['card-12', 'card-14'],
    },
    'list-6': {
      id: 'list-6',
      title: 'Baaaad',
      cardIds: ['card-11'],
    },
  },
  // Facilitate reordering of the lists
  listOrder: [ 'list-1', 'list-2', 'list-3','list-4', 'list-5', 'list-6'],
 };
 
 export default initialData;