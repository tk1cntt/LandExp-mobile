import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { getLandType, getMoney, encodeId } from 'constants/utils';
import Link from 'components/Link';

import s from './ListItem.css';

class ListItem extends React.Component {
  static propTypes = {
    onHandleContact: PropTypes.func.isRequired,
    houseEntity: PropTypes.shape(PropTypes.object).isRequired,
  };

  render() {
    const { houseEntity } = this.props;
    return (
      <div className={s.container}>
        <Link
          className={s.postItem}
          to={`/bat-dong-san/${encodeId(houseEntity.id)}/${houseEntity.link}`}
        >
          <div className={s.itemDisplay}>
            <img src="/images/item-1.png" alt="" />
            <div className={s.itemInfo}>
              <div href="#" className={s.likeButton}>
                <i className="fa fa-heart-o" />
              </div>
              <div className={s.title}>
                <h3>{getLandType(houseEntity.landType)}</h3>
              </div>
              <p className={s.subtitle}>{houseEntity.projectName}</p>
              {houseEntity.actionType === 'FOR_SELL' ? (
                <div className={s.typeSell}>BÁN</div>
              ) : (
                <div className={s.typeRent}>CHO THUÊ</div>
              )}
              <div
                className={s.price}
                dangerouslySetInnerHTML={{
                  __html: getMoney(houseEntity.money, houseEntity.actionType),
                }}
              />
              <div className={s.postDate}>
                Ngày đăng <span>{houseEntity.createAt}</span>
              </div>
            </div>
          </div>
          <div className={s.property}>
            <span className={s.compact}>{houseEntity.acreage} m2</span>
            <span className={s.bedroom}>{houseEntity.bedRoom}</span>
            <span className={s.bathroom}>{houseEntity.bathRoom}</span>
            <span className={s.gara}>
              {houseEntity.parking ? (
                <i className="fa fa-check" />
              ) : (
                <i className="fa fa-times" />
              )}
            </span>
          </div>
        </Link>
        <div className={s.listContactBtn}>
          <div className={s.connectWrap}>
            <div
              className={s.contactBtn}
              onClick={this.props.onHandleContact(houseEntity)}
              onKeyPress={() => {}}
              tabIndex={0}
              role="button"
            >
              Contact
            </div>
          </div>
          <div className={cx(s.listAgentInfo, s.ib)}>
            <div
              className={s.agentImg}
              style={{
                backgroundColor: 'pink',
                backgroundImage: 'url("https://housing.com/mystery-man.png")',
              }}
            />
          </div>
          <div className={cx(s.agentBody, s.ib)}>
            <div className={s.agentName}>{houseEntity.customer}</div>
            <div className={s.agentType}>Chính chủ</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ListItem);
