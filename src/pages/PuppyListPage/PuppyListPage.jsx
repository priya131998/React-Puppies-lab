import React from 'react';
import './PuppyListPage.css';
import PuppyListItem from '../../components/PuppyListItem/PuppyListItem';
import * as usersService from '../../utilities/users-service';


function PuppyListPage(props) {
	async function handleCheckToken() {
		const expDate = await usersService.checkToken();
		console.log(expDate);
	}
	return (
		<>
			<h1>Puppy List</h1>
			<button onClick={handleCheckToken}>
				Check When My Login Expires
			</button>
			<div className='PuppyListPage-grid'>
				{props.puppies.map(puppy => (
					<PuppyListItem
						puppy={puppy}
						key={puppy._id}
						handleDeletePuppy={props.handleDeletePuppy}
					/>
				))}
			</div>
		</>
	);
}

export default PuppyListPage;
