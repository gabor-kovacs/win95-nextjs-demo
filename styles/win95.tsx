import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { styleReset, List, ListItem, Divider } from "react95";
// pick a theme of your choice
import original from "react95/dist/themes/original";
// original Windows95 font (optionally)
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

export const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url(${ms_sans_serif}) format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url(${ms_sans_serif_bold}) format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
    background-color: rgb(0,128,128);

    overflow: hidden;
  }

  a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

.window-header {
    display: flex;
    align-items: center;
   justify-content: space-between;
 }
 .close-icon {
   display: inline-block;
   width: 16px;
   height: 16px;
   margin-left: -1px;
   margin-top: -1px;
   transform: rotateZ(0deg);
   position: relative;
   &:before,
   &:after {
     content: '';
     position: absolute;
   }
   &:before {
     height: 100%;
     width: 3px;
     left: 50%;
     transform: translateX(-50%);
   }
   &:after {
     height: 3px;
     width: 100%;
     left: 0px;
     top: 50%;
     transform: translateY(-50%);
   }
 }

`;
