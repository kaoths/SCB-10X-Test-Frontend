export interface Party {
  _id: string;
  title: string;
  total: number;
  members: string[];
  owner: string;
  isOwner: boolean;
  joined?: boolean;
}

export interface PartyState {
  party: Party | null;
  parties: Party[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum PartyActions {
  FetchAll = "FetchAllParty",
  FetchOne = "FetchOneParty",
  CreateParty = "CreateParty",
  DeleteParty = "DeleteParty",
  JoinParty = "JoinParty",
  LeaveParty = "LeaveParty",
}

export enum PartyMutations {
  Loading = "SetPartyLoading",
  Success = "SetPartySuccess",
  Error = "SetPartyError",
  SetAllParties = "SetAllParties",
  SetParty = "SetParty"
}

export enum PartyGetters {
  GetAllParties = "GetAllParties",
  GetJoinedParties = "GetJoinedParties",
  GetNotJoinedParties = "GetNotJoinedParties"
}
