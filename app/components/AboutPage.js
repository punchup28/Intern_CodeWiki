import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Row, Col } from 'antd'
import SignInBox from '../components/SignInBox'

class AboutPage extends Component {
    render() {
        const random = (min, max) => Math.random() * (max - min) + min
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName='synopsis'
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <img src={require('../img/coding-924920.jpg')} className={'homebg'} />
                    <NavBar location={this.props.location} />
                    <div className={'syno'}>
                        <br />
                        <center><h2 className={'h2'} style={{paddingTop:120}}>ABOUT US</h2></center>
                        <Row>
                            <Col md={{ span: 6, offset: 5 }}>

                                <div style={{ textAlign: 'right' }}>
                                    The web based services have significantly increased which
                                    influenced the usage of the web to find what people need.
                                    Especially for developers, finding the source code
                                    references is one of the common ways to understand the reason
                                    or technique. Most of those sharing websites also provide
                                    the explanations for the source code to help readers to
                                    understand the context easier.
                                    </div>
                            </Col>

                            <Col md={{ span: 6, offset: 2 }}>
                                <div >
                                    At Codewiki, we believe everyone can find
                                    some useful references of source code for reading and editing.
                                    Codewiki allows readers to click on each section of the code
                                    for its in-line explanations and editors can add
                                    two types of explanations: a block explanation attached
                                    to a code block that contains multiple lines of source code
                                    and an inline explanation attached to certain texts
                                    that are parts of source code.
                                    </div>
                            </Col>
                        </Row>

                        <br /><br />
                        <center>
                            <Link to={'/'}>
                                <br /><button className={'toListButt'}><span>HOME</span></button>
                            </Link>
                            <Link to={'/list'}>
                                <button style={{ marginLeft: 40 }} className={'toListButt'}><span>TOPICS</span></button>
                            </Link>
                        </center>
                    </div>




                </ReactCSSTransitionGroup>
            </div >
        )
    }
}

export default AboutPage
