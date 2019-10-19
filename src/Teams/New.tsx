import React from 'react';
import { Form } from 'react-final-form';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { TournamentState } from '../Tournaments/state';
import { default as TeamForm } from './Form';

interface TeamNewProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  postTeam: any;
  tournamentPhaseState: PhaseState;
  tournamentState: TournamentState;
}

export const New: React.FC<TeamNewProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  phase,
  postTeam,
  tournamentPhaseState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">New Team</h2>
          </div>
        </div>
        <Form
          onSubmit={postTeam}
          initialValues={{ name: '' }}
          render={TeamForm}
        />
      </div>
    </div>
  );
};

export default New;