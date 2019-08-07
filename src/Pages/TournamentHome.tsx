import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import {
  deleteTournamentGame,
  requestTournamentGames
} from '../Tournaments/Games/actions';
import { TournamentGameState } from '../Tournaments/Games/state';
import { deleteTournamentGroup } from '../Tournaments/Groups/actions';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import Home from '../Tournaments/Home';
import { TournamentState } from '../Tournaments/state';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { deleteTournamentTeam } from '../Tournaments/Teams/actions';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentHomeProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  deleteTournamentGame: any;
  deleteTournamentGroup: any;
  deleteTournamentTeam: any;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
  tournamentGroupState: TournamentGroupState;
  tournamentTeamState: TournamentTeamState;
  tournamentStatState: TournamentStatState;
  requestTournament: any;
  requestTournamentGames: any;
}

class TournamentHome extends React.Component<TournamentHomeProps> {
  render() {
    const {
      match,
      tournamentState,
      tournamentGameState,
      tournamentGroupState,
      tournamentTeamState,
      tournamentStatState
    } = this.props;
    return (
      <Home
        currentOrganizationSlug={match.params.organizationSlug}
        currentTournamentSlug={match.params.tournamentSlug}
        tournamentState={tournamentState}
        tournamentGameState={tournamentGameState}
        tournamentGroupState={tournamentGroupState}
        tournamentTeamState={tournamentTeamState}
        tournamentStatState={tournamentStatState}
      />
    );
  }

  componentDidMount() {
    const tournamentId = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ].id;
    this.props.requestTournament(tournamentId);
    this.props.requestTournamentGames(tournamentId);
  }
}

const mapStateToProps = (state: any) => ({
  tournamentState: state.tournaments,
  tournamentGameState: state.tournamentGames,
  tournamentGroupState: state.tournamentGroups,
  tournamentTeamState: state.tournamentTeams,
  tournamentStatState: state.tournamentStats
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      deleteTournamentGame: deleteTournamentGame(tournamentId),
      deleteTournamentGroup: deleteTournamentGroup(tournamentId),
      deleteTournamentTeam: deleteTournamentTeam(tournamentId),
      requestTournamentGames: requestTournamentGames(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentHome)
);
