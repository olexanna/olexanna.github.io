import React, { useEffect, useMemo, useState, useReducer } from "react";
import { TableCell } from "@components/Table-Test/cell";


export const TableRow = ( props ) => {

	let header = props.header;
	let cells = props.cells;
	let reducer = props.reducer;
	let lineKey = props.lineKey;

	return(
		<div className={"table-row"}>
			{
				header.map(( headerCell ) => {
					return (
						<TableCell id={ cells.id } value={ cells[ headerCell.key ] } reducer={ reducer } type={ headerCell.type } key={ headerCell.key } lineKey={ lineKey }/>
					)
				})
			}
		</div>
	)
};
