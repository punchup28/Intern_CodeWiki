import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { Col, Row, Card } from 'antd'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { signUp } from '../actions'

class SignUpPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            cfPassword: '',
            error: ''
        }
    }

    handleCFPassword(e) {
        if(this.state.password == e.target.value) {
            this.setState({
                cfPassword: e.target.value
            })
        }
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleUsername(e) {
        console.log(e)
        const usernameRegex = new RegExp('[a-zA-Z_0-9]{3,12}')
        const valid = usernameRegex.test(e.target.value)
        console.log(valid)
        if(valid) {
            this.setState({
                username: e.target.value
            })
        }
    }

    onSignUpHandler = e => {
        e.preventDefault()
        const { username, email, password , cfPassword} = this.state
        //this.props.signUp(username, email, password)
        
        if (!username){ 
            this.setState({error: ''})
            this.setState({error: 'Username is required!!'})
        } else if (!password) {
            this.setState({error: ''})
            this.setState({error: 'Password is required!!'})
        } else if (password != cfPassword){
            this.setState({error: ''})
            this.setState({error: 'Password and Confirm-password is not match!!'})
        } else if (!email) {
            this.setState({error: ''})
            this.setState({error: 'Email is required!!'})
        } else if (!cfPassword) {
            this.setState({error: ''})
            this.setState({error: 'Confirm-password is required!!'})
        } else {
            this.props.signUp(username, email, password)
        }

        
    }

    render() {
        return(
            <div style={{marginTop:120}}>
                <ReactCSSTransitionGroup
                    transitionName='sgnBox'
                    transitionAppear={true}
                    transitionAppearTimeout={700}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <NavBar location={this.props.location}/>
                    <center>
                    <br/><br/>
                   
                        <Card className={'signupBox'} style={{backgroundColor:'#fafafa', width:'375px', marginTop:'30px'}}>
                            <form className={'form'}>
                                <Row>
                                    <h1> Let’s create an account </h1>
                                        <br/><br/>
                                        <input type='email'
                                            className={'formInput'}
                                            name='email'
                                            value={this.props.email}
                                            autoFocus='true'
                                            placeholder={'Email'} 
                                            onChange={e => this.setState({ email: e.target.value })}
                                            required
                                        />
                                       
                                        <br/>
                                         
                                        <input type='text'
                                            className={ 'formInput' }
                                            name='username'
                                            value={this.props.username}
                                            required
                                            placeholder={'Username'} 
                                            onChange={this.handleUsername.bind(this)}
                                            size={12}
                                            pattern={'[A-Za-z\d]{3,12}'}
                                        />
                                    
                                </Row>  
                                <Row>
                                    
                                        
                                        <input type='password'
                                            className={'formInput'}
                                            name='password'
                                            value={this.props.password}
                                            placeholder={'Password'} 
                                            onChange={this.handlePassword.bind(this)}
                                            required
                                        />
                                        <br/>
                                           
                                        <input type='password'
                                            className={'formInput'}
                                            name='confirmPassword'
                                            placeholder={'Confirm password'} 
                                            onChange={this.handleCFPassword.bind(this)}
                                            value={this.props.cfPassword}
                                            required
                                        />
                                    
                                </Row>  
                                <center>
                                    <div style={{color: 'red'}}>{this.state.error}</div>
                                    <button className={'button'} onClick={this.onSignUpHandler}>Sign up</button>
                                </center>
                            </form>
                        </Card>
                        </center>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default connect(null, {signUp})(SignUpPage)