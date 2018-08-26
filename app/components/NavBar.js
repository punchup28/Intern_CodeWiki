import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut, searchTopic } from '../actions'
import '../assets/editor.scss'



class NavBar extends Component {

    state = {

        showSearch: false,
    }

    authButton = () => {
        if (this.props.location.pathname == '/signin' || this.props.location.pathname == '/signup') {
            return (
                <div>
                    {this.props.location.pathname == '/signin' ?
                        <Link to={'/signup'} className={'link'} >
                            Sign up
                        </Link>
                        :
                        <Link to={'/signin'} className={'link'}>
                            Sign in
                        </Link>
                    }
                </div>
            )
        } else if (this.props.isLoggedIn) {
            return (
                <span className={'menu'}>
                    <Link to={'/'} className={'link'}>
                        {this.props.name}
                    </Link>
                    <Link style={{marginTop: '90%'}} to={'/'} onClick={() => this.props.signOut()} className={'link'}>
                        Sign out
                    </Link>
                </span>
            )
        } else {
            return (
                <div>
                    <Link style={{marginTop: '75%'}} to={'/signup'} className={'link'} >
                        Sign up
                    </Link>
                    <Link to={'/signin'} className={'link'}>
                        Sign in
                    </Link>
                </div>
            )
        }
    }

    toggleShowSearch = () => {
        const doseShow = this.state.showSearch
        this.setState({ showSearch: !doseShow })
        this.focus = () => this.refs.search.focus()

    }

    openNav = () => {
        document.getElementById("mySidenav").style.width = "300px";
    }

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

    render() {
        const { isLoggedIn , user } = this.props

        return (
            <div>

                <div className={'navlogo'}>
                    <div id="myMenu" className="navmenu">
                        <span style={{ color: 'white', fontSize: '30px', position: 'absolute', left: '17px', top: '15px', cursor: 'pointer' }} onClick={() => this.openNav()}>&#9776; </span>
                        <div style={{ color: 'white', fontSize: '13px', position: 'absolute', left: '12px', top: '60px', cursor: 'pointer' }} onClick={() => this.openNav()}>MENU</div>
                    </div>
                    <Link style={{ paddingLeft: 70 }} to={isLoggedIn ? '/list' : '/'}>
                        <img src={require('../img/logo.png')} className={'logo'} />
                    </Link>

                    {isLoggedIn?
                        <div style={{ color: 'white', fontSize: 20, position: 'absolute', right: 150, top: 40 }}>
                        Welcome, {user.username}
                        </div>: null
                    }
                </div>
                {console.log('user ' + user.username)}


                <div id="mySidenav" className="sidenav">
                    <a className="closebtn" href="javascript:void(0)" onClick={() => this.closeNav()}>&times;</a>
                    <Link to={'/AboutPage'}>About</Link>
                    <Link to={'/list'}>List</Link>
                    {isLoggedIn?  
                        <Link to={'/createBlog'} >Create</Link>
                        : null
                    } 



                    <br />
                    <div id="c" className="searchBox" >
                        <input

                            type={'text'}
                            style={{ border: '0', marginLeft: 30, marginTop: 1, paddingLeft: 40, fontSize: 12, height: 40, width: 200, backgroundColor: 'white' }}
                            placeholder={'Search by tag or title'}
                            className={'nav-input'}
                            ref={'search'}
                            onChange={e => this.props.searchTopic(e.target.value)}
                        />
                    </div>

                    
                    {this.authButton()}


                </div>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        user : state.auth.get('user'),
        isLoggedIn: state.auth.get('isLoggedIn') 
    }
}

export default connect(mapStateToProps, { signOut, searchTopic })(NavBar)