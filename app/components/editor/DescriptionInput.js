import React, { Component } from 'react'
import { Row, Col, Button, Input } from 'antd'

class DescriptionInput extends Component {
    constructor(props) {
        super(props)

        this.focus = () => this.refs.editor.description()
    }
    render() {
        return (
            <div className={'desInputContainer'}>
                <Row>
                    <Col span={24}>
                        {this.props.children}
                    </Col>
                </Row>
                <Row style={{paddingTop: 10}}>
                    <Col span={24}>
                        <Button style={{float: 'right', marginLeft: 5}} type={'default'} onMouseDown={() => this.props.showInput()} icon={'close'}>
                            Cancel
                        </Button>
                        {this.props.subDesButton?<Button style={{float: 'right', marginLeft: 5}} onMouseDown={(e) => this.props._confirmDescription(e, 'SUB_DESCRIPTION', 'subDescription', false)} icon={'tag'}>
                            Sub Description
                        </Button>:''}
                        <Button style={{float: 'right'}} type={'primary'} onMouseDown={(e) => this.props._confirmDescription(e, 'DESCRIPTION', 'description', true)} icon={'check'}>
                            Confirm
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export {
    DescriptionInput
}



