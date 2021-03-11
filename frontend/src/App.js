import logo from './logo.svg'
import './App.css'
import React from 'react'
import API from './api'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brandList: null
        }
    }

    componentDidMount() {
        API.get('/getBrands')
            .then(json => json.data)
            .then(data => {
                this.setState({
                    brandList: data.brands
                })
            })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                      Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      Learn React
                    </a>
                </header>
            </div>
        )
    }
}

export default App
