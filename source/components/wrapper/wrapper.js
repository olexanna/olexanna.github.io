import React, { useEffect, useMemo, useState, useReducer} from "react";
import "../wrapper/styles/wrapper.scss"

export  const Wrapper = ( props) => {
	return(
		<div className={"wrapper"}>
			<p className={"wrapper-title"}>{props.title}</p>
			{
				props.children
			}
		</div>
	)
};