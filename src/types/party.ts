export interface Party {
  _id: string;
  title: string;
  total: number;
  members: string[];
  joined?: boolean;
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
  JoinParty = "JoinParty",
  LeaveParty = "LeaveParty",
}

export enum PartyMutations {
  Loading = "SetPartyLoading",
  Success = "SetPartySuccess",
  Error = "SetPartyError",
  SetAllParties = "SetAllParties",
}

export enum PartyGetters {
  GetAllParties = "GetAllParties",
  GetJoinedParties = "GetJoinedParties",
  GetNotJoinedParties = "GetNotJoinedParties"
}
