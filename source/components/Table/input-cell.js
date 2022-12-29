import React, { useEffect, useMemo, useState,useReducer } from "react";



export const InputCell = (props) => {

	let placeholder = props.placeholder||{ key: "0" };
	let value = props.value;
	let onChange = props.onChange || (()=>{});

	return(
		<input placeholder={placeholder} className={"input-cell"} value={value} onChange={onChange} />
	)
};