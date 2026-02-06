// Este es el layout principal, podemos añadir estilos globales o una estructura común
import './globals.css';

export const metadata = {
  title: 'Gestor de Recetas',
  description: 'Creado con Next.js y RSC',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
