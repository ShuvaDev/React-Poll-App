import React from 'react'
import shortid from 'shortid'

import Form from './form'

const defaultOptions = [
    {id: shortid.generate(), value: '', vote: 0},
    {id: shortid.generate(), value: '', vote: 0}
]
class PollForm extends React.Component {
    state = {
        title: this.props.isUpdate ? this.props.poll.title : '',
        description: this.props.isUpdate ? this.props.poll.description : '',
        options: this.props.isUpdate ? this.props.poll.options : defaultOptions,
        errors: []
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleOption = (event, index) => {
        const options = [...this.state.options]
        options[index].value = event.target.value
        this.setState({options})
    }
    createOption = () => {
        const {options} = this.state
        
        if(options.length < 5) {
            options.push({
                id: shortid.generate(),
                value: '',
                vote: 0
            })
            this.setState({ options })
        } else {
            alert('You can create max 5 options!')
        }
    }
    deleteOption = index => {
        const { options } = this.state

        if(options.length > 2) {
            if(this.props.isUpdate && options[index].value) {
                this.props.decreamentTotalVote(this.props.poll.id, options[index].vote)
                options.splice(index, 1)
                this.setState({options})
            } else {
                options.splice(index, 1)
                this.setState({options})
            }
        }else {
            alert('You must have at least two options')
        }
    }
    handleSubmit = event => {
        event.preventDefault() 
        const {isValid, errors} = this.validate()
        if(isValid) {
            const {title, description, options} = this.state
            const poll = {
                title, 
                description,
                options
            }
            if(this.props.isUpdate) {
                poll.id = this.props.poll.id
                this.props.submit(poll)
                alert('Updated Successfully!')
            } else {
                this.props.submit({poll})
                event.target.reset()
                this.setState({title: '', description: '', options: defaultOptions, errors: {}})
            }
        } else {
            this.setState({errors})
        }
    }
    validate = () => {
        const errors = {}
        const {title, description, options} = this.state
        if(!title) {
            errors.title = 'Please Provide A Title'
        } else if(title.length < 20) {
            errors.title = 'Title Too Short'
        } else if(title.length > 100) {
            errors.title = 'Title Too Long'
        }
        if(!description) {
            errors.description = 'Please Provide A Description'
        } else if(description.length > 500) {
            errors.title = 'Description Too Long'
        } 
        const optionErrors = []
        options.forEach((opt, index) => {
            if(!opt.value) {
                optionErrors[index] = 'Option Text Empty'
                // optionErrors.push('Option Text Empty')
            } else if(opt.value > 100) {
                optionErrors[index] = 'Option Text Too Long'
                // optionErrors.push('Option Text Too Long')
            }
        })
        if(optionErrors.length > 0) {
            errors.options = optionErrors
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    }
    render() {
        const {title, description, options, errors} = this.state
        
        return (
            <Form
                title={title}
                description={description}
                options={options}
                errors={errors}
                buttonValue={this.props.buttonValue || 'Create Poll'}
                handleChange={this.handleChange}
                handleOptionChange={this.handleOption}
                createOption={this.createOption}
                deleteOption={this.deleteOption}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default PollForm