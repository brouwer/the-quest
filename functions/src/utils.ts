// these utils are largely copied from the frontend
// some minor changes were made to make them work in the backend
// we dont use the flat current time because we want to be able to
// calculate a precise amount of points
// some values are returned in Ms instead of seconds and minutes like in frontend

export enum GameStatus {
  Inactive,
  PleaseWait,
  GotoStart,
  Game,
  Between,
  Over,
}

export const gameSetup = (
  ongoing: boolean,
  startTime: Date,
  currentTime: Date,
  minBefore: number,
  secTeamBefore: number,
  minBetween: number,
  minGame: number,
  totalGames: number,
  tryingPost: number,
  teamPosts: number[],
) => {
  const realStart = realStartTime(startTime, minBefore, minBetween)
  const flatCurrent = Math.ceil(currentTime.getTime() / 1000) * 1000
  const msElapsedReal = elapsedMs(realStart, currentTime.getTime())
  const msElapsed = elapsedMs(realStart, flatCurrent)
  const minElapsed = elapsedMin(msElapsed)
  const minCycle = cycleTime(minBetween, minGame)
  const currentGame = Math.floor(minElapsed / minCycle) + 1
  const msElapsedCurrentCycle = elapsedCurrentCycle(
    msElapsedReal,
    minBetween,
    minGame,
    currentGame,
    cycleTimeMs(minBetween, minGame),
  )
  let currentGameNormalized = currentGame
  if (currentGameNormalized > totalGames) currentGameNormalized = totalGames
  if (currentGameNormalized < 1) currentGameNormalized = 1

  let nextGame = currentGameNormalized + 1
  if (nextGame > totalGames) nextGame = -1

  const teamPost = teamPosts[currentGameNormalized - 1]

  const gameStatus = calcGameStatus(
    ongoing,
    currentGame,
    totalGames,
    startTime,
    currentTime,
    secTeamBefore,
    minCycle,
    minElapsed,
    minBetween,
    minGame,
  )

  const isSubmittable = submittable(
    tryingPost,
    teamPost,
    gameStatus,
    minBetween,
    msElapsedCurrentCycle,
  )

  return {
    gameStatus,
    msElapsedCurrentCycle,
    isSubmittable,
  }
}

export const realStartTime = (
  startTime: Date,
  minBefore: number,
  minBetween: number,
) => {
  return startTime.getTime() + minBefore * 60000 - minBetween * 60000
}

export const elapsedMs = (startTime: number, currentTime: number) => {
  return Math.floor(currentTime - startTime)
}

export const elapsedMin = (milliseconds: number) => {
  return Math.floor(milliseconds / 60000)
}

export const cycleTime = (between: number, game: number) => {
  return between + game
}

export const cycleTimeMs = (between: number, game: number) => {
  return cycleTime(between, game) * 60000
}

export const elapsedCurrentCycle = (
  msElapsed: number,
  minBetween: number,
  minGame: number,
  currentGame: number,
  msCycleTime: number,
) => {
  // always returns a positive countdown (Abs) in milliseconds
  // if we have a negative elapsed, it means the game hasn't started yet, and the cycle time is the time until the game starts
  if (msElapsed < 0) return Math.abs(Math.floor(msElapsed - minBetween * 60000))

  const currentCycle = Math.floor(
    msElapsed - (currentGame - 1) * msCycleTime - minBetween * 60000,
  )

  // if we're in the between time, the current cycle is negative, so we need to return the absolute value of the current cycle
  if (currentCycle < 0) return Math.abs(currentCycle)

  // if we're in the game time, we need to return the time left in the game
  return minGame * 60000 - currentCycle
}

export const calcGameStatus = (
  ongoing: boolean,
  currentGame: number,
  totalGames: number,
  startTime: Date,
  currentTime: Date,
  secTeamBefore: number,
  minCycle: number,
  minElapsed: number,
  minBetween: number,
  minGame: number,
) => {
  if (!ongoing) return GameStatus.Inactive
  if (currentGame > totalGames) return GameStatus.Over
  if (startTime.getTime() + secTeamBefore * 1000 > currentTime.getTime())
    return GameStatus.PleaseWait
  if (minElapsed < minBetween) return GameStatus.GotoStart
  const timeInCycle = minElapsed - (currentGame - 1) * minCycle
  if (timeInCycle < minBetween) {
    return GameStatus.Between
  } else {
    const gameEndTime = (currentGame - 1) * minCycle + minBetween + minGame
    if (minElapsed < gameEndTime) {
      return GameStatus.Game
    } else if (currentGame < totalGames) {
      return GameStatus.Between
    } else {
      return GameStatus.Game
    }
  }
}

export const submittable = (
  tryingPost: number,
  currentPost: number,
  gameStatus: GameStatus,
  minBetween: number,
  msElapsedCurrentCycle: number,
): boolean => {
  if (tryingPost == currentPost && gameStatus == GameStatus.Game) {
    return true
  }

  if (
    gameStatus == GameStatus.Between &&
    tryingPost == currentPost - 1 &&
    minBetween * 60000 - msElapsedCurrentCycle < 30000
  ) {
    // if game is between and we're trying to submit the previous post, and the previous post is less than 30 seconds old
    // we allow the submission
    return true
  }

  return false
}
