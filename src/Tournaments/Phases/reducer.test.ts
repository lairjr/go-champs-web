import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import {
  ActionTypes,
  DELETE_TOURNAMENT_PHASE,
  DELETE_TOURNAMENT_PHASE_FAILURE,
  DELETE_TOURNAMENT_PHASE_SUCCESS,
  PATCH_TOURNAMENT_PHASE,
  PATCH_TOURNAMENT_PHASE_FAILURE,
  PATCH_TOURNAMENT_PHASE_SUCCESS,
  POST_TOURNAMENT_PHASE,
  POST_TOURNAMENT_PHASE_FAILURE,
  POST_TOURNAMENT_PHASE_SUCCESS
} from './actions';
import {
  deleteTournamentPhase,
  deleteTournamentPhaseFailure,
  deleteTournamentPhaseSuccess,
  patchTournamentPhase,
  patchTournamentPhaseFailure,
  patchTournamentPhaseSuccess,
  postTournamentPhase,
  postTournamentPhaseFailure,
  postTournamentPhaseSuccess,
  requestTournament,
  requestTournamentFailure,
  requestTournamentSuccess
} from './reducer';
import { initialState, TournamentPhaseState } from './state';

describe('deleteTournamentPhase', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_PHASE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournamentPhase to true', () => {
    expect(
      deleteTournamentPhase(initialState, action).isLoadingDeleteTournamentPhase
    ).toBe(true);
  });
});

describe('deleteTournamentPhaseFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_PHASE_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournamentPhase to false', () => {
    expect(
      deleteTournamentPhaseFailure(initialState, action)
        .isLoadingDeleteTournamentPhase
    ).toBe(false);
  });
});

describe('deleteTournamentPhaseSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_PHASE_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    tournamentPhases: {
      ['first-id']: {
        id: 'first-id',
        title: 'first-title',
        type: 'standings'
      }
    }
  };

  it('sets isLoadingDeleteTournamentPhase to false', () => {
    expect(
      deleteTournamentPhaseSuccess(deleteState, action)
        .isLoadingDeleteTournamentPhase
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = deleteTournamentPhaseSuccess(deleteState, action);

    expect(newState.tournamentPhases['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: TournamentPhaseState = {
      ...initialState,
      tournamentPhases: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title',
          type: 'standings'
        },
        ...deleteState.tournamentPhases
      }
    };

    const newState = deleteTournamentPhaseSuccess(someState, action);

    expect(newState.tournamentPhases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: 'standings'
    });
  });
});

describe('patchTournamentPhase', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_PHASE
  };

  it('sets isLoadingPatchTournamentPhase to true', () => {
    expect(
      patchTournamentPhase(initialState, action).isLoadingPatchTournamentPhase
    ).toBe(true);
  });
});

describe('patchTournamentPhaseFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_PHASE_FAILURE
  };

  it('sets isLoadingPatchTournamentPhase to false', () => {
    expect(
      patchTournamentPhaseFailure(initialState, action)
        .isLoadingPatchTournamentPhase
    ).toBe(false);
  });
});

describe('patchTournamentPhaseSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_PHASE_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        title: 'some-first-title',
        type: 'standings'
      }
    }
  };

  const updateState: TournamentPhaseState = {
    ...initialState,
    tournamentPhases: {
      ['first-id']: {
        id: 'first-id',
        title: 'first-title',
        type: 'standings'
      }
    }
  };

  it('sets isLoadingPatchTournamentPhase to false', () => {
    expect(
      patchTournamentPhaseSuccess(updateState, action)
        .isLoadingPatchTournamentPhase
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = patchTournamentPhaseSuccess(updateState, action);

    expect(newState.tournamentPhases['first-id']).toEqual({
      id: 'first-id',
      title: 'some-first-title',
      type: 'standings'
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentPhaseState = {
      ...updateState,
      tournamentPhases: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title',
          type: 'standings'
        }
      }
    };

    const newState = patchTournamentPhaseSuccess(someState, action);

    expect(newState.tournamentPhases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: 'standings'
    });
  });
});

describe('postTournamentPhase', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_PHASE
  };

  it('sets isLoadingPostTournamentPhase to true', () => {
    expect(
      postTournamentPhase(initialState, action).isLoadingPostTournamentPhase
    ).toBe(true);
  });
});

describe('postTournamentPhaseFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_PHASE_FAILURE
  };

  it('sets isLoadingPostTournamentPhase to false', () => {
    expect(
      postTournamentPhaseFailure(initialState, action)
        .isLoadingPostTournamentPhase
    ).toBe(false);
  });
});

describe('postTournamentPhaseSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_PHASE_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        title: 'first-title',
        type: 'standings'
      }
    }
  };

  it('sets isLoadingPostTournamentPhase to false', () => {
    expect(
      postTournamentPhaseSuccess(initialState, action)
        .isLoadingPostTournamentPhase
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = postTournamentPhaseSuccess(initialState, action);

    expect(newState.tournamentPhases['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
      type: 'standings'
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentPhaseState = {
      ...initialState,
      tournamentPhases: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title',
          type: 'standings'
        }
      }
    };

    const newState = postTournamentPhaseSuccess(someState, action);

    expect(newState.tournamentPhases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: 'standings'
    });
  });
});

describe('requestTournament', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT
  };

  it('sets isLoadingRequestTournament to true', () => {
    expect(
      requestTournament(initialState, action).isLoadingRequestTournament
    ).toBe(true);
  });
});

describe('requestTournamentFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_FAILURE
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      requestTournamentFailure(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });
});

describe('requestTournamentSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        title: 'first-title',
        slug: 'first-slug',
        phases: [
          {
            id: 'first-phase-id',
            title: 'first phase title',
            type: 'standings'
          },
          {
            id: 'second-phase-id',
            title: 'second phase title',
            type: 'standings'
          }
        ]
      }
    }
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      requestTournamentSuccess(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestTournamentSuccess(initialState, action);

    expect(newState.tournamentPhases['first-phase-id']).toEqual({
      id: 'first-phase-id',
      title: 'first phase title',
      type: 'standings'
    });
    expect(newState.tournamentPhases['second-phase-id']).toEqual({
      id: 'second-phase-id',
      title: 'second phase title',
      type: 'standings'
    });
  });
});
