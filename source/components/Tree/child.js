import React, { useEffect, useMemo, useState, useReducer, useRef, useContext } from "react";
import "@components/Tree/styles/tree.scss"
import {TreeContext } from "@components/Tree/tree";


export const Child = ( props ) => {

	let { id, parentId, expanded } = props;
	let { dispatch } = useContext(TreeContext);
	let mark = expanded ? " flex" : " hidden";

	return(
		<div className={"tree-child"}>

			<div className={"tree-child-wrap " }>
				<p className={"tree-child-expand " + (!expanded ? "" : "expand-arrow") } onClick={() => { dispatch([ "expanded", { id: id, value: !expanded } ]) }}>&#8595;</p>

				<div className={"tree-child-text"}>{ props.title }</div>

				<p className={"child-btn"}>
					<span className={"child-btn-add"} onClick={() => { dispatch([ "add", id ]) }}>{"+"}</span>
					<span className={"child-btn-remove"} onClick={() => { dispatch([ "remove", { id: id, parentId: parentId } ]) }}>{"-"}</span>
				</p>
			</div>

			<div className={ "tree-children " + ( mark ) }>
				{
					props.children.map(( unit, index )=>{
						return(
							<Child key={ unit.id } parentId={ id } id={ unit.id } title={ unit.title } children={ unit.children } expanded={ unit.expanded }/>
						);
					})
				}
			</div>
		</div>
	)
};