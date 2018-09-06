import { api } from 'config';
import axios from 'axios';

const client = axios.create({
  baseURL: api.remoteUrl,
});

export const schema = [
  `
  scalar Date

  enum UserActionType {
    FOR_BUY
    FOR_SELL
    FOR_RENT
    FOR_HIRE
  }

  enum DirectionType {
    NORTH
    SOUTH
    EAST
    WEST
    EAST_NORTH
    WEST_NORTH
    EAST_SOUTH
    WEST_SOUTH
  }

  enum LandType {
    APARTMENT
    PEN_HOUSE
    HOME
    HOME_VILLA
    HOME_STREET_SIDE
    MOTEL_ROOM
    OFFICE
    LAND_SCAPE
    LAND_OF_PROJECT
    LAND_FARM
    LAND_RESORT
    WAREHOUSES
    KIOSKS
    OTHER
  }

  enum SaleType {
    SALE_BY_MYSELF
    SALE_BY_MYSELF_VIP
    SALE_SUPPORT
    SALE_SUPPORT_VIP
  }

  enum PresentType {
    NONE
    BASIC_FURNITURE
    FULL_FURNITURE
    DISCOUNT_PRICE
    SUPPORT_EXHIBIT
    SUPPORT_FEE
    HAVE_PRESENT
  }

  enum StatusType {
    OPEN
    PENDING
    PAID
    CANCELED
    EXPIRED
    SOLD
  }

  type HousePhoto {
    id: Int
    imageContentType: String
    image: String
    mobileLink: String
    webLink: String
    enabled: Boolean
    createAt: Date
    houseId: Int
    createByLogin: String
    createById: Int
    updateByLogin: String
    updateById: Int
  }

  type GooglePlace {
    title: String
    googleId: String
    type: [String]
    address: String
    distance: Float
    longitude: Float
    latitude: Float
  }

  type House {
    id: Int
    avatarContentType: String
    avatar: String
    avatarLink: String
    actionType: UserActionType
    address: String
    money: Float
    acreage: Float
    acreageStreetSide: Float
    discount: Float
    direction: DirectionType
    directionBalcony: DirectionType
    floor: String
    numberOfFloor: Int
    bathRoom: Int
    bedRoom: Int
    parking: Boolean
    summary: String
    summaryNoHtml: String
    landType: LandType
    saleType: SaleType
    fee: Float
    feeMax: Float
    present: PresentType
    hits: Int
    customer: String
    mobile: String
    email: String
    facebook: String
    zalo: String
    statusType: StatusType
    googleId: String
    latitude: Float
    longitude: Float
    createAt: Date
    updateAt: Date
    photos: [HousePhoto]
    restaurants: [GooglePlace]
    hospitals: [GooglePlace]
    schools: [GooglePlace]
    cityName: String
    cityId: Int
    districtName: String
    districtType: String
    districtId: Int
    wardName: String
    wardType: String
    wardId: Int
    projectName: String
    projectId: Int
    createByLogin: String
    createById: Int
    updateByLogin: String
    updateById: Int
    title: String
    fullAddress: String
    link: String
    error: Error
  }
`,
];

export const queries = [
  `
  getTop(page: Int, size: Int): [House]
`,
];

export const resolvers = {
  RootQuery: {
    async getTop(parent, args) {
      // console.log('top-args', args) // eslint-disable-line
      const data = await client
        .get('/api/houses/top')
        .then(response => {
          // console.log('top-response', response.data) // eslint-disable-line
          return response.data;
        })
        .catch(error => ({
          error: error.response && error.response.data,
        }));
      // console.log('top-response', data) // eslint-disable-line
      return data;
    },
  },
};
