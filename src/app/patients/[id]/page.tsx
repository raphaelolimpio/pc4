// src/app/patients/[id]/page.tsx
import PatientDetailPage from "./ClientePAge"; // O seu componente original

// ISSO DEVE FICAR AQUI (Server Side)
export async function generateStaticParams() {
  return [{ id: '1' }, { id: 'demo' }];
}

export default function Page() {
  return <PatientDetailPage />;
}