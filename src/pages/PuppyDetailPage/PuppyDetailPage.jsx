import * as usersService from '../../utilities/users-service';
import React from 'react';
import { useLocation } from 'react-router-dom';
import PuppyCard from '../../components/PuppyCard/PuppyCard';




function PuppyDetailPage() {
    async function handleCheckToken() {
		const expDate = await usersService.checkToken();
		console.log(expDate);
	}

	const {
		state: { puppy },
	} = useLocation();

	return (
		<>
			<h1>Puppy History Page</h1>
			<button onClick={handleCheckToken}>
				Check When My Login Expires
			</button>
			<PuppyCard puppy={puppy} key={puppy._id} />
			
		</>
	);
}

export default PuppyDetailPage;