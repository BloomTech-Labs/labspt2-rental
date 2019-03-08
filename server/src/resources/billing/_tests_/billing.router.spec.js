import router from '../billing.router';

describe('billing router', () => {
    test('has crud routes', () => {
        const routes = [
            { path: '/', method: 'get'},
            { path: '/:id', method: 'get'}
        ];

        routes.forEach(route => {
            const match = router.stack.find(
                item => item.route.path === route.path && item.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});