import React, { Fragment } from 'react';
import { StoreState } from '../store';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { draws } from '../Draws/selectors';
import { sortedEliminations } from '../Eliminations/selectors';
import { connect, ConnectedProps } from 'react-redux';
import withPhase from './support/withPhase';
import { PhaseTypes } from '../Phases/state';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import AdminMenu from '../Tournaments/AdminMenu';
import { default as DrawView } from '../Draws/View';
import { default as EliminationView } from '../Eliminations/View';
import { organizationBySlug } from '../Organizations/selectors';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    draws: draws(state.draws),
    eliminations: sortedEliminations(state.eliminations),
    organization: organizationBySlug(
      state.organizations,
      props.organizationSlug
    ),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    phases: sortedPhases(state.phases),
    teams: state.teams.teams
  };
};

const connector = connect(mapStateToProps);

type PhaseManageProps = ConnectedProps<typeof connector> & OwnProps;

const PhaseManage: React.FC<PhaseManageProps> = ({
  draws,
  eliminations,
  organization,
  organizationSlug,
  phase,
  phases,
  teams,
  tournamentSlug
}) => {
  const MainContent =
    phase.type === PhaseTypes.elimination ? (
      <EliminationView
        {...{
          eliminationStats: phase.eliminationStats,
          eliminations,
          teams
        }}
      />
    ) : (
      <DrawView {...{ draws, teams }} />
    );

  return (
    <Fragment>
      <div className="column is-12">
        <TopBreadcrumbs
          organization={organization}
          organizationSlug={organizationSlug}
          phases={phases}
          tournamentSlug={tournamentSlug}
        />
      </div>

      <div className="column is-12">
        <div className="columns is-multiline">
          <div className="column">{MainContent}</div>

          <div className="is-divider-vertical is-hidden-tablet-only"></div>

          <aside className="column is-4-desktop is-12-tablet">
            <AdminMenu
              organizationSlug={organizationSlug}
              tournamentSlug={tournamentSlug}
              phase={phase}
            />
          </aside>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(withPhase<PhaseManageProps>(PhaseManage));
