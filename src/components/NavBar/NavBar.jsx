import { Link } from "react-router-dom";
import * as usersService from '../../utilities/users-service';

function NavBar({ user, setUser }) {
	// Add the following function
	function handleLogOut() {
		// Delegate to the users-service
		usersService.logOut();
		// Update the state will also cause a re-render
		setUser(null);
	}

    return (
    <nav>
        <Link to="/">Puppy List</Link>
        &nbsp; | &nbsp;
        <Link to="/add">Add Puppy</Link>
        &nbsp; | &nbsp;
			<span>
				<b>Welcome, {user.name}</b>
			</span>
			&nbsp; | &nbsp;
			<Link to='' onClick={handleLogOut}>
				Log Out
			</Link>
		</nav>
    );
}

export default NavBar;