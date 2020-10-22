import React from 'react';
import { PlayerEntity } from '../Players/state';
import { PlayerStatEntity } from '../Tournaments/state';
import { PlayerStatsLogEntity } from './state';
import { TeamEntity } from '../Teams/state';

interface PlayerStatsLogRowProps {
  players: { [id: string]: PlayerEntity };
  playersStats: PlayerStatEntity[];
  playerStatLog: PlayerStatsLogEntity;
}

function PlayerStatsLogRow({
  players,
  playersStats,
  playerStatLog
}: PlayerStatsLogRowProps): React.ReactElement {
  return (
    <tr>
      <td
        style={{
          paddingLeft: '0',
          width: '225px'
        }}
      >
        {players[playerStatLog.playerId] &&
          players[playerStatLog.playerId].name}
      </td>

      {playersStats.map((playerStat: PlayerStatEntity) => (
        <td
          key={playerStat.id}
          className="has-text-centered"
          style={{ minWidth: '90px' }}
        >
          {playerStatLog.stats[playerStat.id]}
        </td>
      ))}
    </tr>
  );
}

const PlayerStatLogHeader: React.FC<{
  playetStatLog: PlayerStatEntity;
}> = ({ playetStatLog }) => (
  <th className="has-text-centered">{playetStatLog.title}</th>
);

interface ViewProps {
  players: { [id: string]: PlayerEntity };
  playersStats: PlayerStatEntity[];
  playerStatLogs: PlayerStatsLogEntity[];
  team: TeamEntity;
}

function View({
  players,
  playersStats,
  playerStatLogs,
  team
}: ViewProps): React.ReactElement {
  return (
    <div className="column is-12">
      <h2 className="subtitle">{team.name}</h2>

      <div className="table-container">
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th style={{ paddingLeft: '0' }}>Player</th>

              {playersStats.map((stat: PlayerStatEntity) => (
                <PlayerStatLogHeader key={stat.id} playetStatLog={stat} />
              ))}
            </tr>
          </thead>

          <tbody>
            {playerStatLogs.map((playerStatLog: PlayerStatsLogEntity) => (
              <PlayerStatsLogRow
                playerStatLog={playerStatLog}
                players={players}
                playersStats={playersStats}
                key={playerStatLog.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;