import React, { useEffect, useMemo, useState,useReducer } from "react";


export const TableTitlesItem= ( props) => {

	let title = props.title;

	return(
		<p className={"table-title-item"}>
			{title}
		</p>
	)
};