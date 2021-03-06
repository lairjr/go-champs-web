import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postElimination } from '../Eliminations/effects';
import { default as EliminationForm } from '../Eliminations/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_ELIMINATION, EliminationEntity } from '../Eliminations/state';
import { StoreState } from '../store';
import AdminMenu from '../Tournaments/AdminMenu';
import arrayMutators from 'final-form-arrays';
import withPhase from './support/withPhase';
import { PhaseEntity } from '../Phases/state';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { Mutator } from 'final-form';
import { teamsForSelectInput } from '../Teams/selectors';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import { postingElimination } from '../Eliminations/selectors';
import { Trans } from 'react-i18next';

interface OwnProps {
  basePhaseManageUrl: string;
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

type StateProps = {
  isPostingElimination: boolean;
  phase: PhaseEntity;
  selectInputTeams: SelectOptionType[];
};

type DispatchProps = {
  postElimination: (
    elimination: EliminationEntity,
    phaseId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    isPostingElimination: postingElimination(state.eliminations),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      postElimination
    },
    dispatch
  );
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    postElimination: (elimination: EliminationEntity) =>
      dispatchProps.postElimination(elimination, stateProps.phase.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type EliminationNewProps = ConnectedProps<typeof connector>;

const EliminationNew: React.FC<EliminationNewProps> = ({
  basePhaseManageUrl,
  isPostingElimination,
  organizationSlug,
  phase,
  postElimination,
  selectInputTeams,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>newElimination</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postElimination}
              initialValues={DEFAULT_ELIMINATION}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<EliminationEntity>;
                }
              }
              render={(props: FormRenderProps<EliminationEntity>) => (
                <EliminationForm
                  {...props}
                  backUrl={`${basePhaseManageUrl}/Eliminations`}
                  isLoading={isPostingElimination}
                  push={props.form.mutators.push}
                  selectInputTeams={selectInputTeams}
                  stats={phase.eliminationStats}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          phase={phase}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
};

export default connector(withPhase<EliminationNewProps>(EliminationNew));
