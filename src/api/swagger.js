// swagger.js

const YAML = require('yamljs');
const path = require('path');

/**
 * Load the Swagger documentation from a YAML file.
 * The YAML file includes the OpenAPI version, API information, server details,paths and component schemas.
 * The schemas define the structure of the request and response objects for the API.
 */
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
module.exports = swaggerDocument;
