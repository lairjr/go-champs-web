import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { default as accountReducer } from './Accounts/reducer';
import { AccountState } from './Accounts/state';
import { default as drawsReducer } from './Draws/reducer';
import { DrawState } from './Draws/state';
import { default as eliminationsReducer } from './Eliminations/reducer';
import { EliminationState } from './Eliminations/state';
import { default as tournamentGameReducer } from './Games/reducer';
import { GameState } from './Games/state';
import { default as organizationReducer } from './Organizations/reducer';
import { OrganizationState } from './Organizations/state';
import { default as tournamentPhaseReducer } from './Phases/reducer';
import { PhaseState } from './Phases/state';
import { default as teamReducer } from './Teams/reducer';
import { TeamState } from './Teams/state';
import { default as tournamentReducer } from './Tournaments/reducer';
import { TournamentState } from './Tournaments/state';

export interface StoreState {
  account: AccountState;
  draws: DrawState;
  eliminations: EliminationState;
  games: GameState;
  organizations: OrganizationState;
  phases: PhaseState;
  teams: TeamState;
  tournaments: TournamentState;
}

export default createStore(
  combineReducers({
    account: accountReducer,
    draws: drawsReducer,
    eliminations: eliminationsReducer,
    games: tournamentGameReducer,
    organizations: organizationReducer,
    phases: tournamentPhaseReducer,
    teams: teamReducer,
    tournaments: tournamentReducer
  }),
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk))
);
