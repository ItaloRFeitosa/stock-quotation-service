const Pageable = (cursorProp) => (data, limit) =>  {
  if(data.length < limit){
    return {
      count: data.length,
      cursor: null,
      data
    }
  }
  const cursor = data.slice(-1)[0][cursorProp]
  return {
    count: data.length,
    cursor,
    data
  }
}

module.exports = { Pageable }
