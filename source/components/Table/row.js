import React, { useEffect, useMemo, useState,useReducer } from "react";
import {RowCell } from "@components/Table/row-cell";


export const Row= (props) => {

	let row = props.row || [];
	let cell = props.cell;
	let reducer = props.reducer;
	let rowKey = props.rowKey;

	return(
		<div className={"table-row"}>
			{
				row.map( (item)=>{
					return(
						<RowCell id={cell.id} value={cell[item.key]} key={item.key} reducer={reducer} rowKey={rowKey} type={item.type}/>
					)
				})
			}
		</div>
	)
};