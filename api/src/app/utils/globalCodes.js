const errorCode = Object.freeze({
  INCONSISTENT_DATA: 'Inconsistency was detected in the data received',
  MISSING_ATTRIBUTES: 'The absence of one or more necessary parameters was detected',
});

const statusCode = Object.freeze({
  OK: 200,
  CREATED: 201,
  EDITED: 204, // Also called no_content
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
});

module.exports = {
  errorCode,
  statusCode,
};
