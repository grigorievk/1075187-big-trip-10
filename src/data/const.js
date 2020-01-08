export const PointNameList = {
  BUS: `bus`,
  CHECKIN: `check-in`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  RESTAURANT: `restaurant`,
  SHIP: `ship`,
  SIGHTSEEING: `sightseeing`,
  TAXI: `taxi`,
  TRAIN: `train`,
  TRANSPORT: `transport`,
  TRIP: `trip`,
};

export const PointTypeList = [
  {
    name: PointNameList.BUS,
    isRide: true,
  },
  {
    name: PointNameList.CHECKIN,
    isRide: false,
  },
  {
    name: PointNameList.DRIVE,
    isRide: true,
  },
  {
    name: PointNameList.FLIGHT,
    isRide: true,
  },
  {
    name: PointNameList.RESTAURANT,
    isRide: false,
  },
  {
    name: PointNameList.SHIP,
    isRide: true,
  },
  {
    name: PointNameList.SIGHTSEEING,
    isRide: false,
  },
  {
    name: PointNameList.TAXI,
    isRide: true,
  },
  {
    name: PointNameList.TRAIN,
    isRide: true,
  },
  {
    name: PointNameList.TRANSPORT,
    isRide: true,
  },
  {
    name: PointNameList.TRIP,
    isRide: true,
  },
];
