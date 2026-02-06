// Componente para el formulario de Creación y Edición de Recetas.
// Al ser interactivo y manejar estado (potencialmente), lo marcamos como cliente.
'use client';

// Este formulario se puede usar tanto para crear como para editar.
// 'action' será la Server Action a ejecutar.
// 'receta' es la data opcional para pre-rellenar el formulario en modo edición.
export default function RecipeForm({ action, receta }) {
  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">
          🍽️ Título de la Receta
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          defaultValue={receta?.titulo}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          placeholder="Ej: Pasta Carbonara"
        />
      </div>

      <div>
        <label htmlFor="descripcion_corta" className="block text-sm font-semibold text-gray-700 mb-2">
          📝 Descripción Corta
        </label>
        <textarea
          id="descripcion_corta"
          name="descripcion_corta"
          defaultValue={receta?.descripcion_corta}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Una breve descripción de tu receta..."
        />
      </div>

      <div>
        <label htmlFor="imagen_url" className="block text-sm font-semibold text-gray-700 mb-2">
          🖼️ URL de la Imagen
        </label>
        <input
          type="url"
          id="imagen_url"
          name="imagen_url"
          defaultValue={receta?.imagen_url}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div>
        <label htmlFor="ingredientes" className="block text-sm font-semibold text-gray-700 mb-2">
          🥕 Ingredientes
        </label>
        <textarea
          id="ingredientes"
          name="ingredientes"
          defaultValue={receta?.ingredientes}
          rows="6"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
          placeholder="200g de pasta&#10;100g de panceta&#10;2 huevos&#10;50g de queso parmesano&#10;Sal y pimienta"
        />
      </div>

      <div>
        <label htmlFor="instrucciones" className="block text-sm font-semibold text-gray-700 mb-2">
          👨‍🍳 Instrucciones
        </label>
        <textarea
          id="instrucciones"
          name="instrucciones"
          defaultValue={receta?.instrucciones}
          rows="8"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Paso 1: Cocer la pasta...&#10;&#10;Paso 2: Freír la panceta...&#10;&#10;Paso 3: Mezclar los huevos con el queso..."
        />
      </div>

      <div>
        <label htmlFor="tiempo_coccion" className="block text-sm font-semibold text-gray-700 mb-2">
          ⏱️ Tiempo de Cocción
        </label>
        <input
          type="text"
          id="tiempo_coccion"
          name="tiempo_coccion"
          defaultValue={receta?.tiempo_coccion}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          placeholder="Ej: 15 minutos"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          {receta ? '💾 Actualizar Receta' : '🚀 Crear Receta'}
        </button>
      </div>
    </form>
  );
}
