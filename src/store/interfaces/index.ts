export interface UserData {
  username: string;
  password: string;
}

export interface Nuzlockes {
  nuzlockes: Array<Nuzlocke>;
}

export interface Nuzlocke {
  nuzlocke: {
    game: "";
  };
}

export interface Token {
  exp: number;
  iat: number;
  id: string;
  username: string;
}

export interface Video {
  name: string;
  channel: string;
  url: string;
}
