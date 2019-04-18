// MIGHT NOT USE MAYBE
// import React, { Component } from "react";
// import axios from "axios";
// // import GatedContentNav from "./GatedContentNav";

// class AddProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     //   user: [],
//       user: {
//         "id": "",
//         "user_id": "",
//         "age": "",
//         "certs": "",
//         "profile_text": "",
//         "years_of_exp": ""
//     }
//   }}

// //   componentDidMount() {
// //     axios.get("https://ls-guidr.herokuapp.com/api/profile")
// //       .then(result => {
// //           this.setState({
// //           user: result.data,
// //           user_id: result.data[0].user_id
// //         });
// //       })
// //       .catch(error => {
// //         console.error("ERROR", error);
// //       });
// //   }

//   addUser = newProfile => {
//     axios
//       .put("https://ls-guidr.herokuapp.com/api/profile/id", newProfile)
//       .then(result => {
//         this.setState({user: result.data });
//         // redirect
//         // this.props.history.push("/my-portfolio");
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

// //   updateUser = updatedUser => {
// //     axios
// //       .put(`https://ls-guidr.herokuapp.com/api/profile/${updatedUser.id}`, updatedUser)
// //       .then(res => {
// //         this.setState({ user: res.data });
// //         console.log(res);
// //         // redirect
// //         this.props.history.push("/my-portfolio");
// //       })
// //       .catch(err => {
// //         console.log(err);
// //       });
// //   };

//   handleChange = event => {
//     event.persist();
//     this.setState(prevState => ({
//         user: {
//             ...prevState.user,
//           [event.target.name]: event.target.value,
//         }
//       }));
//     };

//   onSubmitAddUser = event => {
//     event.preventDefault();
//     this.addUser(this.state.user);

//     this.setState({
//         user: {
//             "id": "",
//             "user_id": "",
//             "age": "",
//             "certs": "",
//             "profile_text": "",
//             "years_of_exp": ""
//         }
//     });
// };

//   render() {
//     return (
//       <div>
//         {/* <div>
//           <GatedContentNav />
//         </div> */}
//         <div className="form-container">
//           <h2>Add Profile</h2>
//           <form className="form" onSubmit={this.onSubmitAddUser}>
//             <input
//               name="first_name"
//               placeholder="username"
//               onChange={this.handleChange}
//               value={this.state.user.first_name}
//             />
//             <input
//               type="text"
//               name="age"
//               placeholder="age"
//               onChange={this.handleChange}
//               value={this.state.user.age}
//             />
//             <input
//               type="text"
//               name="certs"
//               placeholder="certs"
//               onChange={this.handleChange}
//               value={this.state.user.certs}
//             />
//             <input
//               type="text"
//               name="profile_text"
//               placeholder="Brief Description"
//               onChange={this.handleChange}
//               value={this.state.user.profile_text}
//             />
//             <input
//               type="text"
//               name="years_of_exp"
//               placeholder="Years of Experience"
//               onChange={this.handleChange}
//               value={this.state.user.years_of_exp}
//             />
//             <button>Add Profile</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default AddProfile;
