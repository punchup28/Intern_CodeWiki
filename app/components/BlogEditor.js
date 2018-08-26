import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Row, Col, Button, Input, Tooltip, Affix, Modal, Tag } from 'antd'
import { 
    CompositeDecorator, 
    convertToRaw, 
    EditorState, 
    RichUtils, 
    ContentState,
    convertFromRaw,
    Entity
} from 'draft-js'
import { 
    FaBold, 
    FaItalic, 
    FaUnderline, 
    FaCode, 
    FaStrikethrough,
    FaListOl,
    FaListUl
} from 'react-icons/lib/fa'
import { GoMarkdown } from 'react-icons/lib/go'
import { AlreadyDescription, MiddleDescription } from './editor/decorator/DescriptionComponent'
import Editor from 'draft-js-plugins-editor'
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import { DescriptionInput, ButtonBar  } from './editor/DescriptionInput'
import { SubDescriptionInput } from './editor/SubDescriptionInput'
import { LinkInput  } from './editor/LinkInput'
import { Description, SubDescription, findEntities, decorators } from './editor/decorator/DescriptionDecorator'
import { blockRenderMap, colorStyleMap } from './editor/styles'

class BlogEditor extends Component {
    constructor(props) {
        super(props)

        const decorator = new CompositeDecorator(decorators)

        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(this.props.editorState), decorator),
            showDesInput: false,
            decorator: new CompositeDecorator(decorators),
            desValue: '',
            description: '',
            subDesButton: false,
            isActive: false,


            subValue: '',

