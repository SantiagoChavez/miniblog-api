// Validar datos para crear o actualizar autor
const validateNewAuthor = (data) => {
  const { name, email, bio } = data;

  if (!name || !email) {
    throw {
      statusCode: 400,
      message: 'Nombre y email son requeridos'
    };
  }

  if (typeof name !== 'string' || name.trim() === '') {
    throw {
      statusCode: 400,
      message: 'El nombre debe ser un texto válido'
    };
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    throw {
      statusCode: 400,
      message: 'El email debe ser válido'
    };
  }

  return { name, email, bio };
};

const validateUpdateAuthor = (data) => {
  const { name, email, bio } = data;

  if (!name || !email) {
    throw {
      statusCode: 400,
      message: 'Nombre y email son requeridos'
    };
  }

  if (typeof name !== 'string' || name.trim() === '') {
    throw {
      statusCode: 400,
      message: 'El nombre debe ser un texto válido'
    };
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    throw {
      statusCode: 400,
      message: 'El email debe ser válido'
    };
  }

  return { name, email, bio };
};

module.exports = {
  validateNewAuthor,
  validateUpdateAuthor
};
