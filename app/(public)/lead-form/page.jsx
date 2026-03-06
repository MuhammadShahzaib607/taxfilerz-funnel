import React from 'react'
import Navbar from "../../components/Navbar.jsx"
import LeadIntro from "../../components/lead-form-components/LeadIntro.jsx"
import InteractiveLeadForm from "../../components/lead-form-components/InteractiveLeadForm.jsx"
import StepProcess from "../../components/lead-form-components/StepProcess.jsx"
import TrustBenefits from "../../components/lead-form-components/TrustBenefits.jsx"
import Footer from "../../components/Footer.jsx"

const LeadForm = () => {
  return (
    <div>
        <Navbar />
        <InteractiveLeadForm />
        <LeadIntro />
        <StepProcess />
        <TrustBenefits />
        <Footer />
    </div>
  )
}

export default LeadForm