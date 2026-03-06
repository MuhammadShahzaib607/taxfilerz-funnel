import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from "../components/ads-home-components/HeroSection"
import ServicesSection from "../components/ads-home-components/ServicesSection"
import FeaturesSection from "../components/ads-home-components/FeaturesSection"
import DashboardFeature from "../components/ads-home-components/DashboardFeature"
import InvoiceShowcase from "../components/ads-home-components/InvoiceShowcase"
import FinanceFeatures from "../components/ads-home-components/FinanceFeatures"
import UrgencyBanner from "../components/ads-home-components/UrgencyBanner"
import AccessibilitySection from "../components/ads-home-components/AccessibilitySection"
import SolutionSection from "../components/ads-home-components/SolutionSection"
import PricingFunnel from "../components/ads-home-components/PricingFunnel"
import PartnerSlider from "../components/ads-home-components/PartnerSlider"
import FinalCTA from "../components/ads-home-components/FinalCTA"
import LeadModal from "../components/ads-home-components/LeadModal"
import Footer from "../components/Footer"

const HomeComp = () => {
  return (
 <>
 <LeadModal />
 <Navbar /> 
 <HeroSection /> 
 <DashboardFeature />
 <ServicesSection /> 
 <FeaturesSection />
 <InvoiceShowcase />
 <FinanceFeatures /> 
 <UrgencyBanner />
 <AccessibilitySection />
 <SolutionSection />
 {/* <PricingFunnel /> */}
 <PartnerSlider />
 <FinalCTA />
 <Footer /> 
 </>
  )
}

export default HomeComp