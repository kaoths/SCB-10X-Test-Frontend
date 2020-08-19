export interface PartyDTO {
  title: string;
  total: number;
}

export interface Party extends PartyDTO {
  _id: string;
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
  EditParty = "EditParty",
  DeleteParty = "DeleteParty",
  JoinParty = "JoinParty",
  LeaveParty = "LeaveParty"
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
  GetNotJoinedParties = "GetNotJoinedParties",
  GetOwnedParties = "GetOwnedParties"
}
