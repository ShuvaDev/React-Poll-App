import React from 'react'
import shortid from 'shortid'
import {Container, Row, Col} from 'reactstrap'

import MainContent from './components/main-content'
import Sidebar from './components/sidebar'

import POLLS from './data/polls'

class App extends React.Component {
    state = {
        polls: [],
        selectedPoll: {},
        searchTerm: ''
    }
    componentDidMount() {
        this.setState({polls: POLLS})
    }
    addNewPoll = poll => {
        poll.id = shortid.generate()
        poll.created = new Date()
        poll.totalVote = 0
        poll.opinions = []
        
        this.setState({polls: this.state.polls.concat(poll)})
    }
    updatePoll = updatedPoll => {
        const polls = [...this.state.polls]
        let poll = polls.find(p => p.id === updatedPoll.id)

        poll.title = updatedPoll.title
        poll.description = updatedPoll.description
        poll.options = updatedPoll.options

        this.setState({polls})
    }
    deletePoll = pollId => {
        const polls = this.state.polls.filter(p => p.id !== pollId)
        this.setState({polls, selectedPoll: {}})

    }
    selectPoll = pollId => {
        const poll = this.state.polls.find(p => p.id === pollId)
        this.setState({selectedPoll: poll})
    }
    handleSearch = value => {
        this.setState({searchTerm: value})
    }
    performSearch = () => {
        let filter =  this.state.polls.filter(poll => poll.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

        return filter
    }
    getOpinion =  response => {
         const {polls} = this.state
         const poll = polls.find(p => p.id === response.pollId)
         const option = poll.options.find(o => o.id === response.selectedOption)

         poll.totalVote++
         option.vote++
         const opinion = {
             id: shortid.generate(),
             name: response.name,
             selectedOption: response.selectedOption
         }
         poll.opinions.push(opinion)
         this.setState({polls})
    }
    decreamentTotalVote = (index, vote) => {
        const polls = [...this.state.polls]
        const poll = polls.find(p => p.id === index)
        poll.totalVote -=vote

        this.setState(polls)
    }
    render() {
        return (
            <Container className='my-5'>
                <Row>
                    <Col md={4}>
                        
                        <Sidebar
                            polls={this.performSearch()}
                            selectPoll={this.selectPoll}
                            searchTerm={this.state.searchTerm}
                            handleSearch={this.handleSearch}
                            submit={this.addNewPoll}
                        />
                    </Col>
                    <Col md={8}>
                        <MainContent
                            poll={this.state.selectedPoll}
                            getOpinion={this.getOpinion}
                            updatePoll={this.updatePoll}
                            deletePoll={this.deletePoll}
                            decreamentTotalVote={this.decreamentTotalVote}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default App