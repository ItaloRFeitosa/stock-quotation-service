const GetUserHistoryQuoteDTO = ({ user, query }) => ({
  userId: user.id,
  cursor: query.cursor,
  limit: query.limit || 50,
});

module.exports = { GetUserHistoryQuoteDTO };
