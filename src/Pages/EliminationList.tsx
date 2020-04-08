import React, { Fragment } from 'react';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import AdminMenu from '../Tournaments/AdminMenu';
import { connect, ConnectedProps } from 'react-redux';
import { deleteElimination } from '../Eliminations/effects';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';
import withPhase from './support/withPhase';
import {
  eliminationsLoading,
  sortedEliminations
} from '../Eliminations/selectors';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import List, { ListLoading } from '../Eliminations/List';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import ListHeader from '../Shared/UI/ListHeader';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    eliminations: sortedEliminations(state.eliminations),
    eliminationsLoading: eliminationsLoading(state.eliminations),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    phases: sortedPhases(state.phases)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      deleteElimination
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type EliminationListProps = ConnectedProps<typeof connector> & OwnProps;

const EliminationList: React.FC<EliminationListProps> = ({
  deleteElimination,
  eliminations,
  eliminationsLoading,
  phase,
  phaseId,
  phases,
  organizationSlug,
  tournamentSlug
}) => {
  const baseUrl = `/${organizationSlug}/${tournamentSlug}/Manage/${phaseId}`;
  const newUrl = `${baseUrl}/NewElimination`;

  return (
    <Fragment>
      <div className="column is-12">
        <TopBreadcrumbs
          organizationSlug={organizationSlug}
          phases={phases}
          tournamentSlug={tournamentSlug}
        />
      </div>

      <div className="column is-12">
        <div className="columns is-multiline">
          <div className="column">
            <div className="columns is-vcentered is-mobile is-multiline">
              <ListHeader title="Eliminations" newUrl={newUrl} />

              <div className="column is-12">
                <ComponentLoader
                  canRender={!eliminationsLoading}
                  loader={<ListLoading />}
                >
                  <List
                    baseUrl={baseUrl}
                    deleteElimination={deleteElimination}
                    eliminations={eliminations}
                  />
                </ComponentLoader>
              </div>
            </div>
          </div>

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

export default connector(withPhase<EliminationListProps>(EliminationList));
