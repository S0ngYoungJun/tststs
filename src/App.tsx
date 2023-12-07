import React from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import "./App.scss"

const options = {
  activeClass: 'active', // the class that is appended to the sections links
  anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'], // the anchors for each sections
  arrowNavigation: true, // use arrow keys
  className: 'SectionContainer', // the class name for the section container
  delay: 1000, // the scroll animation speed
  navigation: true, // use dots navigation
  scrollBar: false, // use the browser default scrollbar
  sectionClassName: 'Section', // the section class name
  sectionPaddingTop: '0', // the section top padding
  sectionPaddingBottom: '0', // the section bottom padding
  verticalAlign: false, // align the content of each section vertically
};

export default function MainPage() {
  return (
    <SectionsContainer {...options}>
    <Section>
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
    </Section>
    <Section>
    <div className="background-image" style={{ backgroundImage: 'url(/image1.jpg)' }} />
    </Section>
    <Section>
    <div className="background-image" style={{ backgroundImage: 'url(/image2.jpg)' }} />
    </Section>
    <Section>
    <div className="background-image" style={{ backgroundImage: 'url(/image3.jpg)' }} />
    </Section>
  </SectionsContainer>
  );
  }