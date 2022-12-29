import React, { useEffect, useMemo, useState,useReducer } from "react";



export const RowCell = (props) => {

	let id = props.id;
	let value = props.value;
	let reducer = props.reducer || (() => {});
	let type = props.type;
	let rowKey = props.rowKey;

	let result = useMemo(() => {
		if( type === "actions" ){

			return (
				<div className={ "table-row-acts" }>
					<div className={ "table-row-acts-item" } onClick={ () => reducer([ "remove", { id: id } ])}> remove </div>
					<div className={ "table-row-acts-item" } onClick={ () => reducer([ "edit", { key: rowKey } ])}> edit </div>
				</div>
			);
		}else{
			return value || "";
		}
	}, [ value, type ]);

	return(
		<div className={"table-row-cell"}>{ result }</div>
	)
};