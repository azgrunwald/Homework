import PCSTools from "./pcsTools.js";

const pcsUser = PCSTools('#textInput');
pcsUser.text('hello');
pcsUser.css('color', 'red');
pcsUser.css('fontSize', '2em');
pcsUser.addClass('myClass');

const pcsUser2 = PCSTools('.myClass');
pcsUser2.css('fontFamily', 'Arial, sans-serif');