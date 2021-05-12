const errorCode = Object.freeze({
  INCONSISTENT_DATA: 'Inconsistency was detected in the data received',
  MISSING_ATTRIBUTES: 'The absence of one or more necessary parameters was detected',
  UNFINISHED_OPERATION: 'Operation canceled due to one or more actions not completed successfully',
});

const statusCode = Object.freeze({
  OK: 200,
  CREATED: 201,
  EDITED: 204, // Also called no_content
  BAD_REQUEST: 400,
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
