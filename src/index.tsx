import * as React from 'react';
import * as ReactDOM from "react-dom";
import './index.css';
import { Chovieclam } from "./box/chovieclam";

export interface cfChovieclam {
  id: string,
  api: string,
}

declare var NldBox: any;

if (typeof NldBox === 'undefined') {
  NldBox = {};
}

var cf_chovieclam: cfChovieclam = NldBox.chovieclam || {
  id: 'boxChovieclam',
  api: 'http://vieclam.nld.com.vn/export/json-chovieclam.php'
};

const chovieclam = document.getElementById(cf_chovieclam.id)
if (chovieclam) {
  ReactDOM.render(<Chovieclam api={cf_chovieclam.api} />, chovieclam);
}
