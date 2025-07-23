import React from 'react';
import blueBg from '../../../assets/img/blue bg.png'

const BasicFeatures = () => {
  return (
    <section className="bg-light">
      <div className="container px-5">
        <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
          <div className="col-12 col-lg-5">
            <h2 className="display-4 lh-1 mb-4">Enter a new age of transportation</h2>
            <p className="lead fw-normal text-muted mb-5 mb-lg-0">Experience the power of these game-changing features on our app. Dynamic rate adjustments guaranteeing fair pay for drivers, real-time tracking for your absolute safety, and a registration process so seamless, the market throws your way.</p>
          </div>
          <div className="col-sm-8 col-md-6">
            <div className="px-5 px-sm-0"><img className="img-fluid " src={blueBg} alt="..." /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BasicFeatures;
