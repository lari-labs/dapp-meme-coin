/**
 * @file messages.js
 * @description contains variables for all string values used within codebase for the sake of limiting.
 */

const CONSTANTS = {
  TOKEN_ISSUANCE: {
    MINT_SUCCESS: ({ value }) =>
      `Mint success! ${value} tokens have been minted and added to the internal contract seat.`,
  },
  CLAIM: {
    OFFER_SUCCESS: ({ value }) => `Successfully claimed ${value} tokens.`,
    OFFER_DESCRIPTION: 'claim airdrop invitation',
    INELIGIBLE_ACCOUNT_ERROR:
      'Wallet associated with this public key is not eligible for claim',
  },
};

export default CONSTANTS;
