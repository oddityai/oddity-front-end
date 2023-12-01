import React from "react";
import AppBar from "./AppBar"; // Ensure this import matches the location of your AppBar component
import { Nunito } from "@next/font/google";

const nunito = Nunito({ subsets: ["latin"] });
const TermsOfServicePage = () => {
  return (
    <div>
      <AppBar />
      <div
        className={nunito.className}
        style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
      >
        <h1 style={{ textAlign: "center" }}>Terms of Service</h1>

        <h2>Data Protection and Privacy:</h2>
        <p>
          We are committed to protecting your privacy and handling your data in
          accordance with legal requirements.
        </p>

        <h4>
          General Data Protection Regulation (GDPR) Compliance (for European
          Users):
        </h4>
        <p>
          We comply with the GDPR and apply its principles to our users
          globally.
        </p>
        <ul>
          <li>
            You have the right to access your data, correct inaccuracies,
            request data deletion, and withdraw consent for data use.
          </li>
          <li>
            To exercise these rights, please contact our Data Protection Officer
            at support@oddityai.com.
          </li>
        </ul>

        <h4>
          California Consumer Privacy Act (CCPA) Compliance (for California
          Users):
        </h4>
        <p>We adhere to the CCPA.</p>
        <ul>
          <li>
            California residents have the right to know about the personal
            information collected, used, and shared, and the right to request
            deletion of personal information.
          </li>
          <li>
            To make such a request, California residents can contact us at
            support@oddityai.com.
          </li>
        </ul>

        <h4>International Users:</h4>
        <p>
          We strive to comply with all local laws and regulations regarding data
          protection and user privacy.
        </p>
        <ul>
          <li>
            For specific requests or inquiries related to your data, please
            contact us at support@oddityai.com.
          </li>
        </ul>

        <h2>Email Communications and Privacy</h2>
        <h3>Consent to Receive Emails:</h3>
        <p>
          By using OddityAI, you agree to receive email communications from us
          related to your use of the service. These may include:
        </p>
        <ul>
          <li>Updates about the service</li>
          <li>Promotional offers</li>
          <li>Educational content</li>
          <li>Account management instructions</li>
        </ul>
        <p>
          You may opt out of receiving promotional emails at any time by
          clicking the "unsubscribe" link at the bottom of such emails.
        </p>

        <h2>Changes to Our Email Policies:</h2>
        <p>
          We reserve the right to modify these email communication policies at
          any time. Any changes will be effective immediately upon posting to
          our website and will be reflected in an updated version of these Terms
          and Conditions.
        </p>

        <h2>Data Protection and Privacy:</h2>
        <p>
          We are committed to protecting your privacy and handling your data in
          accordance with legal requirements.
        </p>

        <h3>Device Fingerprinting:</h3>
        <p>
          To enhance security and prevent fraud, we use device fingerprinting
          technologies. This involves collecting information about your device,
          such as browser type, operating system, and other device settings, to
          create a unique identifier. We use this identifier to recognize your
          device and provide a more secure service. Device fingerprinting helps
          us detect unauthorized access and protect your account. Your privacy
          is important to us, and we handle this data in full compliance with
          legal standards.
        </p>
        
      </div>
    </div>
  );
};

export default TermsOfServicePage;
