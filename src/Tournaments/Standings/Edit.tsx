import React from 'react';
import NavBar from '../Common/NavBar';
import { TournamentGroupEntity, TournamentGroupState } from '../Groups/state';
import { TournamentState } from '../state';
import { TournamentStatEntity, TournamentStatState } from '../Stats/state';
import { NO_GROUP_KEY } from '../Teams/reducer';
import { TournamentTeamEntity, TournamentTeamState } from '../Teams/state';

interface TournamentTeamStandingsRowProps {
  patchTournamentTeam: any;
  tournamentStats: { [key: string]: TournamentStatEntity };
  tournamentTeam: TournamentTeamEntity;
}

class TournamentTeamStandingsRow extends React.Component<
  TournamentTeamStandingsRowProps
> {
  readonly state: TournamentTeamEntity;

  constructor(props: TournamentTeamStandingsRowProps) {
    super(props);
    this.state = props.tournamentTeam;
  }

  render() {
    const { patchTournamentTeam, tournamentStats, tournamentTeam } = this.props;
    return (
      <tr>
        <td>{tournamentTeam.name}</td>
        {Object.keys(tournamentStats).map((key: string) => (
          <td key={key}>
            <input
              className="input"
              type="text"
              onChange={this.changeTournamentStat(key)}
              value={this.state.stats[key] || ''}
            />
          </td>
        ))}
        <td>
          <button
            className="button is-primary"
            onClick={() => patchTournamentTeam(this.state)}
          >
            Save
          </button>
        </td>
      </tr>
    );
  }

  changeTournamentStat = (statId: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      ...this.state,
      stats: {
        ...this.state.stats,
        [statId]: event.currentTarget.value
      }
    });
  };
}

const StandingHeader: React.FC<{ tournamentStat: TournamentStatEntity }> = ({
  tournamentStat
}) => <th>{tournamentStat.title}</th>;

const Standings: React.FC<{
  patchTournamentTeam: any;
  tournamentStats: { [key: string]: TournamentStatEntity };
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}> = ({ patchTournamentTeam, tournamentStats, tournamentTeams }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          {Object.keys(tournamentStats).map((key: string) => (
            <StandingHeader key={key} tournamentStat={tournamentStats[key]} />
          ))}
          <th>Save</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(tournamentTeams).map((key: string) => (
          <TournamentTeamStandingsRow
            key={key}
            patchTournamentTeam={patchTournamentTeam}
            tournamentStats={tournamentStats}
            tournamentTeam={tournamentTeams[key]}
          />
        ))}
      </tbody>
    </table>
  );
};

const GroupStandings: React.FC<{
  patchTournamentTeam: any;
  tournamentGroup: TournamentGroupEntity;
  tournamentStats: { [key: string]: TournamentStatEntity };
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}> = ({
  patchTournamentTeam,
  tournamentGroup,
  tournamentStats,
  tournamentTeams
}) => {
  return (
    <div>
      <div className="columns">
        <div className="column is-12">
          <h5 className="subtitle">{tournamentGroup.name}</h5>
        </div>
      </div>
      <Standings
        patchTournamentTeam={patchTournamentTeam}
        tournamentStats={tournamentStats}
        tournamentTeams={tournamentTeams}
      />
    </div>
  );
};

interface TournamentStandingsEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  patchTournamentTeam: any;
  tournamentGroupState: TournamentGroupState;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
  tournamentTeamState: TournamentTeamState;
}

export const Edit: React.FC<TournamentStandingsEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  patchTournamentTeam,
  tournamentGroupState,
  tournamentState,
  tournamentStatState,
  tournamentTeamState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];

  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-12">
            <h2 className="subtitle">Edit Tournament Standings</h2>
          </div>
        </div>
        {tournamentTeamState.tournamentTeamsByGroup[NO_GROUP_KEY] && (
          <Standings
            patchTournamentTeam={patchTournamentTeam}
            tournamentStats={tournamentStatState.tournamentStats}
            tournamentTeams={
              tournamentTeamState.tournamentTeamsByGroup[NO_GROUP_KEY]
            }
          />
        )}
        {Object.keys(tournamentTeamState.tournamentTeamsByGroup)
          .filter((key: string) => key !== NO_GROUP_KEY)
          .map((key: string) => (
            <GroupStandings
              key={key}
              patchTournamentTeam={patchTournamentTeam}
              tournamentGroup={tournamentGroupState.tournamentGroups[key]}
              tournamentStats={tournamentStatState.tournamentStats}
              tournamentTeams={tournamentTeamState.tournamentTeamsByGroup[key]}
            />
          ))}
      </div>
    </div>
  );
};

export default Edit;
