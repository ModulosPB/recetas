import db from '@/lib/db';
import RecipeForm from '@/app/components/RecipeForm';
import { updateRecipe } from '@/lib/actions';
import Link from 'next/link';

// Esta página es un RSC que obtiene los datos para pre-rellenar el formulario
export default async function EditarRecetaPage({ params }) {
  const { id } = await params;
  const [recetaResult] = await db.query('SELECT * FROM recetas WHERE id = ?', [id]);
  const receta = recetaResult[0];

  if (!receta) {
    return <div>Receta no encontrada.</div>;
  }

  // Usamos .bind para crear una nueva función de acción que ya tiene el 'id'
  // Esto es necesario porque el formulario no puede pasar el 'id' por sí mismo.
  const updateRecipeWithId = updateRecipe.bind(null, id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <nav className="mb-6">
          <Link
            href={`/recetas/${id}`}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
          >
            ← Volver a la Receta
          </Link>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              ✏️ Editar Receta
            </h1>
            <p className="text-gray-600">Actualiza los detalles de tu receta</p>
          </div>
          <RecipeForm action={updateRecipeWithId} receta={receta} />
        </div>
      </div>
    </div>
  );
}
