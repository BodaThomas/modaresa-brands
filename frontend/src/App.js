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
        this.refreshBrandList.bind(this)
    }

    refreshBrandList() {
        API.get('/getBrands')
            .then(json => json.data)
            .then(data => {
                console.log(data)
                this.setState({
                    brandList: data.brands
                })
            })
    }

    componentDidMount() {
        this.refreshBrandList()
    }

    handleCreateBrand() {
        console.log('create brand')
    }

    handleDeleteBrand(element) {
        console.log('delete', {...element})
        API.delete('/deleteBrand?name='+ element.name)
            .then(json => {
                console.log(json.data)
                this.refreshBrandList()
            })
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
                                <button className="p-4 bg-red-500" onClick={() => {
                                    this.handleDeleteBrand(element)
                                }}>DELETE</button>
                            </div>
                        )
                    })
                }
            </div>
        } else {
            brands = <div>
                <b>You don't have any brand in your list.</b>
                <div>
                    <button className="p-2 text-blue-400 border border-blue-400 rounded-md hover:bg-blue-400 hover:text-white focus:outline-none" onClick={this.handleCreateBrand}>ADD A BRAND</button>
                </div>
            </div>
        }

        return (
            <div className="App">
                <h1>ModaResa Brands</h1>
                {brands}
                <BrandCreator refreshFunction={this.refreshBrandList.bind(this)}/>
            </div>
        )
    }
}

export default App
