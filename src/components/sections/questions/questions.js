import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function StaticFaqSection() {
  return (
    <MDBContainer>
      <section>
        <MDBTypography
          tag="h3"
          className="text-center mb-4 pb-2 text-dark fw-bold"
        >
          FAQ
        </MDBTypography>
        <p className="text-center mb-5">
          Find the answers for the most frequently asked questions below
        </p>

        <MDBRow>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h3" className="mb-3 text-dark">
            How do I report an issue with a passenger or trip?
            </MDBTypography>
            <p>

              {/* <strong>
                <u>Absolutely!</u>
              </strong>{" "} */}
           If you encounter any issues with a passenger or trip, you can report it through the Uber Driver app. Our support team will investigate the issue and take appropriate action.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h3" className="mb-3 text-dark">
            Can I drive with Uber part-time?
            </MDBTypography>
            <p>
              <strong>
                <u>Yes, it is possible!</u>
              </strong>{" "}
              Many drivers choose to drive with Uber part-time to earn extra income. You have the flexibility to set your own schedule and drive whenever it's convenient for you.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h3" className="mb-3 text-dark">
            What incentives or bonuses are available for Uber drivers?
            </MDBTypography>
            <p>
            Uber offers various incentives and bonuses to drivers based on factors such as trip volume, peak hours, and driver ratings. Check the promotions section of the Uber Driver app for details on current incentives in your area.
            </p>
           
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h3" className="mb-3 text-dark">
            How do I receive payments as an Uber driver?
            </MDBTypography>
            <p>
            <strong>
                <u>Yes, it is possible!</u>
              </strong>{" "}
              Uber drivers receive payments directly to their bank accounts. Earnings are deposited weekly or can be cashed out instantly using Uber's Instant Pay feature.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h3" className="mb-3 text-dark">
            What safety measures should I follow as an Uber driver?
            </MDBTypography>
            <p>
            Your safety and the safety of your passengers are our top priorities. Follow recommended safety guidelines, such as verifying passenger identities, confirming trip details, and maintaining a clean and safe vehicle.
              {/* <strong>
                <u>Unfortunately no</u>.
              </strong>{" "}
              We do not issue full or partial refunds for any reason. */}
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h3" className="mb-3 text-dark">
            What are the vehicle requirements for driving with Uber?
            </MDBTypography>
            <p>
            Uber has specific vehicle requirements depending on the service you're interested in (e.g., Nthome Black, Nthome X). Generally, your vehicle must meet certain age, model, and condition criteria.
            </p>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}