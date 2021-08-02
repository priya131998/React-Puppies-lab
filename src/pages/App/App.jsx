import './App.css';
import React, { useState, useEffect } from "react";
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import AddPuppyPage from '../AddPuppyPage/AddPuppyPage';
import PuppyDetailPage from '../PuppyDetailPage/PuppyDetailPage'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import * as puppyAPI from '../../utilities/puppies-api';
import PuppyListPage from '../PuppyListPage/PuppyListPage';
import EditPuppyPage from '../EditPuppyPage/EditPuppyPage';




function App(props) {
  const [user, setUser] = useState(getUser());
  const[puppies, setPuppies] = useState([]);
  const history = useHistory();

  useEffect(() => {
		async function getPuppies() {
			// retrieve the puppies data
			const puppies = await puppyAPI.getAll();
			// set it to state
			setPuppies(puppies);
		}
		getPuppies();
	}, []);

	useEffect(() => {
		// This is listenting for each time puppies state is changed,
		// then will run our function below to reroute
		history.push('/');
	}, [puppies, history]);

	async function handleAddPuppy(newPuppyData) {
		const newPuppy = await puppyAPI.create(newPuppyData);
		setPuppies([...puppies, newPuppy]);
	}

  async function handleUpdatePuppy(updatedPuppyData) {
		// invoke the fetch call from api services
		const updatedPuppy = await puppyAPI.update(updatedPuppyData);
		// set the new state using the result from the fetch call
		const newPuppiesArray = puppies.map(p =>
			p._id === updatedPuppy._id ? updatedPuppy : p
		);
		setPuppies(newPuppiesArray);
	}

	async function handleDeletePuppy(id) {
		await puppyAPI.deleteOne(id);
		setPuppies(puppies.filter(puppy => puppy._id !== id));
	}

  // return (
  //   <main className="App">
  //     { user ? (
  //     <>
  //     <NavBar user={user} setUser={setUser} />
  //       <Switch>
  //         <Route path="/puppies/new">
  //           <AddPuppyPage puppies={puppies} setPuppies={setPuppies} handleAddPuppy={handleAddPuppy}/>
  //         </Route>
  //         <Route path="/puppies">
  //           <PuppyHistoryPage />
  //         </Route>
  //         <Redirect to="/puppies" />
  //       </Switch>
  //       </>
  //       ) : (
  //         <AuthPage setUser={setUser} />
  //       )}
  //     </main>
  // );

  return (
  <div className='App'>
			<header className='App-header'>
				React Puppies CRUD
				{/* <nav>
					<NavLink exact to='/'>
						PUPPIES LIST
					</NavLink>
					&nbsp;&nbsp;&nbsp;
					<NavLink exact to='/add'>
						ADD PUPPY
					</NavLink>
				</nav> */}
			</header>
      <main>
     { user ? (
      <>
      <NavBar user={user} setUser={setUser} />
        <Switch>
        <Route exact path='/'>
        <PuppyListPage
						puppies={puppies}
						handleDeletePuppy={handleDeletePuppy}
					/>
				</Route>
				<Route exact path='/add'>
					<AddPuppyPage handleAddPuppy={handleAddPuppy} />
				</Route>
				<Route exact path='/details'>
					<PuppyDetailPage />
				</Route>
        <Route exact path='/edit'>
					<EditPuppyPage handleUpdatePuppy={handleUpdatePuppy} />
				</Route>
          <Redirect to="/puppies" />
        </Switch>
        </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </main>
      </div>
  );

}

export default App;
