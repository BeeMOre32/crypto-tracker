import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import CoinDetails from "./Routes/CoinDetails";
import Price from "./Routes/Price";
import Chart from "./Routes/Chart";
import { DarkTheme, LightTheme } from "./Theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { DarkMode } from "./atom";

const GlobalStyle = createGlobalStyle`html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
  background-color: ${(p) => p.theme.bodyColor};
  color: ${(p) => p.theme.textColor};
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}`;

export default function App() {
  const darkMode = useRecoilValue(DarkMode);
  return (
    <>
      <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:coinId" element={<CoinDetails />}>
            <Route path="/:coinId/price" element={<Price />} />
            <Route path="/:coinId/chart" element={<Chart />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}
