// Actions
import * as weatherForecastsActions from "./actions/weatherforecasts"
import axios from "axios"
import {toastr} from 'react-redux-toastr'

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
    
    try {
      const response = await axios.get(url)
      if (response && response.status === 200) {
        toastr.success(`Network: ${response.statusText}`)
        const forecasts = await response.data
        dispatch({ 
          type: weatherForecastsActions.receiveWeatherForecasts, startDateIndex, forecasts 
        })
      }
    } catch(err) {
      toastr.error(`${err.message}`)
    }

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
