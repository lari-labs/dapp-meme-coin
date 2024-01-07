/**
 * @file messages.js
 * @description contains variables for all string values used within codebase for the sake of limiting.
 */

const CONSTANTS = {
  AIRDROP_ADMIN_MESSAGES: {
    ADD_ACCOUNTS_SUCCESS: (list) =>
      `Successfully added ${list.length} eligible accounts.`,
  },
  CLAIM_MESSAGES: {
    OFFER_SUCCESS: ({ value }) => `Successfully claimed ${value} tokens.`,
    OFFER_DESCRIPTION: 'claim airdrop invitation',
    INELIGIBLE_ACCOUNT_ERROR:
      'Wallet associated with this public key is not eligible for claim',
  },
};

const { AIRDROP_ADMIN_MESSAGES, CLAIM_MESSAGES } = CONSTANTS;

export { AIRDROP_ADMIN_MESSAGES, CLAIM_MESSAGES };

export default CONSTANTS;
