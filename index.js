const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const app = express();
const { config } = require('./config');
const port = config.port;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error-handler');
const NotFound = require('./middlewares/404-handler');

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use(NotFound);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
