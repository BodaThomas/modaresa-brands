import React from 'react'
import API from '../api'

class BrandCreator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: null,
            type: null,
            country: null,
            desc: null
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        console.log(this.state.name, this.state.type, this.state.country, this.state.desc)
        API.post('/addBrand', {
            name: this.state.name,
            type: this.state.type,
            country: this.state.country,
            description: this.state.desc
        }).then(json => {
            console.log(json.data)
            this.props.refreshFunction()
        })
    }

    handleInputChange(event) {
        console.log(event.target.id)
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div className="flex items-center justify-center self-center m-auto">
                <div className="flex text-center m-auto items-center justify-center self-center">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="grid grid-cols-2 gap-2 text-center">
                            <label htmlFor="name">Name:</label>
                            <input id="name" onChange={this.handleInputChange.bind(this)} className="border rounded-md pr-2 pl-2"/>
                            <label htmlFor="type">Type:</label>
                            <input id="type" onChange={this.handleInputChange.bind(this)} className="border rounded-md pr-2 pl-2"/>
                            <label htmlFor="country">Country:</label>
                            <input id="country" onChange={this.handleInputChange.bind(this)} className="border rounded-md pr-2 pl-2"/>
                            <label htmlFor="desc">Description:</label>
                            <input id="desc" onChange={this.handleInputChange.bind(this)} className="border rounded-md pr-2 pl-2"/>
                        </div>
                        <button type="submit" className="m-4 p-2 text-green-400 border border-green-400 rounded-md hover:bg-green-400 hover:text-white focus:outline-none">
                        Create the brand
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default BrandCreator
