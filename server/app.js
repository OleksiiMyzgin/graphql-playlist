const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
mongoose.connect(
	'mongodb://oleksii:test123@ds055397.mlab.com:55397/graphql-playlist-ninja',
	{ useNewUrlParser: true, useUnifiedTopology: true },
);
mongoose.connection.once('open', () => {
	console.log('conneted to database');
});

// bind express with graphql
app.use(
	'/graphql',
	graphqlHTTP({
		// pass in a schema property
		schema,
		graphiql: true,
	}),
);

app.listen(4000, () => {
	console.log('now listening for requests on port 4000');
});
