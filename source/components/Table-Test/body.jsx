import React, { useEffect, useMemo, useState, useReducer } from "react";
import { TableRow } from "@components/Table-Test/row";


export const TableBody = ( props ) => {

	let header = props.header;
	let list = props.list;
	let reducer = props.reducer;

	return(
		<div className={"table-body"}>
		{
			list.map(( cells ) => {
				return(
					<TableRow header={ header } cells={ cells } reducer={ reducer } key={ cells.id } lineKey={ cells.id }/>
				)
			})
		}
		</div>
	)
};