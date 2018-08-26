import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Row, Col, Tag, Button } from 'antd'
import { Link } from 'react-router-dom'
import { TagList } from './Tag'

import { connect } from 'react-redux'
import { deleteMyTopic } from '../actions'

class MyList extends Component {

    onDeleteTopic (id) {
        console.log('Delete Clicked on OBJ ID : ' + id )
        this.props.deleteMyTopic(id).then(() => window.location.reload())
        

        
    
}

    render(){
        const { topics , user } = this.props

        return (
            <div >
                { topics.map((topic, index) => (
                    <div key={index}>
                        <ReactCSSTransitionGroup
                            transitionName='synopsis'
                            transitionAppear={true}
                            transitionAppearTimeout={700}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            <Row type='flex' justify="space-around" style={{borderBottom: '1px dashed orange', marginBottom: 10, paddingBottom: 5}}>
                                <Col md={16} xs={24}>

                                    <Link to={`/detail/${topic._id}`} style={{color: 'black', fontSize: 10, fontWeight: 'bold'}}>
                                        {console.log(topic.title.length)}
                                        <h2>{topic.title.length>15?`${topic.title.slice(0, 15)}...`:topic.title}</h2>
                                    </Link>


                                </Col>
                                <Col md={2} xs={24} style={{margin: '5px'}}>
                                    <Link to={{
                                        pathname: '/edit',
                                        state: { topic }
                                    }}>
                                        {console.log('MyList :' + topic)}
                                        {console.log('user : ' + user._id)}
                                        <Button type={'primary'} icon="edit" shape="circle" />
                                    </Link>
                                    
                                </Col>
                                <Col md={2} xs={24} style={{margin: '5px'}}>
                                        
                                        <Button type={'primary'} icon="delete" shape="circle" onClick={()=> this.onDeleteTopic(topic._id) }/>
                                        
                                    
                                </Col>
                            </Row>
                        </ReactCSSTransitionGroup>
                    </div>
                )) }
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return { editorData: state.editor.get('detailDisplay') }
// }

export default connect(null, { deleteMyTopic }) (MyList)