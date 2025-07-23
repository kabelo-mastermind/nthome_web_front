import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/Registration';
import ProfileDriver from '../profile_driver/profile_driver';
import ProfileUpdateDriver from '../profile_driver/DriverDetailsUpdate_driver';
import ProfileCustomer from '../profile_customer/profile_customer';
import ProfileUpdateCustomer from '../profile_customer/ProfileUpdate_customer';
import Search from '../search/search';
import DriverLocation from '../../components/map/DriverLocation';
import Pricing from '../Pricing/pricing';
import Rides from '../DriverRide/Rides';
import Services from '../Services/Services';
import AdminApp from '../Dashboard/AdminApp'; 
import AdminHome from '../Dashboard/AdminHome';
import DriverUpload from '../profile_driver/DriverUploads';
import Car_details from '../profile_driver/Car_details';
import DriverUploads from '../profile_driver/DriverUploads';
import DriverUploadsUpdate from '../profile_driver/DriverUploadsUpdate';
import Customer from '../Customer/customer';
import ViewDriver from '../Dashboard/ViewDriver';
import AllRide from '../Dashboard/AllRide';
import CompletedRides from '../Dashboard/CompletedRides';
import CancelledRide from '../Dashboard/CancelledRides';
import CustomersPage from '../Dashboard/CustomersPage';
import DriversTable from '../Dashboard/Driver';
import ScheduleRide from '../Dashboard/ScheduleRides';
import VehicleType from '../Dashboard/VehicleType';
import AddVehicle from '../Dashboard/AddVehicle';
import RidesRatings from '../Dashboard/RidesRatings';
import DriverRatings from '../Dashboard/DriverRatings';
import PushNotifications from '../Dashboard/PushNotification';
import SiteSettings from '../Dashboard/SiteSetting';
import Earning from '../Dashboard/EarningReport';
import DriverEarnings from '../Dashboard/DriverEarnings';
import Notifications from '../Dashboard/Notifications';
import NotificationModal from '../Dashboard/NotificationModal';
import ViewCustomer from '../Dashboard/ViewCustomer';
import DocumentList from '../Dashboard/DocumentList';
import Trip from '../Dashboard/Trip';
import ThankYouPage from '../Thanks/ThankYou';
import CustomerDetails from '../../components/Drivermap/CustomerDetails';
import MakePayment from '../MakePayment/MakePayment';
import PaymentSuccess from '../PaymentSuccess/PaymentSuccess';
import Feedback from '../Feedback/Feedback';
import Verification from '../Pricing/Verification';
import CustomerRatingModal from '../../components/Modal/CustomerRatingModal';
import CustomerTripHistory from '../CustomerTripHistory/CustomerTripHistory';
import PaymentSuccessful from '../Thanks/PaymentSuccessful';
import Subscribers from '../Dashboard/Subscribers';
import DriverDocumentsUpdate from '../profile_driver/DriverDocumentsUpdate';
import ForgotPasswordForm1 from '../../components/ForgotPassword/ForgotPasswordForm';
import StatePage from '../DriverState/DriverState';
import CarDetailsUpdate from '../profile_driver/CarDetailsUpdate';
import SocketTest from '../SocketTest'
import adminList from '../Dashboard/AdminList'
import AdminList from '../Dashboard/AdminList';
import AddAdminPage from '../Dashboard/AddAdmin';
import FoodComingSoon from '../Food/FoodComingSoon';
import NthomeAir from '../NthomeAir/NthomeAir';
import Cards from '../Cards/Cards';
import Wallet from '../DriverWallet/DriverWallet';
import CashOut from '../CashOut/Cashout';
import TripVerifyPayment from '../../components/TripVerifyPayment/TripVerifyPayment'



