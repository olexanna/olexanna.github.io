import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Tree/styles/tree.scss"
import {Child } from "@components/Tree/child";


export const TreeContext = React.createContext({});


const TreeReducer = ( state, [ type, data, data2 ])=>{

	if( type == "add" ){
		let table = { ...state.table };

		//data === parentId
		let parent = data ? table[ data ] : state.root;

		if( !parent )
			return state;

		let leaf = {
			id: Math.floor( Math.random() *  100000.0 ),
			title: "New Leaf",
			expanded: false,
			children: []
		};

		parent.expanded = true; // если добавляем в парент детей то разворачиваем парет
		parent.children.push( leaf );
		table[ leaf.id ] = leaf;

		console.log(leaf, "add");

		return{
			...state,
			table: table
		}
	}
	else if( type == "remove" ){
		let table = { ...state.table };
		let parent = data.parentId < 0 ? state.root : table[ data.parentId ];

		if( !parent )
			return state;

		let index = parent.children.findIndex(( item ) => item.id == data.id );

		if( index < 0 )
			return state;

		parent.children.splice( index, 1 );
		delete table[ data.id ];

		return{
			...state,
			table: table
		}
	}
	else if( type == "expanded" ){
		let table = { ...state.table };
		table[ data.id ].expanded = data.value;

		return{
			...state,
			table: table
		}
	}

	return state;
};


export const Tree = ( props ) => {

	const [ state, dispatch ] = useReducer( TreeReducer, {
		root: { children: [] },
		table: {},
		value:{}
	});

	return(
		<section className={"tree"}>
			<div className={"tree-add-wrap"}>
				<p className={"tree-add"} onClick={()=>{dispatch(["add"])}}>
					<span className={"tree-add-text"}>adding a new list node</span>
					<span className={"tree-add-btn"}>+</span>
				</p>
			</div>

			<div className={"tree-body"}>
				<TreeContext.Provider value={{dispatch: dispatch}}>
					{ state.root.children.map(( item, index ) => {
						return(
								<Child key={ item.id } parentId={ -1 } id={ item.id } title={ item.title } children={ item.children } expanded={ item.expanded }/>
							)
					}) }
				</TreeContext.Provider>
			</div>
		</section>
	)
};

