import React, { useEffect, useMemo, useState, useReducer } from "react";


export const  TableCell = ( props ) => {

	let id = props.id;
	let value = props.value;
	let reducer = props.reducer || (() => {});
	let type = props.type;
	let lineKey = props.lineKey;

	let result = useMemo(() => {
		if( type === "actions" ){

			return (
				<div className={ "table-row-acts" }>
					<div className={ "table-row-acts-item" } onClick={ () => reducer([ "remove", { id: id } ])}> remove </div>
					<div className={ "table-row-acts-item" } onClick={ () => reducer([ "edit", { key: lineKey } ])}> edit </div>
				</div>
			);
		}
		return value || "";
	}, [ value, type ]);

	return(
		<div className={"table-row-cell"}>{ result }</div>
	)
};