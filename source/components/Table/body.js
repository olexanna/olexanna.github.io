import React, { useEffect, useMemo, useState,useReducer } from "react";
import {Row } from "@components/Table/row";


export const TableBody = (props) => {

	let list = props.list||[];
	let row = props.row||[];
	let reducer = props.reducer;

	return(
		<section className={"table-body"}>
			{
				list.map(( cell ) => {

					return(
						<Row row={row}  cell={ cell } key={cell.id}  reducer={reducer} rowKey={ cell.id }/>
					)
				})
			}
		</section>
	)
};