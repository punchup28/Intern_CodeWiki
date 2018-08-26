import React, { Component } from 'react'
import { Row, Col, Tag, Spin, Input, } from 'antd'
import NavBar from '../components/NavBar'
import BlogPreview from '../components/BlogPreview'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { EditorState, convertToRaw } from 'draft-js'
import { connect } from 'react-redux'
import { getEditorById, saveComment, getCommentById } from '../actions'
import { TagList } from './Tag'
import '../assets/editor.scss'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import Comment from '../components/CommentShow'

class ReadingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            comment: '',
            user: '',  

            
        }
    }

    SaveComment = () => {
        //this.setState({user : this.props.username})
        console.log('ID was commented : ' +  this.props.user._id)
        console.log('Name : ' +  this.props.user.username)
        console.log('comment : ' + this.state.comment)
        console.log('Topic ID ' + this.props.editorData._id)
        
        
        return this.props.saveComment(this.state.comment, this.props.user.username ,  this.props.editorData._id).then(this.setState({comment:''}))
        
    }


    componentWillMount() {
        this.props.getEditorById(this.props.match.params.id).then(() => {
            this.setState({ isLoading: false })
        })
    }

    // componentWillMount() {
    //     this.props.getCommentById(this.props.match.params.id).then(() => {
    //         this.setState({ isLoading: false })
    //     })
    // }

    render() {
        const { title, editorRaw, createdAt, owner, ownerId, ownerName, tags, _id, comment} = this.props.editorData
        const { TextArea } = Input
    
        
        return (
            
            <div style={{ backgroundColor: '#f9f9f9', height: '100%' , marginTop: 120 }}>
                <NavBar location={this.props.location} />
                
                <Link to={'/list'} >
                    <Button style={{ position: 'absolute', marginLeft: 80 , marginTop: 20 , backgroundColor: '#FBBB69', margin: '30 px', color: 'white' }}>TOPICS</Button>
                </Link>
                <br /><br />
                {this.state.isLoading ? <div className="spinLoader"><Spin /></div> :
                    <div>
                    <div className={'detail'}>
                        {console.log('Topic ID : ' + _id)}
                        <Row>
                            <Col md={24}>
                                <h1 style={{ fontSize: '28px' }}>{title}</h1>
                            </Col>
                            <Col md={12}>
                                {tags.map((tag, index) => <TagList tag={tag} key={index} />)}
                            </Col>

                            <Col md={12}>
                            <span className={'author'}> Author : {owner.ownerName}</span>
                                {console.log('ownerId :' + owner.ownerName)}
                                {console.log('ownerId :' + owner.ownerId)}
                               
                                
                            </Col>
                            <Col>
                                
                                <span className={'author'}>
                                    {new Date(createdAt).toDateString()}
                                </span>
                            </Col>
                            
                        </Row>
                        <br /><hr />
                        <ReactCSSTransitionGroup
                            transitionName="editorPreview"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            <BlogPreview editorRaw={JSON.parse(editorRaw)} />
                        </ReactCSSTransitionGroup>
                        
                    </div>

                    <div>
                        <Comment/>
                    </div>
                    

                    {this.props.isLoggedIn?
                    <div className={'commentBox'}>
                        
                        <Row>
                            <Col md={24}>
                                <h1 style={{ fontSize: '28px' }}>Comment</h1>
                            </Col>
                            
                            <Col>
                                
                                <TextArea
                                    placeholder={'Comment...'}
                                    style={{ width: '100%', height: 80, marginLeft: 0 }}
                                    className={'comment'}
                                    value={this.state.comment}
                                    onChange={e => this.setState({ comment: e.target.value })}
                                    
                                />

                            </Col><br/>
                            <Button style={{backgroundColor : '#FBBB69', color: 'white' }} onClick={() => this.SaveComment()}>
                                Comment
                            </Button>
                        </Row>
                    </div>:null}
                    
                    </div>
                    
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        user : state.auth.get('user'),
        editorData: state.editor.get('detailDisplay'),
        isLoggedIn: state.auth.get('isLoggedIn') }
}

export default connect(mapStateToProps, { getEditorById , saveComment , getCommentById })(ReadingPage)