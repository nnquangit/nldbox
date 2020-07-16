import * as React from 'react';
import * as ReactDOM from "react-dom";
import './index.css';
import { Chovieclam } from "./box/chovieclam";

export interface cfChovieclam {
  id: string,
  api: string,
}

declare var NldBox: any;
var cfNldbox = {
  chovieclam: {
    id: 'boxChovieclam',
    api: 'http://vieclam.nld.com.vn/export/json-chovieclam.php'
  }
};

if (typeof NldBox !== 'undefined') {
  Object.assign(cfNldbox, NldBox);
}

const chovieclam = document.getElementById(cfNldbox.chovieclam.id)
if (chovieclam) {
  ReactDOM.render(<Chovieclam
    title="CHỢ VIỆC LÀM"
    link="http://vieclam.nld.com.vn/cho-viec-lam/l"
    api={cfNldbox.chovieclam.api}
  />, chovieclam);
}
