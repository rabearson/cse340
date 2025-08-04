import { toggleMobileMenu, handleResizeEffect } from "./utils.mjs";

const header = document.querySelector("#top-header")
const nav = document.querySelector("nav")
const body = document.querySelector("body")
const hamburger = document.querySelector(".hamburger-menus")

toggleMobileMenu(header, nav, body,hamburger)
handleResizeEffect(header, nav, body)