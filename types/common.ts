export type Claim = {
  id: string;
  date: string;
  from: {
    address: string;
    long: string;
    lat: string;
  };
  to: {
    address: string;
    long: string;
    lat: string;
  };
};

export type Marker = {
  address: string;
  long: string;
  lat: string;
};
