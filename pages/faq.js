import { Nunito } from '@next/font/google'
import { useEffect, useState } from 'react'
import AppBar from './AppBar'

import ReactGA from 'react-ga4'

const nunito = Nunito({ subsets: ['latin'] })
const Contact = () => {


  useEffect(() => {
    if (window.location.href.includes('oddityai')) {
      if (!window.location.href.includes('local')) {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY);
        ReactGA.event({
          category: 'User',
          action: 'Viewed FAQ',
        })
      }
    }
  }, [])

  return (
    <div className={nunito.className}>
      <AppBar />

      <div
        style={{
          margin: "20px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ color: "#0057be", fontSize: "24px", textAlign: "center" }}>
          Frequently Asked Questions
        </h2>

        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
            How does OddityAI assist with complex subjects like math and
            science?
          </p>
          <p style={{ color: "#555", fontSize: "16px" }}>
            Our AI Homework Helper is adept at tackling a wide range of
            subjects, from math and science to English and history. It utilizes
            advanced AI technology to provide detailed solutions and
            explanations.
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
            Is OddityAI reliable for completing my school assignments?
          </p>
          <p style={{ color: "#555", fontSize: "16px" }}>
            Yes, our Homework AI is designed to offer reliable and accurate
            assistance for school assignments. It's regularly updated to ensure
            it provides the most accurate information and solutions to your
            homework queries.
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
            Can I use the AI Homework Solver for immediate assistance with
            homework questions?
          </p>
          <p style={{ color: "#555", fontSize: "16px" }}>
            Absolutely! Our AI Homework Solver provides instant assistance. Just
            upload your homework question, and the AI will analyze it to give
            you a quick and accurate solution.
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
            How can it help improve my essay writing skills?
          </p>
          <p style={{ color: "#555", fontSize: "16px" }}>
            The AI for Homework offers comprehensive support for essay writing,
            including grammar and spell checks, structure suggestions, and
            creative writing tips. It's an excellent tool for enhancing your
            writing skills and ensuring your essays are well-composed.
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
            What makes OddityAI stand out for homework assistance?
          </p>
          <p style={{ color: "#555", fontSize: "16px" }}>
            OddityAI stands out due to its advanced AI algorithms that provide
            fast, accurate, and reliable homework assistance across a variety of
            subjects. It's user-friendly and designed to cater to the diverse
            academic needs of students.
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
            Can I contact you?
          </p>
          <p style={{ color: "#555", fontSize: "16px" }}>
            Yes, we would be delighted to hear from you at our email
            support@oddityai.com
          </p>
        </div>
      </div>
    </div>
  );
}
export default Contact
