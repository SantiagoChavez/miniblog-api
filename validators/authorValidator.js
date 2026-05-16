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

  // Límites razonables para evitar errores en DB
  const clean = {
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 150),
    bio: (bio || '').toString().slice(0, 1000)
  };

  return clean;
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

  const clean = {
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 150),
    bio: (bio || '').toString().slice(0, 1000)
  };

  return clean;
};

module.exports = {
  validateNewAuthor,
  validateUpdateAuthor
};
