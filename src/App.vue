<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
div, p, ul, li, table, td, th, tr, span, h1, h2, h3, h4 {
  margin: 0;
  padding: 0;
}
html {
  // height: 100%;
  // width: 100%;
  // overflow: hidden;
}
body {
  background-color: #eee;
  // height: 100%;
  // overflow: hidden;
  margin: 0;
  // background-repeat: no-repeat;
  // background-attachment: fixed;
  font-family: Helvetica;
  // background: linear-gradient(to right bottom, #051937, #171228, #190a1a, #12040d, #000000);
  // color: white;
}
button, input[type=submit] {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff;
  font-weight: 300;
  color: black;
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.19), 0 4px 8px rgba(0,0,0,0.29);
    // background-color: rgb(238, 129, 212);
    cursor: pointer;
  }
}
.button-disabled {
  background-color: #aaa !important;
  box-shadow: none !important;
  &:hover {
    cursor: not-allowed !important;
  }
}
.small-button {
  padding: 4px 8px;
  border-radius: 4px;
}
.border-around {
  padding: 10px;
  width: 100%;
  box-shadow: 0 19px 20px rgba(0,0,0,0.30), 0 11px 8px rgba(0,0,0,0.12);
  margin-bottom: 20px;
}
a {
  text-decoration: none;
  color: #006291;
  &:hover {
    text-decoration: underline;
  }
}
</style>
