import './App.css'
import React from 'react'
import Modal from 'react-modal'
import API from './api'
import { BrandCreator } from './components'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brandList: null,
            creatorModalIsOpen: false,
            deleteModalIsOpen: false,
            deleteName: null
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
        Modal.setAppElement('#main')
        this.refreshBrandList()
    }

    handleCreateBrand() {
        this.setState({creatorModalIsOpen: true})
    }

    handleDeleteBrand() {
        API.delete('/deleteBrand?name='+ this.state.deleteName)
            .then(json => {
                console.log(json.data)
                this.setState({deleteModalIsOpen: false, deleteName: null})
                this.refreshBrandList()
            })
            .catch(error => console.log(error.response))
    }

    render() {
        const brandList = this.state.brandList
        let brands = null
        const modalStyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            content: {
                position: 'absolute',
                borderRadius: 15,
                padding: '20px',
                outline: 'none',
                overflow: 'auto',
                top: '70%',
                left: '50%',
                transform: 'translate(-50%, -130%)'
            }
        }

        console.log(brandList)
        if (Array.isArray(brandList) && brandList.length) {
            brands = <div>
                {
                    brandList.map((element, i) => {
                        return (
                            <div key={i} className="grid grid-cols grid-cols-6 border m-10 align-middle">
                                <div className="m-auto">
                                    {element.name}
                                </div>
                                <div className="m-auto">
                                    {element.type}
                                </div>
                                <div className="m-auto">
                                    {element.country}
                                </div>
                                <div className="m-auto">
                                    {element.description}
                                </div>
                                <div className="m-auto">
                                    {element.createdAt}
                                </div>
                                <button className="p-2 bg-red-500 text-white font-bold hover:bg-white hover:text-red-500 rounded-md m-4 border border-red-500 focus:outline-none" onClick={() => {
                                    this.setState({deleteName: element.name, deleteModalIsOpen: true})
                                }}>DELETE</button>
                            </div>
                        )
                    })
                }
            </div>
        } else {
            brands = <div>
                <b>You don't have any brand in your list.</b>
            </div>
        }

        return (
            <div className="App" id="main">
                <h1 className="text-2xl m-4">ModaResa Brands</h1>
                {brands}
                <button className="m-4 p-2 text-blue-400 border border-blue-400 rounded-md hover:bg-blue-400 hover:text-white focus:outline-none font-bold" onClick={this.handleCreateBrand.bind(this)}>ADD A BRAND</button>
                <Modal
                    isOpen={this.state.creatorModalIsOpen}
                    style={modalStyle}
                    onRequestClose={() => {this.setState({creatorModalIsOpen: false})}}
                >
                    <BrandCreator refreshFunction={this.refreshBrandList.bind(this)}/>
                </Modal>
                <Modal
                    isOpen={this.state.deleteModalIsOpen}
                    style={modalStyle}
                    onRequestClose={() => {this.setState({deleteModalIsOpen: false})}}
                >
                    <div className="text-center h-full">
                        Are you sure to delete this brand?
                        <div>
                            <button className="bg-red-500 rounded-md text-white font-bold m-2 p-2 border hover:border-red-500 hover:text-red-500 hover:bg-white focus:outline-none" onClick={() =>{this.handleDeleteBrand()} }>Yes, delete it.</button>
                            <button className="bg-white rounded-md text-blue-400 font-bold m-2 p-2 border border-blue-400 hover:bg-blue-400 hover:text-white focus:outline-none">Cancel</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default App
