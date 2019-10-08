import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from "reactstrap"
import { actionCreators } from '../store/WeatherForecasts'
import { toastr } from 'react-redux-toastr'

function renderForecastsTable(props) {
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {props.forecasts.map(forecast =>
          <tr key={forecast.dateFormatted}>
            <td>{forecast.dateFormatted}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

function renderPagination(props) {
  const prevStartDateIndex = (props.startDateIndex || 0) - 5
  const nextStartDateIndex = (props.startDateIndex || 0) + 5

  return (
    <div className='clearfix text-center'>
      <Link className='btn btn-default pull-left' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
      <Link className='btn btn-default pull-right' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>

      {props.isLoading && <Spinner color="primary" ></Spinner>}
    </div>
  )
}

class FetchData extends Component {
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched()
  }

  componentDidUpdate() {
    // This method is called when the route parameters change
    this.ensureDataFetched()
  }

  ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0

    // Call our actionCreator method to fetch out data
    this.props.requestWeatherForecasts(startDateIndex)
  }

  render() {
    const {
      isLoading
    } = this.props

    if (!isLoading) {
      toastr.success('Success', 'Received Data')
    }

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        { !isLoading ? renderForecastsTable(this.props) : <Spinner color="primary" ></Spinner> }
        { !isLoading ? renderPagination(this.props) : [] }
      </div>
    )
  }
}

// Connect this component to the redux store, and fetch our data
export default connect(
  state => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData)
