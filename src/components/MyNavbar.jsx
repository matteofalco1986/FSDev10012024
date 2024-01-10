import { Navbar, Nav, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MyNavbar = (props) => {

	const location = useLocation();
	const navigate = useNavigate();

	const [searchString, setSearchString] = useState('');

	const searchStringHandler = (e) => {
		if (e.keyCode === 13) {
			// WHEN ENTER KEY IS PRESSED
			props.showSearchResult(searchString);
		} else {
			setSearchString(e.currentTarget.value)
		}
	};

	return (
		<Navbar
			variant="dark"
			expand="lg"
			style={{ backgroundColor: "#221f1f" }}
		>
			<Link to="/" className="navbar-brand">
				<img
					src="assets/logo.png"
					alt="logo"
					style={{ width: "100px", height: "55px" }}
				/>
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Link to="/" className={location.pathname === '/' ? 'nav-link font-weight-bold active' : 'nav-link '} >Home
					</Link>

					<Link to="/shows" className={location.pathname === '/shows' ? 'nav-link font-weight-bold active' : 'nav-link '} >TV Shows
					</Link>
					<Link to="/movies" className={location.pathname === '/movies' ? 'nav-link font-weight-bold active' : 'nav-link font-weight-bold'} >Movies
					</Link>
					<Link to="/recent" className={location.pathname === '/recent' ? 'nav-link font-weight-bold active' : 'nav-link font-weight-bold'} >Recently Added
					</Link>
					<Link to="/userlist" className={location.pathname === '/userlist' ? 'nav-link font-weight-bold active' : 'nav-link font-weight-bold'} >My List
					</Link>
				</Nav>
				<span className="d-flex align-items-center">
					<InputGroup className="icons">
						<FormControl
							placeholder="Search and press enter"
							aria-label="search"
							aria-describedby="basic-addon1"
							onKeyDown={searchStringHandler}
							onChange={searchStringHandler}
							value={searchString}
						/>
					</InputGroup>
					<div id="kids">KIDS</div>
					<i className="fa fa-bell icons"></i>
					<i className="fa fa-user icons"></i>
				</span>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MyNavbar;
