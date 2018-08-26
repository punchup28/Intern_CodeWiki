import React, { Component } from 'react'
import { Row, Col, Tag, Spin, Input, } from 'antd'
import { connect } from 'react-redux'
import { getEditorById, saveComment} from '../actions'
import '../assets/editor.scss'

class CommentShow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            comment: '',
            user: '',  

            
        }
    }

    render() {
        
    
        return (
            <div>
                {/* {console.log('++' + this.props.editorData.owner.ownerName)}
                { console.log('+' + this.props.user.username)} */}
            {this.props.editorData.comment.map((comments, index) => (
                
                comments.commentOwner === this.props.editorData.owner.ownerName ?

                <div className={'Writercomment'} key={index} >
    
                <Row>
                    <Col md={24}>
                        <h2 style={{ fontSize: '25px' }}>Comment {index+1} </h2><hr/><br/>
                        
                    </Col>
                    
                    
                    <Col>
                        
                        
                        <h3>{comments.text}</h3> 
                        <br/>               
                        <p>By {comments.commentOwner}</p>  
                        
                    </Col>
            
                </Row>
                 </div> : 
                 <div className={'UserComment'} key={index} >
    
                 <Row>
                     <Col md={24}>
                         <h2 style={{ fontSize: '25px' }}>Comment {index+1} </h2><hr/><br/>
                         
                     </Col>
                     
                     
                     <Col>
                         
                         
                         <h3>{comments.text}</h3> 
                         <br/>               
                         <p>By {comments.commentOwner}</p>  
                         
                     </Col>
             
                 </Row>
                  </div>

               

                 )
                )
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

export default connect(mapStateToProps, { getEditorById , saveComment })(CommentShow)