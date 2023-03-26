import { Component } from "@/router/lazyLoadComponents";

/**
 * An array of personal codes. These are used to check 
 * for possible typing errors.
 */
export const lenovaPersonalCodes = [
    "", "Balro"
];


/**
 * Index 0: personal code
 * Index 1: DM code
 * Index 2: message
 * Index 3: message style
 */
export const lenovaMessages = [
    ["", "", [Component.InboxView, {messages: [
        {message: "Hi, <br><br> This is a global message. <br><br> Kind regards, <br> Alvyn"},
        {message: "A seconday message appeared", messageStyle: "child"}]}]],
    ["Balro", "", [Component.MessageBox, {message: "This is a personal message", messageStyle: "child"}]],
    ["", "Bonjour", [Component.MessageBox, {message: "This is a secret note", messageStyle: ""}]],
    ["Balro", "Secret", [Component.MessageBox, {message: "This is a personal message"}]],
    ["", "x", [Component.AccessDeniedView]],
    ["", "y", [Component.ImageDocView, {
        docSrc: "https://docs.google.com/document/d/e/2PACX-1vQntHl593EJQ8-uDr3-RxkAVt82--xxKyMOHRISDrqJSSVnXrB2DdhyQeDUFNOIWXv_q6LBTDX7PRUu/pub?embedded=true",
        imgSrc: "lenova/worldmap.jpg"
    }]]
];
