import React from 'react'
import {Modal, ModalHeader, ModalBody, ButtonGroup, Button, ListGroup, ListGroupItem} from 'reactstrap'

import ParticipentForm from './participate-form'
import PollForm from '../poll-form/'

class MainContent extends React.Component {
    state = {
        openModal: false,
        viewOpinion: 'all'
    }

    toggleModal = () => {
        this.setState({openModal: !this.state.openModal})
    }
    
    viewOpinion = () => {
        if(this.state.viewOpinion === 'all') {
            return this.props.poll.opinions
        }

        const {options} = this.props.poll
        let opinionFilter = null
        options.forEach(option => {
            if(option.value === this.state.viewOpinion) {
                const id = option.id
                opinionFilter = this.props.poll.opinions.filter(opinion => opinion.selectedOption === id)
                if(opinionFilter) {
                    return
                }        
            }
        })
        return opinionFilter
    }

    changeViewOpinion = opinion => {
        this.setState({viewOpinion: opinion})
    }

    render() {
        if(Object.keys(this.props.poll).length === 0) {
            return (
                <div>
                    <h3>Welcome to My Application.</h3>
                    <p>You can create as many poll as you want. Click the new button to create a new pool. To check details of a poll please select from the left sidebar. By selecting a poll you can check it's details, participate and check other opinion about this polls.  </p>
                </div>
            )
        }
        const {poll, getOpinion, updatePoll, deletePoll, decreamentTotalVote} = this.props
        return (
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br/>
                <ParticipentForm
                    poll={poll}
                    getOpinion={getOpinion}
                    deletePoll={deletePoll}
                    toggleModal={this.toggleModal}
                />
                <Modal isOpen={this.state.openModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Update Modal
                    </ModalHeader>
                     <ModalBody>
                        <PollForm
                            poll={poll}
                            isUpdate={true}
                            submit={updatePoll}
                            buttonValue='Update Poll'
                            decreamentTotalVote={decreamentTotalVote}
                        />
                     </ModalBody>
                </Modal>

                <div className='mt-4'>
                    <div className="d-flex">
                        <h3>Opinions</h3>
                        <ButtonGroup className='ml-auto'>
                            <Button color='primary' active={this.state.viewOpinion==='all'} onClick={() => this.changeViewOpinion('all')}>All</Button>
                            {poll.options.map(option => (
                                <Button color='primary' active={this.state.viewOpinion===option.value} onClick={() => this.changeViewOpinion(option.value)}>{option.value}</Button>
                            ))}
                        </ButtonGroup>
                    </div>

                    <ListGroup className='mt-3'>
                        {this.viewOpinion().length ? this.viewOpinion().map(opinion => (
                           <ListGroupItem key={opinion.id}>
                               {opinion.name}
                           </ListGroupItem>
                        )) : <h5 className='mt-4 text-danger'>No Opinion Found</h5>}
                    </ListGroup>
                </div>
                
            </div>
        )
    }
}

export default MainContent