import { getTournamentSuccess } from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT } from '../Tournaments/state';
import {
  deletePhaseFailure,
  deletePhaseStart,
  deletePhaseSuccess,
  getPhaseFailure,
  getPhaseStart,
  getPhaseSuccess,
  patchPhaseFailure,
  patchPhaseStart,
  patchPhaseSuccess,
  postPhaseFailure,
  postPhaseStart,
  postPhaseSuccess
} from './actions';
import phaseReducer from './reducer';
import { initialState, PhaseState, PhaseTypes } from './state';

describe('deletePhase', () => {
  const action = deletePhaseStart();

  it('sets isLoadingDeletePhase to true', () => {
    expect(phaseReducer(initialState, action).isLoadingDeletePhase).toBe(true);
  });
});

describe('deletePhaseFailure', () => {
  const action = deletePhaseFailure('first-id');

  it('sets isLoadingDeletePhase to false', () => {
    expect(phaseReducer(initialState, action).isLoadingDeletePhase).toBe(false);
  });
});

describe('deletePhaseSuccess', () => {
  const action = deletePhaseSuccess('first-id');

  const deleteState = {
    ...initialState,
    phases: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        type: PhaseTypes.elimination
      }
    }
  };

  it('sets isLoadingDeletePhase to false', () => {
    expect(phaseReducer(deleteState, action).isLoadingDeletePhase).toBe(false);
  });

  it('remove entity', () => {
    const newState = phaseReducer(deleteState, action);

    expect(newState.phases['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: PhaseState = {
      ...initialState,
      phases: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          type: PhaseTypes.elimination,
          isInProgress: false,
          order: 1
        },
        'first-id': deleteState.phases['first-id']
      }
    };

    const newState = phaseReducer(someState, action);

    expect(newState.phases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: PhaseTypes.elimination,
      isInProgress: false,
      order: 1
    });
  });
});

describe('patchPhase', () => {
  const action = patchPhaseStart();

  it('sets isLoadingPatchPhase to true', () => {
    expect(phaseReducer(initialState, action).isLoadingPatchPhase).toBe(true);
  });
});

describe('patchPhaseFailure', () => {
  const action = patchPhaseFailure('error');

  it('sets isLoadingPatchPhase to false', () => {
    expect(phaseReducer(initialState, action).isLoadingPatchPhase).toBe(false);
  });
});

describe('patchPhaseSuccess', () => {
  const action = patchPhaseSuccess({
    id: 'first-id',
    title: 'some-first-title',
    type: PhaseTypes.elimination,
    order: 1
  });

  const updateState: PhaseState = {
    ...initialState,
    phases: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        type: PhaseTypes.elimination,
        isInProgress: true,
        order: 1
      }
    }
  };

  it('sets isLoadingPatchPhase to false', () => {
    expect(phaseReducer(updateState, action).isLoadingPatchPhase).toBe(false);
  });

  it('set entity', () => {
    const newState = phaseReducer(updateState, action);

    expect(newState.phases['first-id']).toEqual({
      id: 'first-id',
      isInProgress: true,
      title: 'some-first-title',
      type: PhaseTypes.elimination,
      order: 1
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseState = {
      ...updateState,
      phases: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          type: PhaseTypes.elimination,
          isInProgress: true,
          order: 1
        }
      }
    };

    const newState = phaseReducer(someState, action);

    expect(newState.phases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: PhaseTypes.elimination,
      order: 1,
      isInProgress: true
    });
  });
});

describe('postPhase', () => {
  const action = postPhaseStart();

  it('sets isLoadingPostPhase to true', () => {
    expect(phaseReducer(initialState, action).isLoadingPostPhase).toBe(true);
  });
});

describe('postPhaseFailure', () => {
  const action = postPhaseFailure('error');

  it('sets isLoadingPostPhase to false', () => {
    expect(phaseReducer(initialState, action).isLoadingPostPhase).toBe(false);
  });
});

