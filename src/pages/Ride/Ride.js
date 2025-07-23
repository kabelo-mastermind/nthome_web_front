// import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// //import './NewRide.css'; // Import custom CSS for additional styling
// import { assets } from '../../assets/assets';

// const Ride = () => {
//   const [query, setQuery] = useState('');

//   const handleSearch = () => {
//     // Perform search action with the query
//     console.log('Searching for:', query);
//     // You can replace the console.log with your search logic
//   };

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };

//   return (
//     <div className="container-fluid bg-dark text-white p-4">
//       <div className='header-div text-center mb-4'>
//         <h1>New Ride</h1>
//       </div>
//       <div className='search-button mb-3 d-flex justify-content-center'>
//         <input
//           type="text"
//           value={query}
//           onChange={handleChange}
//           placeholder="Search..."
//           className="form-control text-white"
//         />
//         <button onClick={handleSearch} className="btn btn-outline-light ml-2">Search</button>
//       </div>
//       <div className="container">
//   <div className="row justify-content-center">
//     <div className="col-md-6">
//       <div className="price mb-3 text-center bg-black rounded-lg p-2" style={{ borderRadius: '20px', maxWidth: '200px' }}>
//         <p className='price-p text-white' style={{ fontSize: '1.8rem' }}>R120.00</p>
//       </div>
//     </div>
//   </div>
// </div>
//       <div className="container-fluid bg-dark text-white p-4">
//   <div className="row">
//     <div className="col-lg-6 text-center"> {/* Adjust column width as needed */}
//       <h1>New Ride</h1>
//       {/* Your other content goes here */}
//     </div>
//     <div className="col-lg-6 text-center">
//       <div className='profile-pic mb-3'>
//         <img src={assets.dummy_img} alt="profile-picture" className="img-fluid rounded" style={{ width: '70px', height: 'auto' }} />
//       </div>
//     </div>
//   </div>
// </div>
//       <div className='map-img mb-3 text-center'>
//         <img src={assets.mapping_img} alt="mapping" className="img-fluid" style={{ width: '300px', height: 'auto' }} />
//       </div>
//       <div className='accept-request-div mb-3'>
//       <section style={{ backgroundColor: 'black' }}>
//   <div className="container">
//     <div className='customer-profile-pic mb-2 text-center'>
//       <img src={assets.customer_pic} alt="customer-profile-pic" className="img-fluid rounded-circle" style={{ width: '70px', height: 'auto' }} />
//     </div>
//     <div className='customer-info mb-2 text-center'>
//       <h3 className="mb-1">David Dlamini</h3>
//       <div className="d-flex justify-content-center align-items-center mb-1">
//         <p className="mb-0 me-4">3 kms away | 12 mins</p>
//         <p className='rating mb-0'>Rating: 4.73</p>
//       </div>
//       <h4 className="mb-1">Pickup from</h4>
//       <p className='customer-location mb-0'>2020 Block L Soshanguve Pretoria, South Africa</p>
//     </div>
//     <div className="d-flex justify-content-center align-items-center">
//       <div className='Buttons d-inline-flex'>
//         <button className="btn btn-success mr-1">Accept</button>
//         <button className="btn btn-danger ml-1">Reject</button>
//       </div>
//     </div>
//   </div>
// </section>


//       </div>
//     </div>
//   )
// }

// export default Ride;
