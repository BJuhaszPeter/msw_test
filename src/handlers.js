import { rest } from 'msw';

const handlers = [
	rest.get('http://localhost:8080/api/user', (req, res, context) =>
		res(context.status(200), context.json({ username: 'Peter Juhasz' })),
	),
];

export { handlers, rest };
