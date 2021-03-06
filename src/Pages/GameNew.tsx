import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postGame } from '../Games/effects';
import { default as GameForm } from '../Games/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_GAME, GameEntity } from '../Games/state';
import { StoreState } from '../store';
import AdminMenu from '../Tournaments/AdminMenu';
import withPhase from './support/withPhase';
import { PhaseEntity } from '../Phases/state';
import { phaseByIdOrDefault } from '../Phases/selectors';
import { teamsForSelectInput } from '../Teams/selectors';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import { postingGame } from '../Games/selectors';
import { Trans } from 'react-i18next';

interface OwnProps {
  basePhaseManageUrl: string;
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

type StateProps = {
  isPostingGame: boolean;
  phase: PhaseEntity;
  selectInputTeams: SelectOptionType[];
};

type DispatchProps = {
  postGame: (
    game: GameEntity,
    phaseId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    isPostingGame: postingGame(state.games),
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    selectInputTeams: teamsForSelectInput(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      postGame
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
    postGame: (game: GameEntity) =>
      dispatchProps.postGame(game, stateProps.phase.id)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type GameNewProps = ConnectedProps<typeof connector>;

const GameNew: React.FC<GameNewProps> = ({
  basePhaseManageUrl,
  isPostingGame,
  organizationSlug,
  phase,
  postGame,
  selectInputTeams,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>newGame</Trans>
            </h2>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={postGame}
              initialValues={DEFAULT_GAME}
              render={(props: FormRenderProps<GameEntity>) => (
                <GameForm
                  {...props}
                  backUrl={`${basePhaseManageUrl}/Games`}
                  isLoading={isPostingGame}
                  selectInputTeams={selectInputTeams}
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

export default connector(withPhase<GameNewProps>(GameNew));
