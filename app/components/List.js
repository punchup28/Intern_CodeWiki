import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Row, Col, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { TagList } from './Tag'
import { searchTopic } from '../actions'

class List extends Component {
    render(){
        const { topics } = this.props
        
        return (
            <div>
                { topics.map((topic, index) => (
                    <div key={index} className={'tpList'}>
                        <ReactCSSTransitionGroup
                            transitionName='synopsis'
                            transitionAppear={true}
                            transitionAppearTimeout={700}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            <Row type='flex'>
                                <Col md={18} xs={24}>
                                    <Link to={`/detail/${topic._id}`} className={'topicDetail'}>
                                        <h2>{ topic.title }</h2>
                                    </Link>
                                </Col>
                                <Col md={4} xs={12}>
                                    <span style={{color: '#8F8E7C'}}>{ new Date(topic.createdAt).toDateString() } </span>
                                </Col>
                                <Col md={2} xs={12}>
                                    <span style={{color: '#8F8E7C', float: 'right'}}>{ topic.owner.ownerName }</span>
                                </Col>
                            </Row>
                            <Row type='flex'>
                                <Col md={{span:24}}>
                                    { topic.tags.map((tag, index) => <TagList tag={tag} key={index} />) }
                                </Col>
                            </Row>
                        </ReactCSSTransitionGroup>
                    </div>
                )) }
            </div>
        )
    }
}

export default List