import './App.css'
import React from 'react'
import API from './api'
import { BrandCreator } from './components'

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
                console.log(data)
                this.setState({
                    brandList: data.brands
                })
            })
    }

    handleCreateBrand() {
        console.log('create brand')
    }

    render() {
        const brandList = this.state.brandList
        let brands = null

        if (Array.isArray(brandList) && brandList.length) {
            brands = <div>

            </div>
        } else {
            brands = <div>
                <b>You don't have any brand in your list.</b>
                <div>
                    <button onClick={this.handleCreateBrand}>Add a brand</button>
                </div>
            </div>
        }

        return (
            <div className="App">
                <h1>ModaResa Brands</h1>
                {brands}
                <BrandCreator/>
            </div>
        )
    }
}

export default App
