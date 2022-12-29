import React, { useEffect, useMemo, useState, useReducer } from "react";
import {TableHeaderCell } from "@components/Table-Test/header.cell";


export const TableHeader = ( props ) =>{

	let header = props.header || [];

	return(
		<div className={"table-header"}>
			{
				header.map(( header ) => {
					return(
						<TableHeaderCell headerCell={ header } key={ header.key }/>
					)
				})
			}
		</div>
	)
};