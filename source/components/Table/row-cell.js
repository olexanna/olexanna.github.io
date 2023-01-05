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
					<p className={ "table-row-acts-item table-remove" } onClick={ () => reducer([ "remove", { id: id } ])}> remove </p>
					<p className={ "table-row-acts-item table-edit" } onClick={ () => reducer([ "edit", { key: rowKey } ])}> edit </p>
				</div>
			);
		}else{
			return value || "";
		}
	}, [ value, type ]);

	return(
		<div className={"table-row-cell" + (type === "actions" ? " background-unset": " ")}>{ result }</div>
	)
};