const AppRoutes = ({ isAdmin, userId, AdminRole, emails, roles, userName }) => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact email={emails} />} />
      <Route path='/login' element={<LoginForm admin={AdminRole} />} />
      <Route path='/signup' element={<RegistrationForm />} />
      <Route path='/signup' element={<RegistrationForm />} />
      <Route path='/drivers' element={<Pricing name={userName} email={emails} userId={userId} />} />
      <Route path='/customers' element={<Customer />} />
      <Route path='/thankyou' element={<ThankYouPage />} />
      <Route path='/verify' element={<Verification userId={userId} />} />
      <Route path=':reference' element={<Verification />} />
      <Route path='/makePayment' element={<MakePayment />} />
      <Route path='/paymentSuccess' element={<PaymentSuccess />} />
      <Route path='/customerRatingModal' element={<CustomerRatingModal />} />
      <Route path='/paymentSuccessful' element={<PaymentSuccessful />} />
      <Route path=':reference' element={<PaymentSuccessful />} />
      <Route path='/forgot-password' element={<ForgotPasswordForm1 />} />
      <Route path='/socket' element={<SocketTest />} />
      <Route path='/food' element={<FoodComingSoon />} />
      <Route path='/nthomeair' element={<NthomeAir />} />
      <Route path='/cards' element={<Cards userId={userId} roles={roles}/>} />
      <Route path='/verifyTrip' element={<TripVerifyPayment />} />
      <Route path=':reference' element={<TripVerifyPayment />} />

    


      








      {isAdmin ? (

        <>
          <Route path='/adminapp' element={<AdminHome />} />

          <Route path='/customerRide' element={<CustomersPage />} />
          <Route path='/driver' element={<DriversTable />} />
          <Route path='/viewDriver/:id' element={<ViewDriver />} />
          <Route path='/rideHistory/:id' element={<ViewCustomer />} />

          <Route path='/allRide' element={<AllRide />} />
          <Route path='/completedRides' element={<CompletedRides />} />
          <Route path='/cancelled' element={<CancelledRide />} />
          <Route path='/schedule' element={<ScheduleRide />} />
          <Route path='/vehicle' element={<VehicleType />} />
          <Route path='/addVehicle' element={<AddVehicle />} />
          <Route path='/riderRatings' element={<RidesRatings />} />
          <Route path='/driverRatings' element={<DriverRatings />} />
          <Route path='/push' element={<PushNotifications />} />
          <Route path='/setting' element={<SiteSettings />} />
          <Route path='/earnings' element={<Earning />} />
          <Route path='/driverEarnings/:id' element={<DriverEarnings />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/notifications/:id' element={<Notifications />} />
          <Route path='/messages' element={<NotificationModal />} />
          <Route path='/driverDocuments/:id' element={<DocumentList />} />
          <Route path='/trip' element={<Trip />} />
          <Route path='/subscribers' element={<Subscribers />} />
          <Route path='/adminList' element={<AdminList />} />
          <Route path='/addAdmin' element={<AddAdminPage />} />


    
          







          {/* Add more admin routes here */}
        </>
      ) : (
        <>
          <Route path='/profile-driver' element={<ProfileDriver userId={userId} />} />
          <Route path='/profileUpdate-driver/:id' element={<ProfileUpdateDriver />} />
          <Route path='/profile-customer' element={<ProfileCustomer userId={userId} />} />
          <Route path='/CustomerTripHistory' element={<CustomerTripHistory userId={userId} />} />
          <Route path='/profileUpdate-customer/:id' element={<ProfileUpdateCustomer />} />
          <Route path='/search' element={<Search roles={roles} userId={userId} emails={emails} userName={userName} />} />
          <Route path='/DriverLocation' element={<DriverLocation driverId={userId}/>} />
          <Route path='/rides' element={<Rides />} />
          <Route path='/services' element={<Services />} />
          <Route path='/driverUpload' element={<DriverUpload userId={userId} />} />
          <Route path='/car_details' element={<Car_details userId={userId} />} />
          <Route path='/driverUploads' element={<DriverUploads />} />
          <Route path='/driverUploadsUpdate' element={<DriverUploadsUpdate userId={userId} />} />
          <Route path='/customerDetails' element={<CustomerDetails userId={userId} />} />
          <Route path='/feedback' element={<Feedback userId={userId} roles={roles} />} />
          <Route path='/carDetailsUpdate/:id' element={<CarDetailsUpdate   />} />
          <Route path='/state' element={<StatePage userId={userId}/>} />
          <Route path='/wallet' element={<Wallet driverId={userId}/>} />
          <Route path='/cashout' element={<CashOut/>} />


     






        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
