import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { SERVER_API_URL, encodeId } from 'constants/utils';

import history from '../../history';
import s from './ArticleList.css';

class ArticleList extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  gotoPage = link => {
    history.push(link);
  };

  articleListForm() {
    const articleListDom = this.props.articleList.map(article => (
      <div key={`entity-${article.id}`} className={cx(s.ib)}>
        <a
          className={cx(s.hListItem, s.ib)}
          data-key={2099224}
          href={`/tin-tuc/${encodeId(article.id)}/${article.link}`}
        >
          <div className={cx(s.imageSection, s.ib)}>
            <img
              className={cx(s.listImg)}
              src={`${SERVER_API_URL}/api/articles/${encodeId(
                article.id,
              )}/avatar/${article.link}-${encodeId(article.id)}.jpg`}
            />
            <div className={s.tag}>
              <p>{article.title}</p>
            </div>
          </div>
        </a>
      </div>
    ));
    return articleListDom;
  }

  render() {
    return (
      <div className={s.cardContent}>
        <div className={s.title}>
          <div className={cx(s.hlTitle, s.ib)}>
            <div>
              <div className={s.cardTitle}>{this.props.title}</div>
              <div className={s.cardSubtitle}>Xem thêm</div>
            </div>
          </div>
        </div>
        <div className={s.horizontalList}>{this.articleListForm()}</div>
      </div>
    );
  }
}

ArticleList.defaultProps = {
  articleList: [],
};

ArticleList.propTypes = {
  articleList: PropTypes.arrayOf(PropTypes.shape),
};

export default withStyles(s)(ArticleList);
