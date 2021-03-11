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

    handleDeleteBrand(element) {
        console.log('delete', {...element})
        API.delete('/deleteBrand?name='+ element.name)
            .then(json => console.log(json.data))
            .catch(error => console.log(error.response))
    }

    render() {
        const brandList = this.state.brandList
        let brands = null

        console.log(brandList)
        if (Array.isArray(brandList) && brandList.length) {
            brands = <div>
                {
                    brandList.map((element, i) => {
                        return (
                            <div key={i}>
                                {element.name}
                                {element.type}
                                {element.country}
                                {element.description}
                                {element.createdAt}
                                <button onClick={() => this.handleDeleteBrand(element)}>Delete</button>
                            </div>
                        )
                    })
                }
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
