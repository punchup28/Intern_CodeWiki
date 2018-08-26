import React from 'react'
import { Link } from 'react-router-dom'
import { Tag, Col } from 'antd'
import { searchTopic } from '../actions'

const TagList = props => (
    //<Link to={'/tag'}>
        <Tag color='#FBBB69' style={{marginRight: 5, marginTop: 5, cursor: 'pointer'}}>
            #{props.tag}
        </Tag>
    //</Link>
)

const AddTag = props => {
    <Col md={{span:24}}>
        { !props.tags.length?<Tag color={'#FBBB69'}>Sample tag</Tag>:''}
        { props.tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
                <Tag key={index} 
                    color={'orange'}
                    style={{marginRight:'10px', marginTop: 'l'}}
                    closable
                    afterClose={() => props.handleClose(tag)}>
                    #{ isLongTag ? `${tag.slice(0, 20)}...` : tag }
                </Tag>
            )
            return isLongTag ? <Tooltip key={index} title={ tag }>{tagElem}</Tooltip> : tagElem })
        }
        { inputVisible && (
            <Input
                ref={props.saveInputRef}
                type="text"
                size="small"
                style={inputStyle}
                value={inputValue}
                onChange={props.handleInputChange}
                onBlur={props.handleInputConfirm}
                onPressEnter={props.handleInputConfirm}
            />
        )}
        { !inputVisible && 
            <Input 
                onFocus={props.showInput} 
                placeholder={' New Tag'}
                style={inputStyle}
            /> 
        }
    </Col>
}

export {
    TagList,
    AddTag
}