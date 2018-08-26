import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux' 
import { signIn } from '../actions'
import { Redirect } from 'react-router-dom'

class SignInBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false,
            error: ''
            
            
        }
    }

    

    onSignIn = e => {
        e.preventDefault()
        const { username, password } = this.state
        

        console.log('ID : '+ username + ' pass : ' + password)

       

        if (!password && !username) {
            //alert('Username and Password is required!!')
            
            this.setState({error: 'Username and Password is required!!'})
            console.log(this.state.error)


        } else if (!password) {
            //console.log('Password is required!!')
            //alert('Password is required!!')
            this.setState({error: ''})
            this.setState({error: 'Password is required!!'})
            console.log(this.state.error)
            this.name.password.autoFocus();
            
            
        } else if (!username) {
            //alert('Username is required!!')  
            this.setState({error: ''}) 
            this.setState({error: 'Username is required!!'})
            console.log(this.state.error)

        } else {
            
        this.props.signIn(username, password).then(() => {
            this.setState({ redirectToReferrer: true })
        })
    
        }
    }


    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            alert('Login failed!')
            return (
                <Redirect to={from}/>
            )
        }

        return(
            <ReactCSSTransitionGroup
                transitionName='sgnBox'
                transitionAppear={true}
                transitionAppearTimeout={700}
                transitionEnter={false}
                transitionLeave={false}
            >
                <Card className={'signinBox'} style={{backgroundColor:'#fafafa', marginTop: 180}}>
                    <form className={'form'}>
                        <Row>
                            <Col md={24}>
                                <span>Email or Username</span><br/>   
                                <center>
                                    <input type='text'
                                        className={'formInput'}
                                        name='email_username'
                                        autoFocus='true'
                                        onChange={e => this.setState({ username: e.target.value })}
                                        required
                                        
                                    />

                                    
                                </center>
                                  
                            </Col>
                            
                        </Row>
                        
                        <Row>
                            <Col md={24}>
                                <span>Password</span><br/>                                   
                                <center>
                                    <input type='password'
                                        className={'formInput'}
                                        name='password'
                                        onChange={e => this.setState({ password: e.target.value })}
                                        required
                                    />
                                    

                                </center>
                            </Col>
                        </Row>
                        <center>
                            
                            <div style={{color: 'red'}}>{this.state.error}</div>
                            <button className={'button'} onClick={this.onSignIn}>Sign in</button>
                            
                        </center>
                    </form>
                </Card>
            </ReactCSSTransitionGroup>
        )
    }
}

export default connect(null, {signIn})(SignInBox)