import { gamesRef } from '../firebase'

import {
ADD_GAME,
ADD_GAME_SUCCESS,
REMOVE_GAME,
REMOVE_GAME_SUCCESS,
} from './types';

export function addGame(game) {
  gamesRef.push(game)
  return {
    type: ADD_GAME
  }
}

export function addGameSuccess(gameData) {
  return {
    type: ADD_GAME_SUCCESS,
    gameData: gameData
  }
}

export function removeGame(id) {
  gamesRef.child(id).remove()
  return {
    type: REMOVE_GAME,
  }
}

export function removeGameSuccess(id) {
  return {
    type: REMOVE_GAME_SUCCESS,
    id: id
  }
}
