import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import Top from '../Tournaments/Common/Top';
import {
  phaseById,
  phaseLoading,
  sortedPhases
} from '../Tournaments/Phases/selectors';
import { TournamentPhaseEntity } from '../Tournaments/Phases/state';
import { tournamentBySlug } from '../Tournaments/selectors';
import { TournamentEntity } from '../Tournaments/state';
import PhaseHome from './PhaseHome';
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';
import withPhase from './support/withPhase';

interface PhaseSelectedHomeProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  phase: TournamentPhaseEntity | undefined;
  phases: TournamentPhaseEntity[];
  phaseLoading: boolean;
  tournament: TournamentEntity;
}

class PhaseSelectedHome extends React.Component<PhaseSelectedHomeProps> {
  render() {
    const {
      match: {
        params: { organizationSlug, tournamentSlug },
        url
      },
      phase,
      phases,
      phaseLoading,
      tournament
    } = this.props;
    return (
      <PageLoader canRender={!phaseLoading}>
        <div className="columns is-multiline">
          <header className="column is-12">
            <Top
              {...{
                organizationSlug,
                phase: phase!,
                phases,
                tournament,
                tournamentSlug
              }}
            />
          </header>
          <div className="column is-12">
            <Switch>
              <Route path={url} component={PhaseHome} />
            </Switch>
          </div>
        </div>
      </PageLoader>
    );
  }
}

const mapStateToProps = (state: StoreState, props: PhaseSelectedHomeProps) => {
  const {
    match: {
      params: { tournamentSlug }
    }
  } = props;
  return {
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    phase: phaseById(state.tournamentPhases, props.match.params.phaseId),
    phases: sortedPhases(state.tournamentPhases),
    phaseLoading: phaseLoading(state.tournamentPhases)
  };
};

export default withPhase(connect(mapStateToProps)(PhaseSelectedHome));