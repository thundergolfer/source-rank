import React from "react";
import "./style.css";

const SvgComponent = props => (
  <div style={{ position: 'relative', display: 'inline-block', top: -8 }}>
    <div styleName="fb-circle" />
    <svg width={50} height={50} viewBox="96 93 322 324" {...props} style={{ position: 'absolute', top: 0 }}>
      <path
        d="M257 93c-88.918 0-161 67.157-161 150 0 47.205 23.412 89.311 60 116.807V417l54.819-30.273C225.449 390.801 240.948 393 257 393c88.918 0 161-67.157 161-150S345.918 93 257 93zm16 202l-41-44-80 44 88-94 42 44 79-44-88 94z"
        fill="#0084ff"
      />
    </svg>
  </div>
);

export default SvgComponent;
