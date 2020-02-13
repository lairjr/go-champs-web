import React from 'react';
import { withPhase } from './support/withPhase';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { StoreState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import {
  gameDates,
  gamesByDate,
  gamesCloserGameDatePosition,
  gamesLoading
} from '../Games/selectors';
import { allEliminationStats } from '../Phases/EliminationStats/selectors';
import { allDraws } from '../Draws/selectors';
import { allElimination } from '../Eliminations/selectors';
import { default as DrawView } from '../Draws/View';
import { default as GameListByDate } from '../Games/ListByDate';
import { default as EliminationView } from '../Eliminations/View';
import { PhaseTypes } from '../Phases/state';
import ComponentLoader from '../Shared/UI/ComponentLoader';

interface OwnProps {
  phaseId: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    gamesByDate: gamesByDate(state.games),
    gamesInitialDatePosition: gamesCloserGameDatePosition(state.games),
    gamesLoading: gamesLoading(state.games),
    gameDates: gameDates(state.games),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    eliminationStats: allEliminationStats(state.eliminationStats),
    draws: allDraws(state.draws),
    eliminations: allElimination(state.eliminations),
    teams: state.teams.teams
  };
};

const connector = connect(mapStateToProps);

type PhaseHomeProps = ConnectedProps<typeof connector>;

const PhaseActualHome: React.FC<PhaseHomeProps> = ({
  gameDates,
  gamesByDate,
  gamesInitialDatePosition,
  gamesLoading,
  phase,
  eliminationStats,
  draws,
  eliminations,
  teams
}) => {
  const MainContent =
    phase!.type === PhaseTypes.elimination ? (
      <EliminationView
        {...{
          eliminationStats,
          eliminations,
          teams
        }}
      />
    ) : (
      <DrawView {...{ draws }} />
    );

  return (
    <div className="column is-12">
      <div className="columns is-multiline">
        <div className="column">{MainContent}</div>

        <div className="is-divider-vertical"></div>

        <aside className="column is-4">
          <ComponentLoader canRender={!gamesLoading} loader={'Loading'}>
            <GameListByDate
              dates={gameDates}
              gamesByDate={gamesByDate}
              initialDatePosition={gamesInitialDatePosition}
            />
          </ComponentLoader>
        </aside>
      </div>
    </div>
  );
};

export default connector(withPhase<PhaseHomeProps>(PhaseActualHome));
