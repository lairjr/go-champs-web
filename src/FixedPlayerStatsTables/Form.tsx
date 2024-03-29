import React, { Fragment } from 'react';
import { Field, FormRenderProps, FieldRenderProps } from 'react-final-form';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import {
  FixedPlayerStatsTableEntity,
  DEFAULT_FIXED_PLAYER_STATS_ROW,
  FixedPlayerStatsRecordEntity
} from './state';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';
import { FieldArray } from 'react-final-form-arrays';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import StringInput from '../Shared/UI/Form/StringInput';
import { required } from '../Shared/UI/Form/Validators/commonValidators';

interface FixedPlayerStatsRowProps {
  name: string;
  onMoveDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMoveUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onRemove: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectInputPlayers: SelectOptionType[];
}

const FixedPlayerStatsRow: React.FC<FixedPlayerStatsRowProps> = ({
  name,
  onMoveDown,
  onMoveUp,
  onRemove,
  selectInputPlayers
}) => {
  return (
    <Fragment>
      <tr>
        <td
          style={{
            minWidth: '150px',
            paddingLeft: 0,
            width: '250px'
          }}
        >
          <Field
            name={`${name}.playerId`}
            render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
              <SelectInput {...props} options={selectInputPlayers} />
            )}
          />
        </td>

        <td>
          <Field name={`${name}.value`} component={StringInput} type="text" />
        </td>
      </tr>

      <tr>
        <td style={{ verticalAlign: 'middle' }}>
          <span className="is-italic">
            <Trans>actions</Trans>
          </span>
        </td>

        <td className="has-text-right">
          <div className="columns is-mobile">
            <div className="column is-3 has-text-centered">
              <button
                className="button"
                data-tooltip="Move up"
                onClick={onMoveUp}
              >
                <i className="fas fa-arrow-up" />
              </button>
            </div>

            <div className="column is-3 has-text-centered">
              <DoubleClickButton
                className="button has-tooltip-top"
                onClick={onRemove}
              >
                <i className="fas fa-trash" />
              </DoubleClickButton>
            </div>

            <div className="column is-3 has-text-centered">
              <button
                className="button"
                data-tooltip="Move down"
                onClick={onMoveDown}
              >
                <i className="fas fa-arrow-down" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

interface FieldArrayActions {
  value: any[];
  remove: (index: number) => void;
  swap: (indexA: number, indexB: number) => void;
}

const onRemovePlayerStat = (items: FieldArrayActions, index: number) => (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  event.preventDefault();
  return items.remove(index);
};

const onMoveUpPlayerStat = (items: FieldArrayActions, index: number) => (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  event.preventDefault();
  if (index === 0) {
    return;
  }
  return items.swap(index, index - 1);
};

const onMoveDownPlayerStat = (items: FieldArrayActions, index: number) => (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  event.preventDefault();
  if (index === items.value.length - 1) {
    return;
  }
  return items.swap(index, index + 1);
};

interface FromProps extends FormRenderProps<FixedPlayerStatsTableEntity> {
  backUrl: string;
  isLoading: boolean;
  push: (fieldName: string, playerStat: FixedPlayerStatsRecordEntity) => {};
  selectInputPlayerStats: SelectOptionType[];
  selectInputPlayers: SelectOptionType[];
}

const Form: React.FC<FromProps> = ({
  backUrl,
  isLoading,
  handleSubmit,
  submitting,
  pristine,
  push,
  selectInputPlayerStats,
  selectInputPlayers
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">
            <Trans>playerStats</Trans>
          </label>

          <div className="control">
            <Field
              name="statId"
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <SelectInput {...props} options={selectInputPlayerStats} />
              )}
              validate={required}
            ></Field>
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>rows</Trans>
          </label>

          <FieldArray name="playerStats">
            {({ fields }) => (
              <div className="table-container">
                <table className="table is-fullwidth is-striped is-hoverable">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: '0', width: '225px' }}>
                        <Trans>player</Trans>
                      </th>
                      <th>
                        <Trans>value</Trans>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {fields.map((name, index) => (
                      <FixedPlayerStatsRow
                        key={name}
                        name={name}
                        selectInputPlayers={selectInputPlayers}
                        onMoveDown={onMoveDownPlayerStat(fields, index)}
                        onMoveUp={onMoveUpPlayerStat(fields, index)}
                        onRemove={onRemovePlayerStat(fields, index)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </FieldArray>

          <button
            className="button is-fullwidth  is-medium"
            type="button"
            onClick={() => push('playerStats', DEFAULT_FIXED_PLAYER_STATS_ROW)}
          >
            <Trans>addPlayerStat</Trans>
          </button>
        </div>

        <LoadingButton
          isLoading={isLoading}
          className="button is-primary"
          type="submit"
          disabled={submitting || pristine}
        >
          <Trans>save</Trans>
        </LoadingButton>
      </form>

      <Link to={backUrl}>
        <button className="button is-small is-info is-outlined">
          <span className="icon">
            <i className="fas fa-caret-left"></i>
          </span>

          <span>
            <Trans>back</Trans>
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Form;
