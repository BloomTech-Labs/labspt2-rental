import router from '../user.router';

describe('user router', () => {
  test('has requesting user routes', () => {
    const routes = [
      { path: '/me', method: 'get' },
      { path: '/me', method: 'put' }
    ];

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
