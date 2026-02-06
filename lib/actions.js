'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ACCIÓN PARA CREAR UNA RECETA
export async function createRecipe(formData) {
  const titulo = formData.get('titulo');
  const descripcion_corta = formData.get('descripcion_corta');
  const ingredientes = formData.get('ingredientes');
  const instrucciones = formData.get('instrucciones');
  const tiempo_coccion = formData.get('tiempo_coccion');
  const imagen_url = formData.get('imagen_url');

  const [result] = await db.query(
    'INSERT INTO recetas (titulo, descripcion_corta, ingredientes, instrucciones, tiempo_coccion, imagen_url) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, descripcion_corta, ingredientes, instrucciones, tiempo_coccion, imagen_url]
  );
  
  // Revalidamos la cache de la página principal para que se vea la nueva receta
  revalidatePath('/');
  // Redirigimos al usuario a la página de la receta recién creada
  redirect(`/recetas/${result.insertId}`);
}

// ACCIÓN PARA ACTUALIZAR UNA RECETA
export async function updateRecipe(id, formData) {
  const titulo = formData.get('titulo');
  const descripcion_corta = formData.get('descripcion_corta');
  const ingredientes = formData.get('ingredientes');
  const instrucciones = formData.get('instrucciones');
  const tiempo_coccion = formData.get('tiempo_coccion');
  const imagen_url = formData.get('imagen_url');

  await db.query(
    'UPDATE recetas SET titulo = ?, descripcion_corta = ?, ingredientes = ?, instrucciones = ?, tiempo_coccion = ?, imagen_url = ? WHERE id = ?',
    [titulo, descripcion_corta, ingredientes, instrucciones, tiempo_coccion, imagen_url, id]
  );
  
  // Revalidamos la cache de la página de detalle y de la principal
  revalidatePath(`/recetas/${id}`);
  revalidatePath('/');
  // Redirigimos al detalle
  redirect(`/recetas/${id}`);
}

// ACCIÓN PARA BORRAR UNA RECETA
export async function deleteRecipe(id) {
  await db.query('DELETE FROM recetas WHERE id = ?', [id]);

  // Revalidamos la página principal y redirigimos allí
  revalidatePath('/');
  redirect('/');
}

// ACCIÓN PARA AÑADIR UN COMENTARIO
export async function addComment(formData) {
  const receta_id = formData.get('receta_id');
  const autor = formData.get('autor');
  const texto = formData.get('texto');

  if (!autor || !texto) {
    // Manejo de error simple
    return;
  }

  await db.query(
    'INSERT INTO comentarios (receta_id, autor, texto) VALUES (?, ?, ?)',
    [receta_id, autor, texto]
  );

  // Revalidamos la página de la receta para que el nuevo comentario aparezca
  revalidatePath(`/recetas/${receta_id}`);
}
