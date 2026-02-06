import RecipeForm from "@/app/components/RecipeForm";
import { createRecipe } from "@/lib/actions";
import Link from "next/link";

export default function NuevaRecetaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
          >
            ← Volver a Recetas
          </Link>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              ✨ Crear Nueva Receta
            </h1>
            <p className="text-gray-600">Comparte tu deliciosa receta con el mundo</p>
          </div>
          <RecipeForm action={createRecipe} />
        </div>
      </div>
    </div>
  );
}
