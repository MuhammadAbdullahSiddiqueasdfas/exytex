import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SleekHeader } from '../components/layout/SleekHeader';
import { ElegantFooter } from '../components/layout/ElegantFooter';

import { PremiumHeroSection } from '../components/sections/PremiumHeroSection';
import { AboutExytexSection } from '../components/sections/AboutExytexSection';
import { TopSoftwareDevelopmentSection } from '../components/sections/TopSoftwareDevelopmentSection';
import { SoftwareWorldwideSection } from '../components/sections/SoftwareWorldwideSection';
import { SoftwareForBusinessSection } from '../components/sections/SoftwareForBusinessSection';

import { HomeServicesSection } from '../components/sections/HomeServicesSection';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import BlogSection from '../components/sections/BlogSection';

import { ContactSection } from '../components/sections/ContactSection';
import { FloatingActionButton } from '../components/ui/FloatingActionButton';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const HomePage: React.FC = () => {
  useSmoothScroll();
  const location = useLocation();

  useEffect(() => {
    // Handle state-based scrolling
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
    
    // Handle hash-based scrolling
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Exytex | Top Software House in Pakistan | IT Solutions Company</title>
        <meta name="description" content="Professional IT software company in Pakistan offering web development, mobile apps, digital marketing, SEO, and graphic design services with global reach." />
        <meta name="keywords" content="software house Pakistan, IT solutions company, web development Pakistan, mobile app development, digital marketing services, SEO services, graphic design, Exytex Technologies" />
        <meta property="og:title" content="Exytex | Top Software House in Pakistan | IT Solutions Company" />
        <meta property="og:description" content="Professional IT software company in Pakistan offering web development, mobile apps, digital marketing, SEO, and graphic design services with global reach." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.exytex.com/" />
        <link rel="canonical" href="https://www.exytex.com/" />
      </Helmet>
      
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 w-full overflow-x-hidden">
        <SleekHeader />
      
      <section id="home" className="scroll-mt-24"><PremiumHeroSection /></section>
      <section id="exytex-intro" className="scroll-mt-24"><AboutExytexSection /></section>
      <section id="top-development" className="scroll-mt-24"><TopSoftwareDevelopmentSection /></section>

      <section id="services" className="scroll-mt-24"><HomeServicesSection /></section>
      
      <section id="worldwide" className="scroll-mt-24"><SoftwareWorldwideSection /></section>
      <section id="business" className="scroll-mt-24"><SoftwareForBusinessSection /></section>
      
      <section id="industries" className="scroll-mt-24"><IndustriesSection /></section>

      <section id="blog" className="scroll-mt-24"><BlogSection /></section>

      <section id="contact" className="scroll-mt-24"><ContactSection /></section>
      <ElegantFooter />
      <FloatingActionButton />
      </div>
    </>
  );
};

export default HomePage;
