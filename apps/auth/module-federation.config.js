module.exports = {
  name: 'auth',
  exposes: {
    './Module': './apps/auth/src/app/app.routes.ts',
  },
};
