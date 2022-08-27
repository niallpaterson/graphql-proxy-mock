import { testServer } from './server';

testServer
	.listen({
		port: 4000,
	})
	.then(() => {
		console.log('Listening on port 4000');
	});

process.on('exit', testServer.stop);
