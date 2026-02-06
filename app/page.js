import Link from 'next/link';
import db from '@/lib/db';

export default async function HomePage() {
  // Obtenemos todas las recetas para mostrarlas en la página principal
  const [recetas] = await db.query('SELECT * FROM recetas ORDER BY fecha_creacion DESC');

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            🍳 Recetas de Cocina
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Descubre deliciosas recetas para todos los gustos. Crea, comparte y disfruta de la cocina.
          </p>
          <Link
            href="/recetas/nueva"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <span className="mr-2">✨</span>
            Crear Nueva Receta
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recetas.map((receta) => (
            <div
              key={receta.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2"
            >
              {receta.imagen_url && (
                <div className="relative overflow-hidden">
                  <img
                    src={receta.imagen_url}
                    alt={receta.titulo}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-200">
                  {receta.titulo}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {receta.descripcion_corta}
                </p>
                <Link
                  href={`/recetas/${receta.id}`}
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium group-hover:translate-x-1 transition-all duration-200"
                >
                  Ver Receta Completa
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {recetas.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No hay recetas aún</h3>
            <p className="text-gray-500 mb-6">¡Sé el primero en compartir una deliciosa receta!</p>
            <Link
              href="/recetas/nueva"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Crear Primera Receta
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
