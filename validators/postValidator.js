// Validar datos para crear post
const validateNewPost = (data) => {
  const { title, content, author_id, published } = data;

  if (!title || !content || !author_id) {
    throw {
      statusCode: 400,
      message: 'Título, contenido y author_id son requeridos'
    };
  }

  if (typeof title !== 'string' || title.trim() === '') {
    throw {
      statusCode: 400,
      message: 'El título debe ser un texto válido'
    };
  }

  if (typeof content !== 'string' || content.trim() === '') {
    throw {
      statusCode: 400,
      message: 'El contenido debe ser un texto válido'
    };
  }

  // author_id puede venir como texto desde formularios, intentar parsearlo
  const parsedAuthorId = Number(author_id);
  if (!Number.isInteger(parsedAuthorId) || parsedAuthorId <= 0) {
    throw {
      statusCode: 400,
      message: 'El author_id debe ser un número válido'
    };
  }

  // Aplicar límites para evitar errores de columna en la BD
  const clean = {
    title: title.trim().slice(0, 255),
    content: content.toString().slice(0, 5000),
    author_id: parsedAuthorId,
    published: Boolean(published)
  };

  return clean;
};

// Validar datos para actualizar post
const validateUpdatePost = (data) => {
  const { title, content, published } = data;

  if (!title || !content) {
    throw {
      statusCode: 400,
      message: 'Título y contenido son requeridos'
    };
  }

  if (typeof title !== 'string' || title.trim() === '') {
    throw {
      statusCode: 400,
      message: 'El título debe ser un texto válido'
    };
  }

  if (typeof content !== 'string' || content.trim() === '') {
    throw {
      statusCode: 400,
      message: 'El contenido debe ser un texto válido'
    };
  }

  return { title, content, published };
};

module.exports = {
  validateNewPost,
  validateUpdatePost
};
