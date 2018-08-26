import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Row, Col } from 'antd'
import NavBar from '../components/NavBar'
import SignInBox from '../components/SignInBox'


class HomePage extends Component {
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
                    <img src={require('../img/background.png')} className={'homebg'} />
                    <NavBar location={this.props.location} />
                    <Row gutter={16}>

                        <Col md={{ span: 7 }} />
                        <Col md={{ span: 10 }}>
                            <div className={'syno'} style={{paddingTop:120}}>
                                <ReactCSSTransitionGroup
                                    transitionName='synopsis'
                                    transitionAppear={true}
                                    transitionAppearTimeout={700}
                                    transitionEnter={false}
                                    transitionLeave={false}
                                >
                                    <center><div>WEBSITE FOR</div></center>
                                    <center><h1 className={'h1'}>CODE<br />SHARING</h1><br /><br />
                                    </center>
                                    <center><p>The new way to express your
                                        code and explanation with other people
                                        in the different ways from the traditional site.</p></center><br />
                                    <center>
                                        <Link to={'/list'}>
                                            <button className={'toListButt'}><span>TOPICS</span></button>
                                        </Link>
                                    </center>
                                </ReactCSSTransitionGroup>
                            </div>
                        </Col>
                        <Col md={{ span: 7 }}>

                        </Col>
                    </Row>

                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default HomePage