import React from 'react'
import PropTypes from 'prop-types'

// Our Layout Container
import Layout from './components/Layout'

// Our Application Routes
import routes from './routes/index'

const App = () => {
  return (
    <Layout>
      {routes}
    </Layout>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App