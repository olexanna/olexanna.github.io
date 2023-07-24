import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";



export const Button = ( props ) => {
	let onClick = props.onClick || (()=>{});


	return(
		<div className={"btn " + (props.btnClass) } onClick={onClick}>{ props.button|| ""}</div>
	)
};