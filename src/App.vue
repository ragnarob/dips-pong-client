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
  font-size: 16px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  background-color: #fff;
  font-weight: 300;
  color: black;
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.19), 0 4px 8px rgba(0,0,0,0.29);
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
.normal-button {
  font-size: 14px !important;
}
.small-button {
  font-size: 14px !important;
  padding: 4px 8px !important;
  border-radius: 4px !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) !important;
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23) !important;
    &.button-disabled {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) !important;
    }
  }
}
.border-around {
  padding: 10px;
  width: 100%;
  box-shadow: 0 19px 20px rgba(0,0,0,0.30), 0 11px 8px rgba(0,0,0,0.12);
  margin-bottom: 20px;
}
select {
  background-color: white;
}
a {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  color: #d02d28;
  transition: 180ms ease;
  &:hover {
    border-bottom: 1px solid #d02d28;
  }
}
.elo {
  font-family: Consolas;
}
.elosmall {
  font-family: Consolas;
  font-size: 14px;
}
h2 {
  font-weight: normal;
}
.successMessage {
  text-align: center;
  color: green;
}
.errorMessage {
  text-align: center;
  color: red;
}
.buttonWithIconFirst {
  padding: 8px 14px 8px 10px;
}
.buttonWithIconLast {
  padding: 8px 10px 8px 14px;
}
th {
  font-weight: normal;
  background-color: #e2e2e2;
}
::selection {
  background-color: #fff;
}
</style>
