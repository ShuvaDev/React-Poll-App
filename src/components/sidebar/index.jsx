import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Modal, ModalHeader, ModalBody } from "reactstrap"

import PollList from './poll-list'
import PollForm from '../poll-form'

class Sidebar extends React.Component {
    state = {
        openModal: false
    }
    toggleModal = () => {
        this.setState({openModal: !this.state.openModal})
    }
    render() {
        return (
            <div style={{background: '#efefef', padding: '10px'}}>
                <div className="d-flex mb-5">
                    <Input
                        type='search'
                        placeholder='Search'
                        value={this.props.searchTerm}
                        onChange={e => this.props.handleSearch(e.target.value)}
                    />
                    <Button color='success' onClick={this.toggleModal} className='ml-2'>
                        New
                    </Button>
                </div>
                <h3>List of polls</h3>
                <hr/>
                <PollList
                    polls={this.props.polls}
                    selectPoll={this.props.selectPoll}
                />

                <Modal toggle={this.toggleModal} isOpen={this.state.openModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Create A New Poll
                    </ModalHeader>
                    <ModalBody>
                        <PollForm
                            submit={this.props.submit}
                            toggleModal={this.toggleModal}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
Sidebar.propTypes = {
    polls: PropTypes.array.isRequired,
    selectPoll: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
}

export default Sidebar