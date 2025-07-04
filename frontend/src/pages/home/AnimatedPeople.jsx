import React from "react";
import "./animatedpeople.css";

const AnimatedPeople = () => (
  <div className="animated-people-bg">
    <svg
      viewBox="0 0 420 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animated-people-svg"
    >
      {/* Background gradient */}
      <defs>
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#6ed5e6"/>
          <stop offset="100%" stopColor="#8ad1c2"/>
        </radialGradient>
        <linearGradient id="yellowRect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD86C"/>
          <stop offset="100%" stopColor="#F9C846"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="420" height="270" rx="24" fill="url(#bgGradient)"/>

      {/* Yellow rounded rectangle */}
      <rect x="25" y="30" width="370" height="200" rx="20" fill="url(#yellowRect)"/>

      {/* Lightbulb */}
      <g className="bulb-group">
        <circle cx="370" cy="35" r="13" fill="#FF7EB6"/>
        <rect x="367" y="47" width="6" height="7" rx="2" fill="#222"/>
      </g>

      {/* Diamond bottom left */}
      <g opacity="0.7">
        <rect x="38" y="210" width="18" height="18" rx="4" fill="#F9E79F" transform="rotate(-30 38 210)"/>
      </g>

      {/* People */}
      {/* Left */}
      <g className="person">
        <ellipse cx="90" cy="130" rx="45" ry="70" fill="#6EC6E6"/>
        <circle cx="90" cy="110" r="22" fill="#fff"/>
        <rect x="65" y="132" width="50" height="48" rx="18" fill="#FFB6C1"/>
      </g>
      {/* Middle */}
      <g className="person">
        <ellipse cx="210" cy="130" rx="45" ry="70" fill="#6EC6E6"/>
        <circle cx="210" cy="110" r="22" fill="#fff"/>
        <rect x="185" y="132" width="50" height="48" rx="18" fill="#3DDC97"/>
      </g>
      {/* Right */}
      <g className="person">
        <ellipse cx="330" cy="130" rx="45" ry="70" fill="#6EC6E6"/>
        <circle cx="330" cy="110" r="22" fill="#fff"/>
        <rect x="305" y="132" width="50" height="48" rx="18" fill="#8D6EE6"/>
      </g>
    </svg>
  </div>
);

export default AnimatedPeople;
