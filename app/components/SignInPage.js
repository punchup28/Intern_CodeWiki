import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import SignInBox from '../components/SignInBox'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class SignInPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
             <div>
                 <ReactCSSTransitionGroup
                    transitionName='sgnBox'
                    transitionAppear={true}
                    transitionAppearTimeout={700}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <NavBar location={this.props.location}/>
                    <center>
                        <div className={'sip'} style={{width:'550px', marginTop:'50px'}}>
                            <SignInBox location={this.props.location}/>
                        </div>
                    </center>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.auth.get('user') }
}

export default connect(mapStateToProps)(SignInPage)