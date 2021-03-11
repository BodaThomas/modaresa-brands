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
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input id="name" onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="type">Type:</label>
                        <input id="type" onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="country">Country:</label>
                        <input id="country" onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="desc">Description:</label>
                        <input id="desc" onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <button type="submit">
                        Create the brand
                    </button>
                </form>
            </div>
        )
    }
}

export default BrandCreator
