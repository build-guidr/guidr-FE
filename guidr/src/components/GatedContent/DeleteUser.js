// import React, { Component } from 'react';

// class DeleteUser extends Component {
// 	constructor(props){
//     super(props);
//   	// this.state = {
//     //   users: [
//     //     {
//     //       username: '',
//     //       id: ''
//     //     //   add additional info
//     //     }
//     //   ]
//     // }
//   }

//   delete(item){
//     const newState = this.state.user;
//   	if (newState.indexOf(item) > -1) {
//     	newState.splice(newState.indexOf(item), 1);
//       this.setState({ user: newState})
//     }
//   }
//   render(){
//   	const listItem = this.state.user.map((item)=>{
//     	return <div key={item.id}>
//       	<span>{item.name}</span> <button onClick={this.delete.bind(this, item)}>Delete Profile</button>
//       </div>
//     })
//   	return <div>
//     	{listItem}
//     </div>
//   }
// }

//   export default DeleteUser;