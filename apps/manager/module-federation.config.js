module.exports = {
  name: 'manager',
  exposes: {
    './Module': './apps/manager/src/app/app.routes.ts',
  },
};
