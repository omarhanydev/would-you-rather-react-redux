import { Fragment } from 'react'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function HeaderNavbar(props) {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <div className="container">
                <Navbar.Brand className="bg-danger navbar-brand px-4">Would You Rather?</Navbar.Brand>
                <Navbar.Toggle aria-controls="header-navbar" />
                <Navbar.Collapse id="header-navbar">
                    <Nav className="mr-auto">
                        <NavLink to='/' exact className="nav-link" activeClassName='active'>
                            {props.user !== null ? 'Home' : 'Login'}
                        </NavLink>
                        {
                            props.user !== null &&
                            (
                                <Fragment>
                                    <NavLink to='/add' className="nav-link" activeClassName='active'>
                                        Add New Question
                                    </NavLink>
                                    <NavLink to='/leaderboard' className="nav-link" activeClassName='active'>
                                        Leaderboard
                                    </NavLink>
                                </Fragment>
                            )
                        }
                    </Nav>
                    {
                        props.user !== null &&
                        (
                            <NavDropdown bsPrefix="nav-link text-white" title={<span><Image src={props.user.avatarURL} className="avatar-img--size-sm" roundedCircle /><span className="ml-2">{props.user.fullName}</span></span>}>
                                <NavLink to='/logout' className="dropdown-item" activeClassName='active'>
                                    Logout
                                </NavLink>
                            </NavDropdown>
                        )
                    }
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

function mapStateToProps({ authedUser, users }) {
    return {
        user: users && users[authedUser]
            ? {
                fullName: users[authedUser]['name'],
                avatarURL: users[authedUser]['avatarURL']
            }
            : null
    }
}

export default connect(mapStateToProps)(HeaderNavbar);
