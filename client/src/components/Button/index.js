import React from "react";
import classNames from "class-names";

import { Button as BasicButton } from "antd";
import "./Button.scss";

const Button = (props) => {
   return (
       <BasicButton {...props} className={classNames('button', props.className)} >{props.children}</BasicButton>
   )
}

export default Button;