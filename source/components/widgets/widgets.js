import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/widgets/styles/widgets.scss"
import {Calc2} from "@components/Calc2/calc2";
import {SelectorJson } from "@components/Selector-json/selector-json";
import {TableFinally} from "@components/Table-Finaly/table.finally";


const WidgetsReducer=( state, [ type, data ] )=>{

};





export const Widgets = ( props ) => {

	const [ state, dispatch ] = useReducer( WidgetsReducer, {
		list:[
			{id: 0,  title: "Calc", path: "calc", icon: "", element: <Calc2/> },
			{id: 1,  title: "Selector", path: "selector", icon: "", element: <SelectorJson/>},
			{id: 2, title: "Table", path: "table", icon: "", element: <TableFinally /> },
		]
	});

	return(
		<article className={"widgets"}>

			<section className={"widgets-block"}>

				<div className={"widgets-menu"}>
					<p className={"widgets-menu-item"}>{"menu"}</p>
				</div>

				<div className={"widgets-display"}>{"display"}</div>

			</section>

		</article>
	);
};