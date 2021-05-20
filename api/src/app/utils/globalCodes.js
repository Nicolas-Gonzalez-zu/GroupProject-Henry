const errorCode = Object.freeze({
  INCONSISTENT_DATA: 'Inconsistency was detected in the data received',
  MISSING_ATTRIBUTES: 'The absence of one or more necessary parameters was detected',
  UNFINISHED_OPERATION: 'Operation canceled due to one or more actions not completed successfully',
  UNAUTHORIZED_OPERATION: 'Access to this endpoint is restricted',
  REJECTED_OPERATION: 'The data sent couldn`t be read / stored correctly. Operation rejected.',
});

const statusCode = Object.freeze({
  OK: 200,
  CREATED: 201,
  EDITED: 204, // Also called no_content
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
});

const supportCode = Object.freeze({
  INCOME: 'INCOME',
  OUTGO: 'OUTGO',
});

module.exports = {
  errorCode,
  statusCode,
  supportCode,
};
