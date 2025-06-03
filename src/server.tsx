require('dotenv').config();
const cors = require('cors');

const express = require('express');
const { postgraphile } = require('postgraphile');

const app = express();

// DEBUG: log env value
console.log('DATABASE_URL =', process.env.DATABASE_URL);

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(
  postgraphile(process.env.DATABASE_URL, 'public', {
    watchPg: true,
    graphiql: true,
    appendPlugins: [require('postgraphile-plugin-connection-filter')],
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
