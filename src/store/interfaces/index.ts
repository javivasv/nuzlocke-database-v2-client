export interface UserData {
  username: string;
  password: string;
}
/*
export interface Nuzlockes {
  nuzlockes: Array<Nuzlocke>;
}
*/

export interface Nuzlocke {
  nuzlocke: {
    id: string;
    name: string;
    game: string;
    status: string;
  };
}

export interface Token {
  id: string;
  exp: number;
  iat: number;
  username: string;
}

export interface Video {
  name: string;
  channel: string;
  url: string;
}
