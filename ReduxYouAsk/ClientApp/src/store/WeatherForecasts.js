// Actions
import * as weatherForecastsActions from "../actions/weatherforecasts"

const initialState = { forecasts: [], isLoading: false }

// create the action, and fetch the data
export const actionCreators = {
  requestWeatherForecasts: startDateIndex => async (dispatch, getState) => {
    if (startDateIndex === getState().weatherForecasts.startDateIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return
    }

    dispatch({
      type: weatherForecastsActions.requestWeatherForecasts,
      startDateIndex
    })

    const url = `api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`
    const response = await fetch(url)
    const forecasts = await response.json()

    dispatch({
      type: weatherForecastsActions.receiveWeatherForecasts,
      startDateIndex, forecasts
    })
  }
}

export const reducer = (state, action) => {
  state = state || initialState

  if (action.type === weatherForecastsActions.requestWeatherForecasts) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true
    }
  }

  if (action.type === weatherForecastsActions.receiveWeatherForecasts) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      forecasts: action.forecasts,
      isLoading: false
    }
  }

  return state
}