describe('postPhaseSuccess', () => {
  const action = postPhaseSuccess({
    id: 'first-id',
    title: 'first-title',
    type: PhaseTypes.elimination,
    order: 1
  });

  it('sets isLoadingPostPhase to false', () => {
    expect(phaseReducer(initialState, action).isLoadingPostPhase).toBe(false);
  });

  it('set entity', () => {
    const newState = phaseReducer(initialState, action);

    expect(newState.phases['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
      type: PhaseTypes.elimination,
      order: 1,
      isInProgress: true
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseState = {
      ...initialState,
      phases: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title',
          type: PhaseTypes.elimination,
          order: 1,
          isInProgress: true
        }
      }
    };

    const newState = phaseReducer(someState, action);

    expect(newState.phases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: PhaseTypes.elimination,
      order: 1,
      isInProgress: true
    });
  });
});

describe('getPhase', () => {
  const action = getPhaseStart();

  it('set isPhaseLoading to true', () => {
    const newState = phaseReducer(undefined, action);

    expect(newState.isLoadingPhase).toBe(true);
  });
});

describe('getPhaseFailure', () => {
  const action = getPhaseFailure('error');

  it('set isPhaseLoading to false', () => {
    const newState = phaseReducer(undefined, action);

    expect(newState.isLoadingPhase).toBe(false);
  });
});

describe('getPhaseSuccess', () => {
  const action = getPhaseSuccess({
    id: 'first-id',
    order: 1,
    title: 'first title',
    type: PhaseTypes.elimination
  });

  it('set isPhaseLoading to false', () => {
    const newState = phaseReducer(initialState, action);

    expect(newState.isLoadingPhase).toBe(false);
  });

  it('sets entity', () => {
    const newState = phaseReducer(initialState, action);

    expect(newState.phases['first-id']).toEqual({
      id: 'first-id',
      title: 'first title',
      type: PhaseTypes.elimination,
      isInProgress: true,
      order: 1
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseState = {
      ...initialState,
      phases: {
        'second-id': {
          id: 'second-id',
          title: 'second title',
          type: PhaseTypes.draw,
          isInProgress: false,
          order: 2
        }
      }
    };

    const newState = phaseReducer(someState, action);

    expect(newState.phases['first-id']).toEqual({
      id: 'first-id',
      title: 'first title',
      type: PhaseTypes.elimination,
      isInProgress: true,
      order: 1
    });
    expect(newState.phases['second-id']).toEqual({
      id: 'second-id',
      title: 'second title',
      type: PhaseTypes.draw,
      isInProgress: false,
      order: 2
    });
  });
});

describe('getTournamentSuccess', () => {
  const apiTournament = {
    ...DEFAULT_TOURNAMENT,
    id: 'first-id',
    name: 'first-title',
    slug: 'first-slug',
    phases: [
      {
        id: 'first-phase-id',
        title: 'first phase title',
        type: PhaseTypes.elimination,
        order: 1
      },
      {
        id: 'second-phase-id',
        title: 'second phase title',
        type: PhaseTypes.elimination,
        order: 2
      }
    ],
    teams: [],
    organization: {
      id: 'some-org-id',
      name: 'some org name',
      slug: 'some-org-slug'
    }
  };

  const action = getTournamentSuccess(apiTournament);

  it('sets currentPhaseId', () => {
    const newState = phaseReducer(initialState, action);

    expect(newState.currentPhaseId).toEqual('first-phase-id');
  });

  it('does not set currentPhaseId if tournament has no phase', () => {
    const action = getTournamentSuccess({
      ...apiTournament,
      phases: []
    });
    const newState = phaseReducer(initialState, action);

    expect(newState.currentPhaseId).toEqual('');
  });

  it('sets entities', () => {
    const newState = phaseReducer(initialState, action);

    expect(newState.phases['first-phase-id']).toEqual({
      id: 'first-phase-id',
      title: 'first phase title',
      type: PhaseTypes.elimination,
      isInProgress: true,
      order: 1
    });
    expect(newState.phases['second-phase-id']).toEqual({
      id: 'second-phase-id',
      title: 'second phase title',
      type: PhaseTypes.elimination,
      isInProgress: true,
      order: 2
    });
  });
});
