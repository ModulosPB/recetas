import db from '@/lib/db';
import Link from 'next/link';
import { deleteRecipe, addComment } from '@/lib/actions';

// Esta página es un RSC, obtiene los datos de la receta y sus comentarios.
export default async function RecetaDetallePage({ params }) {
  const { id } = await params;

  // Obtenemos la receta y los comentarios en paralelo para más eficiencia
  const [recetaResult, comentariosResult] = await Promise.all([
    db.query('SELECT * FROM recetas WHERE id = ?', [id]),
    db.query('SELECT * FROM comentarios WHERE receta_id = ? ORDER BY fecha_creacion DESC', [id])
  ]);

  const receta = recetaResult[0][0];
  const comentarios = comentariosResult[0];

  if (!receta) {
    return <div>Receta no encontrada.</div>;
  }

  // Preparamos las acciones con el ID ya vinculado
  const deleteRecipeWithId = deleteRecipe.bind(null, id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
          >
            ← Volver a Recetas
          </Link>
        </nav>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {receta.imagen_url && (
            <div className="relative">
              <img
                src={receta.imagen_url}
                alt={receta.titulo}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{receta.titulo}</h1>
                <p className="text-gray-600 text-lg italic">{receta.descripcion_corta}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/recetas/${id}/editar`}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  ✏️ Editar
                </Link>
                <form action={deleteRecipeWithId}>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    🗑️ Borrar
                  </button>
                </form>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-orange-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3 flex items-center">
                    ⏱️ Tiempo de Cocción
                  </h3>
                  <p className="text-gray-700">{receta.tiempo_coccion}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                    🥕 Ingredientes
                  </h3>
                  <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {receta.ingredientes}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                  👨‍🍳 Instrucciones
                </h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {receta.instrucciones}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Sección de Comentarios */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            💬 Comentarios
          </h2>

          {/* Formulario para añadir comentario */}
          <form action={addComment} className="mb-8 bg-gray-50 rounded-xl p-6">
            <input type="hidden" name="receta_id" value={id} />
            <div className="mb-4">
              <label htmlFor="autor" className="block text-sm font-semibold text-gray-700 mb-2">
                Tu Nombre
              </label>
              <input
                type="text"
                id="autor"
                name="autor"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Ingresa tu nombre..."
              />
            </div>
            <div className="mb-4">
              <label htmlFor="texto" className="block text-sm font-semibold text-gray-700 mb-2">
                Tu Comentario
              </label>
              <textarea
                id="texto"
                name="texto"
                rows="4"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Comparte tus pensamientos sobre esta receta..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              📝 Enviar Comentario
            </button>
          </form>

          {/* Lista de comentarios existentes */}
          <div className="space-y-4">
            {comentarios.map(comentario => (
              <div key={comentario.id} className="bg-gray-50 rounded-xl p-6 border-l-4 border-orange-300">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-gray-800 flex items-center">
                    👤 {comentario.autor}
                  </p>
                  <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                    {new Date(comentario.fecha_creacion).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{comentario.texto}</p>
              </div>
            ))}
            {comentarios.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">💭</div>
                <p className="text-gray-600 text-lg">No hay comentarios todavía.</p>
                <p className="text-gray-500">¡Sé el primero en compartir tu opinión!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
