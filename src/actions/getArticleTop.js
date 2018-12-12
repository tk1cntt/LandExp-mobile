import {
  TOP_ARTICLE_START,
  TOP_ARTICLE_SUCCESS,
  TOP_ARTICLE_ERROR,
} from '../constants';

export default function getArticleTop({ page, size }) {
  return async dispatch => {
    dispatch({
      type: TOP_ARTICLE_START,
    });
    try {
      const response = await fetch(
        `/api/v1/articles/top?page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      );
      const data = await response.json();
      if (data.status) {
        dispatch({
          type: TOP_ARTICLE_ERROR,
          payload: data,
        });
      } else {
        dispatch({
          type: TOP_ARTICLE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: TOP_ARTICLE_ERROR,
        payload: {
          status: 100,
          detail: 'Server undermaintain',
        },
      });
      return false;
    }
    return true;
  };
}
