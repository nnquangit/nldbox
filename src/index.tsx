import * as React from 'react';
import * as ReactDOM from "react-dom";
import './index.css';
import { Chovieclam } from "./box/chovieclam";

declare var NldBox: any

if (!NldBox) {
  var NldBox: any = {};
}

NldBox.chovieclam = NldBox.chovieclam || 'boxChovieclam';

const chovieclam = document.getElementById(NldBox.chovieclam)
if (chovieclam) {
  ReactDOM.render(<Chovieclam />, chovieclam);
}
