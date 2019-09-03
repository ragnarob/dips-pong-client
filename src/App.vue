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
  height: 100%;
  width: 100%;
  overflow: hidden;
}
body {
  height: 100%;
  overflow: hidden;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: Helvetica;
  background: linear-gradient(to right bottom, #051937, #171228, #190a1a, #12040d, #000000);
  color: white;
}
button, input[type=submit] {
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  background-color: rgb(250, 183, 234);
  color: #222;
  &:hover {
    background-color: rgb(238, 129, 212);
    cursor: pointer;
  }
}
.button-disabled {
  background-color: #aaa !important;
  &:hover {
    cursor: not-allowed !important;
  }
}
</style>
