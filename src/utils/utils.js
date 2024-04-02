export const applicationName = 'Pro Sales';

export const globalErrorMessage = 'Something went wrong. Please try again later.';

export const roles = {
  manager: 'Manager',
  moderator: 'Marketing Moderator',
  sales: 'Sales Representative',
};

export const layoutDimensions = {
  navbarSize: 75,
  navbarExpanedSize: 200,
  navbarExpandingDuration: 0.25,
  navbarPadding: 20,
  layoutPadding: 24,
  mobileLayoutPadding: 16,
};

export const colorPairs = [
  { bg: '#f1f5fe', text: '#628cee' },
  { bg: '#fff9ee', text: '#9b7127' },
  { bg: '#eefdf3', text: '#1e833f' },
  { bg: '#fdf2f2', text: '#e0464a' },
  { bg: '#f5f5f5', text: '#4a5568' },
];

export const breakboints = {
  sm: '612px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
};

export const trancateText = (text, length) => {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};

export const formatDate = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = ('0' + date.getDate()).slice(-2);
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
};
