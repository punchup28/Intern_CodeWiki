import React, { Component } from 'react'
import { Row, Col, Input, Card } from 'antd'
import NavBar from '../components/NavBar'
import MyTopicView from './HOC/MyTopicView'
import AllTopicView from './HOC/AllTopicView'
import { MdKeyboardArrowDown } from 'react-icons/lib/md'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux' 

class TopicList extends Component {

    render(){
        const { isLoggedIn } = this.props

        return(
            <div>
                <NavBar location={this.props.location} />
                <Row gutter={4} type="flex" justify="space-around">
                    {isLoggedIn?<Col md={5} xs={22}>
                        <div style={{marginTop:'140px', opacity:'0.98'}}>
                            <Card title={'My Topics'}>
                                <MyTopicView />
                            </Card>
                        </div>
                    </Col>:''}
                    <Col md={isLoggedIn?17:23} xs={22}>
                        <div style={{marginTop:'140px', opacity:'0.98'}}>
                            <Card title={'All Topics'}>
                                <AllTopicView />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        user: state.auth.get('user'),
        isLoggedIn: state.auth.get('isLoggedIn')
    }
}

export default connect(mapStateToProps)(TopicList)