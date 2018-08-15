export const search = searchValue => async (dispatch) => {
  dispatch({
    type: 'SEARCH',
    payload: searchValue,
  });
};