            showURLInput: false,
            urlValue: '',
            url:'',
        }

        this.focus = () => this.refs.editor.focus()
        
        this.onChange = (editorState) => {
            this.setState({editorState})
            this.props.storeEditorState(convertToRaw(editorState.getCurrentContent()))
        }

        const options = {
            breakoutBlocks: ['CustomCodeBlock']
        }

        this.plugins = [
            createBlockBreakoutPlugin(options),
            createImagePlugin(),
            createMarkdownShortcutsPlugin()
        ]

        this.onDesChange = (e) => this.setState({desValue: e.target.value})
        this.onSubChange = (e) => this.setState({subValue: e.target.value})
        this.onURLChange = (e) => this.setState({urlValue: e.target.value})
    
    }
        
    

    componentWillMount() {
        if(this.props.editorRaw) {
            this.setState({
                editorState: EditorState.createWithContent(convertFromRaw(this.props.editorRaw), this.state.decorator)
            })
        }
    }

    //Description

    _promptForDescription = e => {
        e.preventDefault()
        const { editorState } = this.state
        const selection = editorState.getSelection()
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent()
            const startKey = editorState.getSelection().getStartKey()
            const startOffset = editorState.getSelection().getStartOffset()
            const blockWithDescriptionAtBeginning = contentState.getBlockForKey(startKey)
            const descriptionKey = blockWithDescriptionAtBeginning.getEntityAt(startOffset)
            let description = ''
            if (descriptionKey) {
                this.setState({ subDesButton: true })
                const descriptionInstance = contentState.getEntity(descriptionKey)
                description = descriptionInstance.getData().description
            }
            this.setState({
                showDesInput: true,
                desValue: description,
                
                
            }, () => {
                setTimeout(() => this.refs.description.focus(), 0)
            })
        }
    }

    _confirmDescription = (e, draftType, draftData, resetBlogType) => {
        e.preventDefault()
        let draftEntityData = {}
        const {editorState, desValue} = this.state
        const contentState = editorState.getCurrentContent()
         draftEntityData.description = desValue
           
        const contentStateWithEntity = contentState.createEntity(
            draftType,
            'MUTABLE',
            draftEntityData
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            descriptiom: '',
            showDesInput: false,
            desValue: '',
            subDesButton: false,
            subValue: '',
            
        }, () => {
            if(resetBlogType){ this.resetBlogType() }
            setTimeout(() => this.refs.editor.focus(), 0)
        })
    }


    // Sub

    _promptForSubDescription = e => {
        e.preventDefault()
        const { editorState } = this.state
        const selection = editorState.getSelection()
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent()
            const startKey = editorState.getSelection().getStartKey()
            const startOffset = editorState.getSelection().getStartOffset()
            const blockWithDescriptionAtBeginning = contentState.getBlockForKey(startKey)
            const descriptionKey = blockWithDescriptionAtBeginning.getEntityAt(startOffset)
            let subdescription = ''
            if (descriptionKey) {
                this.setState({ subDesButton: true })
                const descriptionInstance = contentState.getEntity(descriptionKey)
                subdescription = descriptionInstance.getData().subdescription
            }
            this.setState({
                showSubInput: true,
                subValue: subdescription,
            }, () => {
                setTimeout(() => this.refs.subdescription.focus(), 0)
            })
        }
    }

    _confirmSubDescription = (e, draftType, draftData, resetBlogType) => {
        e.preventDefault()
        let draftEntityData = {}
        const {editorState, subValue} = this.state
        const contentState = editorState.getCurrentContent()
        draftEntityData.subDescription = subValue
        const contentStateWithEntity = contentState.createEntity(
            draftType,
            'MUTABLE',
            draftEntityData
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            desValue: '',
            subValue: '',
            subDesButton: false,
            showSubInput: false,
        }, () => {
            if(resetBlogType){ this.resetBlogType() }
            setTimeout(() => this.refs.editor.focus(), 0)
        })
    }
    
    //Link

    _promptForLink = e => {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
          const contentState = editorState.getCurrentContent();
          const startKey = editorState.getSelection().getStartKey();
          const startOffset = editorState.getSelection().getStartOffset();
          const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
          const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
          let url = '';
          if (linkKey) {
            const linkInstance = contentState.getEntity(linkKey);
            url = linkInstance.getData().url;
          }
          this.setState({
            showURLInput: true,
            urlValue: url,
          }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
          });
        }

          console.log('1')
      }
      _confirmLink = e => {
        e.preventDefault();
        const {editorState, urlValue} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'LINK',
          'MUTABLE',
          {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
          editorState: RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
          ),
          showURLInput: false,
          urlValue: '',
        }, () => {
          setTimeout(() => this.refs.editor.focus(), 0);
        });

        console.log('2')
      }

    async resetBlogType() {
        await this._onClickBlogType(changeBlogTypeElement.default)
        await this._onClickBlogType(changeBlogTypeElement.cb)
    }

    _onDescriptionInputKeyDown = e => {
        if (e.which === 13) {
            this._confirmDescription(e, 'DESCRIPTION', 'description', true)
        }
    }
    
    _onSubDescriptionInputKeyDown = e => {
        if (e.which === 13) {
            this._confirmSubDescription(e, 'SUB_DESCRIPTION', 'subDescription', false)
        }
    }

    _onLinkInputKeyDown = e => {
        if (e.which === 13) {
          this._confirmLink(e);
        }
    }

    _removeDescription = e => {
        e.preventDefault()
        const {editorState} = this.state
        const selection = editorState.getSelection()
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            })
        }
    }
    

    _onClickInlineStyle = event =>  {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, event))
        this.setState({isActive: true})
    }

    _onClickBlogType = event => this.onChange(RichUtils.toggleBlockType(this.state.editorState, event))

    render() {
        const { showDesInput, editorState, desValue, isActive, showSubInput, subValu, showURLInput, urlValue } = this.state
        const BlogType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType()
        
        return (
            <div className={'root'}>
                <Affix>
                    <div style={{background: '#f9f9f9' ,paddingTop: 5, paddingBottom: 5, marginBottom: 10}}>
                        <Button.Group style={{marginRight: 10, marginBottom: 10}}>
                            { blockTypeText.map((data, index) => <Button key={index} type={BlogType===data.value?'primary':''}  onClick={() => this._onClickBlogType(data.value)}>{data.text}</Button>) }
                        </Button.Group>

                        <Button.Group style={{marginRight: 10, marginBottom: 10}}>
                            { changeInlineElement.map((data, index) => <Button key={index} type={editorState.getCurrentInlineStyle().has(data.value)?'primary':''} onClick={() => this._onClickInlineStyle(data.value)}>{data.icon}</Button>) }
                        </Button.Group>

                        <Button.Group style={{marginRight: 10, marginBottom: 10}}>
                            { blockTypeOrder.map((data, index) => <Button key={index} type={BlogType===data.value?'primary':''} onClick={() => this._onClickBlogType(data.value)}>{data.icon}</Button>) }
                        </Button.Group>


                        {/* Description  */}

                        <Button.Group style={{marginRight: 10, marginBottom: 10}}>
                            <Button onMouseDown={this._promptForDescription} type={ BlogType === 'CustomCodeBlock' ? 'primary':'' } icon={'edit'}>
                                { BlogType === 'CustomCodeBlock' ? 'Edit Description' : 'Add Description' }
                            </Button>

                            { BlogType === 'CustomCodeBlock' ? 
                                <Button onMouseDown={this._promptForSubDescription}  icon={'tag'}> Add SubDescription
                                </Button>
                                : null
                            }


                            
                            <Button icon={'delete'} onClick={() => this._onClickBlogType(changeBlogTypeElement.default)} onMouseDown={this.removeDescription}>
                                Remove Description
                            </Button>
                        </Button.Group>

                        <Button.Group style={{marginRight: 10, marginBottom: 10}}>
                            <Button icon={'star'} onMouseDown={this._promptForLink}>
                                Link                            
                            </Button>
                        </Button.Group>

                        <Tooltip placement="topLeft" title="Allowed Markdown">
                            <Button style={{marginRight: 10, marginBottom: 10}}><GoMarkdown size={15} /></Button>
                        </Tooltip>

                        <Button icon={'info'} type={'primary'} shape={'circle'} style={{marginRight: 10, marginBottom: 10}}/>
                    </div>
                </Affix>
                <Row gutter={8}>
                    <Col span={ showDesInput?12:24 }>
                        <div className={'editor'} onClick={this.focus}>
                            <Editor
                                {...this.props}
                                decorators={decorators}
                                editorState={editorState}
                                onChange={this.onChange}
                                placeholder={"Enter some text..."}
                                ref={"editor"}
                                customStyleMap={colorStyleMap}
                                blockRenderMap={blockRenderMap}
                                plugins={this.plugins}
                            />
                        </div>
                    </Col>
                    <Col span={ showDesInput?12:0 }>
                        <Modal 
                            visible={showDesInput} 
                            title={'Insert Description'}
                            onOk={this._confirmDescription}
                            onCancel={() => this.setState({ showDesInput: false })}
                            footer={null}
                        >
                            <DescriptionInput 
                                _confirmDescription={this._confirmDescription} 
                                showInput={() => this.setState({ showDesInput: false })}>
                                <Input
                                    onChange={this.onDesChange}
                                    ref={"description"}
                                    className={'desInput'}
                                    type={"textarea"}
                                    placeholder={'Please enter your description'}
                                    value={desValue}
                                    onKeyDown={this._onDescriptionInputKeyDown}
                                />
                            </DescriptionInput>
                        </Modal>
                    </Col>
                    <Col span={ showSubInput?12:0 }>
                        <Modal 
                            visible={showSubInput} 
                            title={'Insert Sub-description'}
                            onOk={this._confirmSubDescription}
                            onCancel={() => this.setState({ showSubInput: false })}
                            footer={null}
                        >
                            <SubDescriptionInput 
                                _confirmSubDescription={this._confirmSubDescription} 
                                //subDesButton={this.state.subDesButton} 
                                showInput={() => this.setState({ showSubInput: false })}>
                                
                                <Input
                                    
                                    onChange={this.onSubChange}
                                    id={"subdescription"}
                                    ref={"subdescription"}
                                    className={'subInput'}
                                    type={"textarea"}
                                    placeholder={'Please enter your Sub-description'}
                                    //value={subValue}
                                    onKeyDown={this._onSubDescriptionInputKeyDown}
                                    onFocus={this.value}
                                />
                            </SubDescriptionInput>
                        </Modal>
                    </Col>
                    <Col span={ showURLInput?12:0 }>
                        <Modal 
                            visible={showURLInput} 
                            title={'Insert Url'}
                            onOk={this._confirmLink}
                            onCancel={() => this.setState({ showURLInput: false })}
                            footer={null}
                        >
                        
                            <LinkInput
                                
                                _confirmLink = {this._confirmLink}>
                                
                                <Input

                                    onChange={this.onURLChange}
                                    ref={"url"}
                                    className={'urlInput'}
                                    type={"textarea"}
                                    placeholder={'https://'}
                                    value={urlValue}
                                    onKeyDown={this._onLinkInputKeyDown}
                                />
                            </LinkInput>
                        </Modal>
                    </Col>
                </Row>
            </div>
        )
    }

}

const changeInlineElement = [
    { value: 'BOLD', icon: <FaBold size={12} /> },
    { value: 'ITALIC', icon: <FaItalic size={11} /> },
    { value: 'UNDERLINE', icon: <FaUnderline size={12} /> },
    { value: 'CODEBLOCK', icon: <FaCode size={15} /> },
    { value: 'STRIKETHROUGH', icon: <FaStrikethrough size={12} /> }
]

const blockTypeText = [
    { value: 'header-one', text: 'h1' },
    { value: 'header-two', text: 'h2' },
    { value: 'header-three', text: 'h3' },
    { value: 'unstyled', text: 'unstyled' }
]

const blockTypeOrder = [
    { value: 'ordered-list-item', icon: <FaListOl size={12} /> },
    { value: 'unordered-list-item', icon: <FaListUl size={12} /> }
]

const changeBlogTypeElement = {
    default: 'unstyled',
    blockquote: 'blockquote',
    codeBlock: 'code-block',
    hr: 'hr',
    cb: 'CustomCodeBlock'
}

const mapStateToProps = state => {
    return { 
        editorState: state.editor.get('editorState'), 
        blockRender: state.editor.get('blockRender'), 
    }
}

export default connect(mapStateToProps, actions)(BlogEditor)