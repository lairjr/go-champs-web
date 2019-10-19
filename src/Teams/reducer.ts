import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  GET_TOURNAMENT,
  GET_TOURNAMENT_FAILURE,
  GET_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import { TournamentEntity } from '../Tournaments/state';
import {
  ActionTypes,
  DELETE_TEAM,
  DELETE_TEAM_FAILURE,
  DELETE_TEAM_SUCCESS,
  PATCH_TEAM,
  PATCH_TEAM_FAILURE,
  PATCH_TEAM_SUCCESS,
  POST_TEAM,
  POST_TEAM_FAILURE,
  POST_TEAM_SUCCESS
} from './actions';
import { initialState, TeamEntity, TeamState } from './state';

const teamMapEntities = mapEntities<TeamEntity>(returnProperty('id'));

const deleteTeam = (state: TeamState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingDeleteTeam: true
});

const deleteTeamFailure = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTeam: false
});

const deleteTeamSuccess = (
  state: TeamState,
  action: HttpAction<ActionTypes, string>
) => {
  const teams = Object.keys(state.teams)
    .filter(entityById(state.teams, action.payload!))
    .reduce(mapEntitiesByKey(state.teams), {});
  return {
    ...state,
    teams,
    isLoadingDeleteTeam: false
  };
};

const patchTeam = (state: TeamState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingPatchTeam: true
});

const patchTeamFailure = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTeam: false
});

const patchTeamSuccess = (
  state: TeamState,
  action: HttpAction<ActionTypes, TeamEntity>
) => ({
  ...state,
  isLoadingPatchTeam: false,
  teams: [action.payload].reduce(teamMapEntities, state.teams)
});

const postTeam = (state: TeamState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingPostTeam: true
});

const postTeamFailure = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTeam: false
});

const postTeamSuccess = (
  state: TeamState,
  action: HttpAction<ActionTypes, TeamEntity>
) => ({
  ...state,
  isLoadingPostTeam: false,
  teams: [action.payload].reduce(teamMapEntities, state.teams)
});

const getTournament = (state: TeamState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingRequestTournament: true
});

const getTournamentFailure = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

const getTournamentSuccess = (
  state: TeamState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  teams: action.payload!.teams.reduce(teamMapEntities, {})
});

export default createReducer(initialState, {
  [DELETE_TEAM]: deleteTeam,
  [DELETE_TEAM_FAILURE]: deleteTeamFailure,
  [DELETE_TEAM_SUCCESS]: deleteTeamSuccess,
  [PATCH_TEAM]: patchTeam,
  [PATCH_TEAM_FAILURE]: patchTeamFailure,
  [PATCH_TEAM_SUCCESS]: patchTeamSuccess,
  [POST_TEAM]: postTeam,
  [POST_TEAM_FAILURE]: postTeamFailure,
  [POST_TEAM_SUCCESS]: postTeamSuccess,
  [GET_TOURNAMENT]: getTournament,
  [GET_TOURNAMENT_FAILURE]: getTournamentFailure,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
