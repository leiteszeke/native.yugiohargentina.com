export type MyObject = {
  [key: string]: any;
};

export type RequestConfig = {
  public?: boolean;
};

export type RequestMethod = 'POST' | 'PUT' | 'GET' | 'DELETE';

export type RequestOptions = {
  method: RequestMethod;
  body?: MyObject | string;
  headers: {
    [key: string]: string;
  };
};

export type RootStackParamList = {
  Dashboard: { refresh?: boolean };
  InventaryCard: { id: number; name: string };
  InventarySingle: { card: CardProps; single: SingleProps };
  Sets: { eraId?: number; eraName?: string };
  WishlistCard: { id: number; name: string };
};

export type EventProps = {
  dateFrom: Date;
  dateTo: Date;
  id: number;
};

export type TournamentPlayerProps = {};

export type ChallongeTournamentProps = {
  state: string; // TODO: Chalonge State
};

export type TournamentProps = {
  id: number;
  challonge?: ChallongeTournamentProps;
  dateFrom: Date;
  dateTo: Date;
  image?: string;
  title: string;
  top?: TournamentProps;
  players: Array<TournamentPlayerProps>;
  rounds: number;
};

export type UserProps = {
  city?: string;
  cossyId?: string;
  challongeId?: string;
  countryId?: number;
  duelLinksId?: string;
  duelingBookId?: string;
  discordId?: string;
  id: number;
  stateId?: number | null;
  name: string;
  lastname: string;
  [key: string]: any;
};

export type CountryProps = {
  id: number;
  name: string;
};

export type StateProps = {
  id: number;
  name: string;
  countryId: number;
};

export type ExpansionCardProps = {
  code: string;
  name: string;
};

export type CardProps = {
  id: number;
  name: string;
  singles: Array<SingleProps>;
};

export type SingleProps = {
  id: number;
  name: string;
  rarity: string;
  cardCode: string;
  image?: string;
  expansion: ExpansionCardProps;
  expansionCode: string;
  expansionNumber: string;
  number: number;
};

export type InventaryCardProps = {
  id: number;
  name: string;
  card: CardProps;
  single: SingleProps;
  singleId: number;
  languageId: number;
  isPublic: boolean;
  price: number;
  currencyId: number;
  inSale: boolean;
  quantity: number;
  statusId: number;
};

export type InventarySingleProps = {
  single: SingleProps | undefined;
  id: number;
  name: string;
  singles: SingleProps[];
};

export type FlagProps = {
  id: number;
  code: string;
};

export type StatusProps = {
  id: number;
  icon: string;
};

export type StoreLinkProps = {
  type: 'instagram' | 'facebook' | 'environment';
  url: string;
  id: number;
};

export type StoreProps = {
  id: number;
  name: string;
  image?: string;
  type: 'instagram' | 'facebook' | 'environment';
  address: string;
  city: string;
  state: StateProps;
  links?: Array<StoreLinkProps>;
};

export type WishlistProps = {
  id: number;
  name: string;
  cards: Array<WishlistCardProps>;
};

export type WishlistCardProps = {
  id: number;
  name: string;
  card: CardProps;
  langs: string;
  single: SingleProps;
  singleId: number;
};
