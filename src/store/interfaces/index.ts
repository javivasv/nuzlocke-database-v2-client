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
