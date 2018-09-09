import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getLandType, getMoney, encodeId } from 'constants/utils';

import history from '../../history';
import s from './HorizontalList.css';

class HorizontalList extends React.Component {
  gotoPage = link => {
    history.push(link);
  };

  houseListForm() {
    const houstListDom = this.props.houseList.map(house => (
      <div key={`entity-${house.id}`} className={cx(s.ib)}>
        <a
          className={cx(s.hListItem, s.ib)}
          data-key={2099224}
          href={`/bat-dong-san/${encodeId(house.id)}/${house.link}`}
        >
          <div className={cx(s.imageSection, s.ib)}>
            <img
              className={cx(s.listImg)}
              style={{
                backgroundImage: 'url("/images/item-1.png")',
              }}
              alt={house.title}
            />
          </div>
          <div className={cx(s.contentSection, s.ib)}>
            <div className={cx(s.listHeading)}>
              {getLandType(house.landType)}
            </div>
            <div className={cx(s.listSubheading)}>{house.projectName}</div>
            <div className={cx(s.listLocality)}>
              {house.districtType} {house.districtName}
            </div>
            {house.actionType === 'FOR_SELL' ? (
              <div className={cx(s.typeSell)}>BÁN</div>
            ) : (
              <div className={cx(s.typeRent)}>CHO THUÊ</div>
            )}
            <div className={cx(s.listContent)}>
              <span
                className={cx(s.listPrice)}
                dangerouslySetInnerHTML={{
                  __html: getMoney(house.money, house.actionType),
                }}
              />
            </div>
          </div>
        </a>
      </div>
    ));
    return houstListDom;
  }

  render() {
    return (
      <div>
        <div className="title">
          <div className="hl-title ib">
            <div className="card-title-container">
              <div className="card-title">Similar Properties</div>
              <div className="card-subtitle">
                Based on properties you have viewed
              </div>
            </div>
          </div>
        </div>
        <div className={s.horizontalList}>
          {this.houseListForm()}
          {this.houseListForm()}
          {this.houseListForm()}
          {this.houseListForm()}
          {this.houseListForm()}
          <div className={cx(s.ib)}>
            <a
              className={cx(s.hListItem, s.ib)}
              data-key={2099224}
              href="/rent/V18zrs"
            >
              <div className={cx(s.imageSection, s.ib)}>
                <img
                  className={cx(s.listImg)}
                  style={{
                    backgroundImage:
                      'url("https://is1-2.housingcdn.com/01c16c28/fb902a7f8f5f57a4686f051b498b4acf/v0/medium.jpg")',
                  }}
                  alt=""
                />
              </div>
              <div className={cx(s.contentSection, s.ib)}>
                <div className={cx(s.listHeading)}>3 BHK Apartment</div>
                <div className={cx(s.listSubheading)}>
                  Semi Furnished 1700 sqft
                </div>
                <div className={cx(s.listLocality)}>Perungudi</div>
                <div className={cx(s.listContent)}>
                  <span className={cx(s.listPrice)}>
                    <i className="icon-rupee" />32,000
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div className={cx(s.ib)}>
            <a
              className={cx(s.hListItem, s.ib)}
              data-key={2115961}
              href="/rent/V19cop"
            >
              <div className={cx(s.imageSection, s.ib)}>
                <img className={cx(s.listImg, s.noImg)} alt="" />
              </div>
              <div className={cx(s.contentSection, s.ib)}>
                <div className={cx(s.listHeading)}>3 BHK Apartment</div>
                <div className={cx(s.listSubheading)}>
                  Semi Furnished 1400 sqft
                </div>
                <div className={cx(s.listLocality)}>Adyar</div>
                <div className={cx(s.listContent)}>
                  <span className={cx(s.listPrice)}>
                    <i className="icon-rupee" />33,000
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div className={cx(s.ib)}>
            <a
              className={cx(s.hListItem, s.ib)}
              data-key={2018628}
              href="/rent/V179l0"
            >
              <div className={cx(s.imageSection, s.ib)}>
                <img
                  className={cx(s.listImg)}
                  style={{
                    backgroundImage:
                      'url("https://is1-3.housingcdn.com/01c16c28/6d16af9b0b2957f0eff976947b9f7c56/v2/medium.jpg")',
                  }}
                  alt=""
                />
              </div>
              <div className={cx(s.contentSection, s.ib)}>
                <div className={cx(s.listHeading)}>3 BHK Apartment</div>
                <div className={cx(s.listSubheading)}>
                  Semi Furnished 1243 sqft
                </div>
                <div className={cx(s.listLocality)}>Velachery</div>
                <div className={cx(s.listContent)}>
                  <span className={cx(s.listPrice)}>
                    <i className="icon-rupee" />33,000
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div className={cx(s.ib)}>
            <a
              className={cx(s.hListItem, s.ib)}
              data-key={1984229}
              href="/rent/V16j1h"
            >
              <div className={cx(s.imageSection, s.ib)}>
                <img
                  className={cx(s.listImg)}
                  style={{
                    backgroundImage:
                      'url("https://is1-2.housingcdn.com/01c16c28/a3f14bbcba5b7b86803a760672364996/v2/medium.jpg")',
                  }}
                  alt=""
                />
              </div>
              <div className={cx(s.contentSection, s.ib)}>
                <div className={cx(s.listHeading)}>3 BHK Apartment</div>
                <div className={cx(s.listSubheading)}>
                  Semi Furnished 2100 sqft
                </div>
                <div className={cx(s.listLocality)}>Thoraipakkam</div>
                <div className={cx(s.listContent)}>
                  <span className={cx(s.listPrice)}>
                    <i className="icon-rupee" />32,000
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div className={cx(s.ib)}>
            <a
              className={cx(s.hListItem, s.ib)}
              data-key={2076850}
              href="/rent/V18iia"
            >
              <div className={cx(s.imageSection, s.ib)}>
                <img
                  className={cx(s.listImg)}
                  style={{
                    backgroundImage:
                      'url("https://is1-3.housingcdn.com/01c16c28/52c4ae1ea56597c292029421632cf307/v0/medium.jpg")',
                  }}
                  alt=""
                />
              </div>
              <div className={cx(s.contentSection, s.ib)}>
                <div className={cx(s.listHeading)}>3 BHK Independent House</div>
                <div className={cx(s.listSubheading)}>
                  Semi Furnished 2300 sqft
                </div>
                <div className={cx(s.listLocality)}>Neelankarai</div>
                <div className={cx(s.listContent)}>
                  <span className={cx(s.listPrice)}>
                    <i className="icon-rupee" />33,000
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

HorizontalList.defaultProps = {
  houseList: [],
};

HorizontalList.propTypes = {
  houseList: PropTypes.arrayOf(PropTypes.shape),
};

export default withStyles(s)(HorizontalList);
