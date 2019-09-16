import { displayToast } from '../../Shared/bulma/toast';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  PATCH_TOURNAMENT,
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import { TournamentTeamEntity } from './state';
import teamHttpClient from './teamHttpClient';

export const DELETE_TOURNAMENT_TEAM = 'API_DELETE_TOURNAMENT_TEAM';
export const DELETE_TOURNAMENT_TEAM_SUCCESS =
  'API_DELETE_TOURNAMENT_TEAM_SUCCESS';
export const DELETE_TOURNAMENT_TEAM_FAILURE =
  'API_DELETE_TOURNAMENT_TEAM_FAILURE';
export const PATCH_TOURNAMENT_TEAM = 'API_PATCH_TOURNAMENT_TEAM';
export const PATCH_TOURNAMENT_TEAM_SUCCESS =
  'API_PATCH_TOURNAMENT_TEAM_SUCCESS';
export const PATCH_TOURNAMENT_TEAM_FAILURE =
  'API_PATCH_TOURNAMENT_TEAM_FAILURE';
export const POST_TOURNAMENT_TEAM = 'API_POST_TOURNAMENT_TEAM';
export const POST_TOURNAMENT_TEAM_SUCCESS = 'API_POST_TOURNAMENT_TEAM_SUCCESS';
export const POST_TOURNAMENT_TEAM_FAILURE = 'API_POST_TOURNAMENT_TEAM_FAILURE';
export const UPDATE_TOURNAMENT_TEAM_BY_GROUP =
  'UPDATE_TOURNAMENT_TEAM_BY_GROUP';

export const deleteTournamentTeam = (tournamentId: string) => (
  tournamentTeam: TournamentTeamEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_TOURNAMENT_TEAM });

  try {
    const response = await teamHttpClient.delete(
      tournamentId,
      tournamentTeam.id
    );

    dispatch(deleteTournamentTeamSuccess(response));
    dispatch(updateTournamentTeamByGroup());
    displayToast(`${tournamentTeam.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentTeamFailure(err));
  }
};

export const deleteTournamentTeamSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const deleteTournamentTeamFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_TEAM_FAILURE,
  payload
});

export const patchTournamentTeam = (tournamentId: string) => (
  tournamentTeam: TournamentTeamEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT });

  try {
    const response = await teamHttpClient.patch(tournamentId, tournamentTeam);

    dispatch(patchTournamentTeamSuccess(response));
    dispatch(updateTournamentTeamByGroup());
    displayToast(`${tournamentTeam.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentTeamFailure(err));
  }
};

export const patchTournamentTeamSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const patchTournamentTeamFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_TEAM_FAILURE,
  payload
});

export const postTournamentTeam = (tournamentId: string) => (
  tournamentTeam: TournamentTeamEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT_TEAM });

  try {
    const response = await teamHttpClient.post(tournamentId, tournamentTeam);

    dispatch(postTournamentTeamSuccess(response));
    dispatch(updateTournamentTeamByGroup());
    displayToast(`${tournamentTeam.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentTeamFailure(err));
  }
};

export const postTournamentTeamSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_TEAM_SUCCESS,
  payload
});

export const postTournamentTeamFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_TEAM_FAILURE,
  payload
});

export const updateTournamentTeamByGroup = (): HttpAction<ActionTypes> => ({
  type: UPDATE_TOURNAMENT_TEAM_BY_GROUP
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT_TEAM
  | typeof DELETE_TOURNAMENT_TEAM_SUCCESS
  | typeof DELETE_TOURNAMENT_TEAM_FAILURE
  | typeof PATCH_TOURNAMENT_TEAM
  | typeof PATCH_TOURNAMENT_TEAM_SUCCESS
  | typeof PATCH_TOURNAMENT_TEAM_FAILURE
  | typeof POST_TOURNAMENT_TEAM
  | typeof POST_TOURNAMENT_TEAM_SUCCESS
  | typeof POST_TOURNAMENT_TEAM_FAILURE
  | typeof REQUEST_TOURNAMENT
  | typeof REQUEST_TOURNAMENT_FAILURE
  | typeof REQUEST_TOURNAMENT_SUCCESS
  | typeof UPDATE_TOURNAMENT_TEAM_BY_GROUP;
export type Actions = HttpAction<ActionTypes>;
