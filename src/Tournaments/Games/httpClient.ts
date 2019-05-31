import { DEFAULT_HEADERS, resolveResponse } from '../../Shared/httpClient';
import { TournamentGameEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentGamesApi = (tournamentId: string) => (
  `${TOURNAMENT_API}/${tournamentId}/games`
);

const deleteRequest = (tournamentId: string, tournamentGameId: string) => {
  const url = `${tournamentGamesApi(tournamentId)}/${tournamentGameId}`;

  return fetch(url, { method: 'DELETE' }).then(resolveResponse);
};

const getAll = (tournamentId: string) => {
  const url = `${tournamentGamesApi(tournamentId)}`;

  return fetch(url).then(resolveResponse);
};

const getOne = (tournamentId: string, tournamentGameId: string) => {
  const url = `${tournamentGamesApi(tournamentId)}/${tournamentGameId}`;

  return fetch(url).then(resolveResponse);
};

const patch = (tournamentId: string, tournamentGame: TournamentGameEntity) => {
  const url = `${tournamentGamesApi(tournamentId)}/${tournamentGame.id}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'PATCH',
    body: JSON.stringify({
      tournament_game: {
        game: {
          away_score: tournamentGame.game.awayScore,
          away_team_name: tournamentGame.game.awayTeamName,
          datetime: tournamentGame.game.datetime,
          home_score: tournamentGame.game.homeScore,
          home_team_name: tournamentGame.game.homeTeamName,
          location: tournamentGame.game.location
        }
      }
    })
  }).then(resolveResponse);
};

const post = (tournamentId: string, tournamentGame: TournamentGameEntity) => {
  const url = `${tournamentGamesApi(tournamentId)}`;

  return fetch(url, {
    headers: DEFAULT_HEADERS,
    method: 'POST',
    body: JSON.stringify({
      tournament_game: {
        game: {
          away_score: tournamentGame.game.awayScore,
          away_team_name: tournamentGame.game.awayTeamName,
          datetime: tournamentGame.game.datetime,
          home_score: tournamentGame.game.homeScore,
          home_team_name: tournamentGame.game.homeTeamName,
          location: tournamentGame.game.location
        }
      }
    })
  }).then(resolveResponse);
};

export default {
  delete: deleteRequest,
  getAll,
  getOne,
  patch,
  post,
};