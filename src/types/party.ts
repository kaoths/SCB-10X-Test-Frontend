export interface Party {
  _id: string;
  title: string;
  total: number;
  members: string[];
}

export interface PartyState {
  parties: Party[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum PartyActions {
  FetchAll = "FetchAllParty",
  FetchJoined = "FetchJoinedParty"
}

export enum PartyMutations {
  Loading = "SetPartyLoading",
  Success = "SetPartySuccess",
  Error = "SetPartyError",
  SetParties = "SetParties"
}
