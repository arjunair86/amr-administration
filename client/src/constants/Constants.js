export default {
  SUCCESS: 0,
  LOGIN: 'LOGIN',

  ACCOUNTS_MGMT: {
    MODULE: 'ACCOUNTS_MGMT',
    GET_ACCOUNT_HEADS: 'GET_ACCOUNT_HEADS',
    CREATE_ACCOUNT_HEAD: 'CREATE_ACCOUNT_HEAD',
  },

  API_ERRORS: {
    LOGIN: {
      500: 'Invalid Login Details',
    },
    ACCOUNTS_MGMT: {
      500: 'Invalid Response',
      501: 'Invalid Input Data',
    },
  },
};
