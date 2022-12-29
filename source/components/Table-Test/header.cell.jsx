import React, { useEffect, useMemo, useState, useReducer } from "react";


export const TableHeaderCell = ( props ) => {

	let headerCell = props.headerCell || { key: "0" };

	return(
		<p className={"table-header-cell"}> { headerCell.title }</p>
	)
};