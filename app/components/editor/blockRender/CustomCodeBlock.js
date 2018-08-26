import React, { Component } from 'react'
import { Row, Col } from 'antd'
import '../../../assets/editor.scss'

class CustomCodeBlock extends Component {

    constructor(props) {
        super(props)

        this.state = {
            description: ''
        }
    }

    componentWillMount(){ 
        const { selection, contentState } = this.props.children[0].props.children.props
        const startKey = this.props.children[0].key
        const startOffset = selection.getStartOffset()
        const blockWithDescriptionAtBeginning = contentState.getBlockForKey(startKey)
        const descriptionKey = blockWithDescriptionAtBeginning.getEntityAt(startOffset)
        if(descriptionKey){
            this.setState({
                description: contentState.getEntity(descriptionKey).getData().description
            })
        }
    }

    render() {
        const { description } = this.state

        return (
        <div className={'wrap-code-des'}>
            <Row gutter={8}>
                <Col span={description?12:24} style={styles.code}>{this.props.children}</Col>
                <Col span={description?12:0}><div>{description}</div></Col>
            </Row>
        </div>
        )
    }
}

const styles = {
    code: {
        backgroundColor: '#f2f2f2', 
        paddingLeft: 16,
        paddingTop: 5,
        paddingBottom: 5,
        borderLeftStyle: 'solid',
        borderLeftWidth: 'thick',
        borderLeftColor: '#f5d773',
        borderRadius: 1.5
    }
}

export default CustomCodeBlock