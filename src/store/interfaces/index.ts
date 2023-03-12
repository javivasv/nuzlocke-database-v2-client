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
  ist: number;
  id: string;
  username: string;
}
