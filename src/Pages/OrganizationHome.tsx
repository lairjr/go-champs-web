import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import OrganizationEdit from './OrganizationEdit';
import TournamentList from './TournamentList';
import TournamentNew from './TournamentNew';
import { StoreState } from '../store';
import {
  organizationBySlug,
  organizationsLoading
} from '../Organizations/selectors';
import { connect, ConnectedProps } from 'react-redux';
import withOrganizations from './support/withOrganizations';
import { getOrganizations } from '../Organizations/effects';
import { bindActionCreators, Dispatch } from 'redux';
import AuthenticatedRoute from '../Accounts/AuthenticatedRoute';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  organization: organizationBySlug(
    state.organizations,
    props.match.params.organizationSlug
  ),
  organizationsLoading: organizationsLoading(state.organizations)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getOrganizations
    },
    dispatch
  );
const connector = connect(mapStateToProps, mapDispatchToProps);

type OrganizationHomeProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const OrganizationHome: React.FC<OrganizationHomeProps> = ({
  organization,
  match: {
    params: { organizationSlug }
  }
}) => {
  if (!organizationSlug) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <div className="columns is-multiline">
        <header className="column is-12">
          <h1 className="title">{organization.name}</h1>
        </header>

        <div className="column is-8">
          <Switch>
            <Route
              path={`/Organization/:organizationSlug/Edit`}
              render={(props: RouteComponentProps<RouteProps>) => (
                <AuthenticatedRoute>
                  <OrganizationEdit {...props} />
                </AuthenticatedRoute>
              )}
            />
            {/* Need to wrap on authenticated route */}
            <Route
              path={`/Organization/:organizationSlug/NewTournament`}
              component={TournamentNew}
            />
            <Route
              path={`/Organization/:organizationSlug/Tournaments`}
              render={(props: RouteComponentProps<RouteProps>) => (
                <AuthenticatedRoute>
                  <TournamentList {...props} />
                </AuthenticatedRoute>
              )}
            />
            <Route
              path={`/Organization/:organizationSlug`}
              render={(props: RouteComponentProps<RouteProps>) => (
                <AuthenticatedRoute>
                  <TournamentList {...props} />
                </AuthenticatedRoute>
              )}
            />
          </Switch>
        </div>

        <div className="column is-4">
          <aside className="menu">
            <p className="menu-label">General</p>

            <ul className="menu-list">
              <li>
                <a href={`/Organization/${organizationSlug}/Edit`}>
                  Informations
                </a>
              </li>

              <li>
                <a href={`/Organization/${organizationSlug}/Tournaments`}>
                  Tournaments
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default connector(withOrganizations(OrganizationHome));
