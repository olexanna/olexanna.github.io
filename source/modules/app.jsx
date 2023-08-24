import React, { useReducer, useState } from "react";
import "@styles/main.scss"
import "@styles/fonts.scss"
import "@styles/app.scss"
import {Routes, Route, useLocation, Navigate } from "react-router-dom";
import {Link} from "react-router-dom";
import {Calc2} from "@components/Calc2/calc2";
import {SelectorJson} from "@components/Selector-json/selector-json";
import {DataTable } from "@components/Data-Table/data.table";


const AppReducer = ( state, [ type, data ] ) => {

};



export const App = () => {

	const [ state, dispatch ] = useReducer( AppReducer, {
		selectIndex: ""
	});

	const location = useLocation();
	const pathname = location.pathname;

	const components = [
		{id:0,element: <Calc2/>, path:"/calc", title:"Calc", key: "Calc", icon:"" },
		{id:1, element: <SelectorJson/>, path:"/selector", title:"Selector", key: "Selector", icon:""  },
		{id:2, element: <DataTable/>, path:"/table", title:"Table", key: "Table", icon:""  },
	];

	return (
		<article className={"app"}>
		<section className={"routing"}>

			<div className={"routing-menu"}>
				<p className={"routing-menu-title"}>
					<span  className={"routing-menu-title-i"}>
						<svg  viewBox="0 0 61 76.25" version="1.1" x="0px" y="0px">
							<g stroke="none" strokeWidth="1" fill="none" >
								<g transform="translate(-10.000000, -10.000000)">
								<g transform="translate(5.000000, 5.000000)"><polygon points="0 0 70 0 70 70 0 70"/>
								<path d="M34.1666667,40.4004648 L59.5,40.4004648 L59.5,65.7337981 L34.1666667,65.7337981 L34.1666667,40.4004648 Z M36.1666667,63.7337981 L57.5,63.7337981 L57.5,42.4004648 L36.1666667,42.4004648 L36.1666667,63.7337981 Z M5,65.7337981 L5,40.4004648 L30.3333333,40.4004648 L30.3333333,65.7337981 L5,65.7337981 Z M28.3333333,63.7337981 L28.3333333,42.4004648 L7,42.4004648 L7,63.7337981 L28.3333333,63.7337981 Z M5,11.2337981 L30.3333333,11.2337981 L30.3333333,36.5671315 L5,36.5671315 L5,11.2337981 Z M7,13.2337981 L7,34.5671315 L28.3333333,34.5671315 L28.3333333,13.2337981 L7,13.2337981 Z M47.8416667,5 L65.764839,22.891506 L47.8416667,40.8146784 L29.9184943,22.891506 L47.8416667,5 Z M32.7481724,22.892757 L47.8416667,37.9862512 L62.935161,22.892757 L47.8416667,7.82592962 L32.7481724,22.892757 Z" fill="#efd5ff" /></g>
								</g>
							</g>
						</svg>
					</span>
					<span  className={"routing-menu-title-text"}>Widgets</span>
				</p>

				<p className={"routing-menu-heading"}>MAIN MENU</p>

				<div className={"routing-link"}>
					{
						components.map((item, index)=>{
							return(
								<p key={item.key} className={"routing-link-item " + (pathname === item.path ? " select-item":"" )}>
									<span className={"routing-link-item-i"}>{item.icon}</span>
									<Link to={item.path}>{item.title}</Link>
								</p>
							)
						})
					}
				</div>
			</div>


			<div className={"routing-elems"}>
				<div className={"routing-elems-wrap"}>
				<Routes>
					<Route path="/" element={<Navigate to="/calc" replace={true}/>}/>
					{
						components.map((item)=>{
							return(
								<Route path={item.path} element={item.element} key={item.key}/>
							)
						})
					}
				</Routes>
				</div>
			</div>

		</section>
		</article>
	);
};