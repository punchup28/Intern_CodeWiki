import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input } from 'antd'
import { 
    CompositeDecorator, 
    convertToRaw, 
    Editor, 
    EditorState, 
    ContentState,
    convertFromRaw,
    DefaultDraftBlockRenderMap,
} from 'draft-js'
import Immutable from 'immutable'
import {stateToHTML} from 'draft-js-export-html'
import { Description, SubDescription, findEntities, decorators } from './editor/decorator/DescriptionDecorator'
import { blockRenderMap, colorStyleMap } from './editor/styles'

class  BlogPreview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            decorator: new CompositeDecorator(decorators)
        }
    }

    render() {
        const editorStateFromRedux = EditorState.createWithContent(convertFromRaw(this.props.editorRaw), this.state.decorator)

        return (
            <div>
                <Row gutter={8}>
                    <Col span={24}>
                        <div>
                            <Editor
                                editorState={editorStateFromRedux}
                                blockRenderMap={blockRenderMap}
                                customStyleMap={colorStyleMap}
                                readOnly
                            /> 
                        </div>
                    </Col>
                </Row> 
                
            </div>
            
            
            
        )
    }
}

export default BlogPreview