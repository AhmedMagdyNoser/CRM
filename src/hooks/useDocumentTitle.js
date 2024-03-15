import { useEffect } from 'react';

function useDocumentTitle(title, defaultTitle = 'Pro Sales') {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
}

export default useDocumentTitle;
