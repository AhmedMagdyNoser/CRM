import { useEffect } from "react";

function CompanyInfo() {
  useEffect(() => {
    document.title = 'Company Info';
    return () => (document.title = 'Pro Sales');
  }, []);

  return (
    <section>
      <h1>Company</h1>
    </section>
  );
}

export default CompanyInfo;
