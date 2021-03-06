import { GameEntity, GameState, DEFAULT_GAME } from './state';

export const games = (state: GameState): GameEntity[] =>
  Object.keys(state.games)
    .map((key: string) => state.games[key])
    .sort(byGameDate);

export const gameDates = (state: GameState): string[] => {
  return games(state)
    .reduce((acc, game: GameEntity) => {
      const date = game.datetime.substring(0, 10);

      if (!acc.includes(date)) {
        return [...acc, date];
      }
      return acc;
    }, [] as string[])
    .sort();
};

//** Finds closer game date index. */
export const gamesCloserGameDatePosition = (state: GameState): number => {
  const currentDate = new Date().toISOString().substring(0, 10);

  const dates = gameDates(state);
  const lastIndex = dates.length - 1;
  if (currentDate > dates[lastIndex]) {
    return lastIndex;
  }

  for (let index = 0; index <= lastIndex; index++) {
    if (dates[index] === currentDate) {
      return index;
    } else if (dates[index] > currentDate) {
      return index;
    }
  }

  return 0;
};

export const gamesByDate = (
  state: GameState
): { [date: string]: GameEntity[] } => {
  const dates = gameDates(state);
  const allGames = games(state);

  return dates.reduce((acc, date: string) => {
    const gamesInDate = allGames
      .filter((game: GameEntity) => game.datetime.includes(date))
      .sort(byGameDate);
    return {
      ...acc,
      [date]: gamesInDate
    };
  }, {});
};

export const byGameDate = (gameA: GameEntity, gameB: GameEntity): number =>
  gameA.datetime.localeCompare(gameB.datetime);

export const gameById = (state: GameState, gameId: string) => {
  if (!gameId || !state.games[gameId]) {
    return DEFAULT_GAME;
  }
  return state.games[gameId];
};

export const gamesLoading = (state: GameState) => state.isLoadingRequestGames;
export const patchingGame = (state: GameState): boolean =>
  state.isLoadingPatchGame;
export const postingGame = (state: GameState): boolean =>
  state.isLoadingPostGame;
export const deletingGame = (state: GameState): boolean =>
  state.isLoadingDeleteGame;
