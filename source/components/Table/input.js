import React, { useEffect, useMemo, useState,useReducer } from "react";
import {InputCell } from "@components/Table/input-cell";


const TableInputsReducer = ( state, [ type, data ], props      ) => {

	if( type === "reconstruct" ){

		let values = {};

		if( data.key ){
			let line = data.list.find(( item ) => item.id === data.key );

			for( const inpCell of data.inputs ){
				values[ inpCell.key ] = line ? line[ inpCell.key ] : "";
			}
		}else{
			for( const inpCell of data.inputs ){
				values[ inpCell.key ] = "";
			}
		}
		return {
			...state,
			values
		}
	};

	if( type === "change"){

		let values={
			...state.values,
			[data.key]: data.value,
			index: data.index
		};
		return {
			...state,
			values
		}
	};

	if( type === "visible" ){

		return {
			...state,
			visible: data
		}
	};
	return state;
};


export const TableInputs =(props)=>{

	let list = props.list;
	let inputs = props.inputs|| [];
	let reducer = props.reducer|| (()=>{});
	let selectedKey = props.selectedKey;

	const[state, dispatch] =useReducer(TableInputsReducer,{
		values:{},
		visible:false
	});

	useEffect(() => {
		dispatch([ "reconstruct", { inputs: inputs, list: list, key: selectedKey } ]);
	}, [ inputs, list, selectedKey]);

	useEffect(() => {
		dispatch([ "visible", selectedKey ? true: false]);
	}, [  selectedKey]);

	return(
		<div className={"input"}>
			{
				inputs.map((inpCell, index)=>{

					if( inpCell.type === "actions" || inpCell.type === "system" )
						return null;

					return(
							<InputCell
								placeholder={inpCell.placeholder}
								value={state.values[inpCell.key]||""}
								id={inpCell.id}
								key={ inpCell.key }
								onChange={(event) => dispatch([ "change", { value: event.target.value, index: index, key: inpCell.key} ])}
							/>
						)
				})
			}
			<div className={"input-btn-block"}>
				<p className={"input-btn btn-add"} onClick={() => reducer([ "add", state.values ])}>Add</p>
				<p className={"input-btn btn-change"} onClick={() => reducer([ "changeData", {value: state.values, key: selectedKey}])}>Change</p>
			</div>

		</div>
	)
};