import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEditorData, clearEditorState, getEditorById } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Col, Row, Button, Radio, Tabs, Icon, Tag, Input, Tooltip, Spin } from 'antd'
import { Redirect } from 'react-router-dom'
import BlogEditor from './BlogEditor'
import BlogPreview from './BlogPreview'
import NavBar from './NavBar'
import { 
    CompositeDecorator, 
    convertToRaw, 
    EditorState, 
    RichUtils, 
    ContentState,
    convertFromRaw,
    Entity
} from 'draft-js'

class EditBlogPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            tags: [],
            inputValue: '',
            inputVisible: false,
            isLoading: true,
            redirectTo: '',
            redirect: false,
            
        }
    }

    componentWillMount() {
        if(this.props.location.state){
            this.props.getEditorById(this.props.location.state.topic._id).then(() => {
                this.setState({ 
                    isLoading: false,
                    tags: this.props.editorData.tags,
                    title: this.props.editorData.title,
                    
                })
            })
        }else{
            this.setState({ redirect: true })
        }
    }

    componentWillUnMount() {
        this.props.clearEditorState()
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag)
        this.setState({ tags })
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus())
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        })
    }

    addInput = () => {
        const { tags, inputValue, inputVisible, title } = this.state 
        return (
            <Col md={{span:24}}>
                { !this.state.tags.length?<Tag color={'#FBBB69'}>Sample tag</Tag>:''}
                { tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={index} 
                            color={'orange'}
                            style={{marginRight:'10px', marginTop: 'l'}}
                            closable
                            afterClose={() => this.handleClose(tag)}>
                            #{ isLongTag ? `${tag.slice(0, 20)}...` : tag }
                        </Tag>
                    )
                    return isLongTag ? <Tooltip key={index} title={ tag }>{tagElem}</Tooltip> : tagElem
                    })
                }
                { inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={inputStyle}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                { !inputVisible && 
                    <Input 
                        onFocus={this.showInput} 
                        placeholder={' New Tag'}
                        style={inputStyle}
                    /> 
                }
            </Col>
        )
    }

    saveInputRef = input => this.input = input

    saveEditorData = () => {
        return this.props.updateEditorData(this.props.editorData._id, JSON.stringify(this.props.editorState), this.state.title, this.state.tags).then(response => {
            this.setState({ redirectTo: response.data.editor._id })
            this.props.clearEditorState()
            // console.log(this.props.editorData.comment[0].text)
        })

        
    }

    render() {
        const { tags, inputValue, inputVisible, title } = this.state 

        return (
            
            <div>
                
                <NavBar location={this.props.location} />
                <Row className={'editorBlock'} style={{background: '#f9f9f9'}}>
                    { this.state.isLoading? <div className="spinLoader"><Spin /></div> :
                    
                    <ReactCSSTransitionGroup
                        transitionName="page"
                        transitionAppear={true}
                        transitionAppearTimeout={400}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <Row style={{padding: 20}}>
                            <Col span={22} offset={1}>
                                <ReactCSSTransitionGroup
                                    transitionName="editorPreview"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={300}>
                                    <Row style={{ background: '#f9f9f9', marginBottom:0}}>
                                        <Col md={{span:11}}>
                                            <Input placeholder={'Enter Blog title...'} 
                                                style={{ width: 400, height: 34, marginLeft: 0 }}
                                                className={'editor'}
                                                required="required" 
                                                value={this.state.title}
                                                onChange={e => this.setState({ title: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                    <Tabs size={'small'}>
                                        <Tabs.TabPane key={1} tab={<span><Icon type="edit" />Write</span>}>
                                            <BlogEditor editorRaw={JSON.parse(this.props.editorData.editorRaw)}/>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane className={'editor'} key={2} tab={<span><Icon type="desktop" />Preview</span>}>
                                            <BlogPreview editorRaw={this.props.editorState} />
                                        </Tabs.TabPane>
                                    </Tabs>
                                    {this.addInput()}
                                    <Button type={'primary'} icon={'check'} onClick={this.saveEditorData}>
                                        Save
                                    </Button>
                                    
                                </ReactCSSTransitionGroup>
                            </Col>
                        </Row>
                    </ReactCSSTransitionGroup>}
                </Row>
                {this.state.redirect?<Redirect to={`/list`}/>:''}
                {this.state.redirectTo?<Redirect to={`/detail/${this.state.redirectTo}`}/>:''}
            </div>
        )
    }
}

const inputStyle = {
    width: 100, 
    height: 28, 
    marginTop: 5,
    marginBottom: 10,
    border: '1px solid #ddd',
    marginBottom: '2em',
    boxShadow:  '0px 1px 8px -3px #ABABAB'
}

const page = {
    write: 'write',
    preview: 'preview'
}

const mapStateToProps = state => {
    return {
        user: state.auth.get('user'),
        editorData: state.editor.get('detailDisplay'),
        editorState:  state.editor.get('editorState')
    }
}

export default connect(mapStateToProps, { updateEditorData, clearEditorState, getEditorById })(EditBlogPage)