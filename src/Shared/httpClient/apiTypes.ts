import { PhaseTypes } from '../../Tournaments/Phases/state';

interface ApiGame {
  id: string;
  away_score: number;
  datetime: string;
  home_score: number;
  location: string;
}

export interface ApiGameWithDepedencies extends ApiGame {
  away_team?: ApiTeam;
  home_team?: ApiTeam;
}

export interface ApiGameWithDepedenciesIds extends ApiGame {
  away_team_id: string;
  home_team_id: string;
}

export interface ApiGameRequest {
  tournament_game: ApiGameWithDepedenciesIds;
}

export interface ApiGameResponse {
  data: ApiGameWithDepedencies;
}

export interface ApiGamesResponse {
  data: ApiGameWithDepedencies[];
}

export interface ApiGroup {
  id: string;
  name: string;
}

export interface ApiGroupRequest {
  tournament_group: ApiGroup;
}

export interface ApiGroupResponse {
  data: ApiGroup;
}

export interface ApiGroupsResponse {
  data: ApiGroup[];
}

export interface ApiPhase {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
}

export interface ApiPhaseRequest {
  tournament_phase: ApiPhase;
}

export interface ApiPhaseResponse {
  data: ApiPhase;
}

export interface ApiPhasesResponse {
  data: ApiPhase[];
}

export interface ApiOrganization {
  id: string;
  name: string;
  slug: string;
}

export interface ApiOrganizationRequest {
  tournament_organization: ApiOrganization;
}

export interface ApiOrganizationResponse {
  data: ApiOrganization;
}

export interface ApiOrganizationsResponse {
  data: ApiOrganization[];
}

export interface ApiStat {
  id: string;
  title: string;
}

export interface ApiStatRequest {
  tournament_stat: ApiStat;
}

export interface ApiStatResponse {
  data: ApiStat;
}

export interface ApiStatsResponse {
  data: ApiStat[];
}

export interface ApiTeam {
  id: string;
  name: string;
  group?: ApiGroup;
}

export interface ApiTeamRequest {
  tournament_team: ApiTeam;
}

export interface ApiTeamResponse {
  data: ApiTeam;
}

export interface ApiTeamsResponse {
  data: ApiTeam[];
}

interface ApiTournament {
  id: string;
  name: string;
  slug: string;
}

export interface ApiTournamentWithDependecies extends ApiTournament {
  organization: ApiOrganization;
  phases: ApiPhase[];
  teams: ApiTeam[];
}

export interface ApiTournamentWithDependeciesIds extends ApiTournament {
  organization_id: string;
}

export interface ApiTournamentRequest {
  tournament: ApiTournamentWithDependeciesIds;
}

export interface ApiTournamentResponse {
  data: ApiTournamentWithDependecies;
}

export interface ApiTournamentsResponse {
  data: ApiTournamentWithDependecies[];
}