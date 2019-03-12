import * as GamesActions from './games.actions';

export interface GamesState {
  data: {};
  // TODO: make games interface
  platforms: {};
  loading: boolean;
  error: any;
}
export const initialState = {
  // gameStats: {
  //   timeRemaining: 0,
  //   incompletePercentage: 0,
  //   numberCompleted: 0,
  //   completedPercentage: 0,
  // },
  loading: false,
  error: null
};

export function gamesReducer(
  state = initialState,
  action: GamesActions.ActionsUnion
) {
  switch (action.type) {
    case GamesActions.ActionTypes.GET_GAMES: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case GamesActions.ActionTypes.GET_GAMES_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    }

    case GamesActions.ActionTypes.GET_GAMES_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Error loading games'
      };
    }

    case GamesActions.ActionTypes.GET_PLATFORMS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case GamesActions.ActionTypes.GET_PLATFORMS_SUCCESS: {
      return {
        ...state,
        platforms: action.payload,
        loading: false
      };
    }

    case GamesActions.ActionTypes.GET_PLATFORMS_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Error loading platforms'
      };
    }

    default: {
      return state;
    }
  }
}
