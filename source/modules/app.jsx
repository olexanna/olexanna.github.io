import React, { useState } from "react";
import "@styles/main.scss"
import "@styles/fonts.scss"
import {Routes, Route } from "react-router";
import {Link} from "react-router-dom";
import { Contain } from "@modules/Contain";
import {Calc2} from "@components/Calc2/calc2";
import {SelectorJson} from "@components/Selector-json/selector-json";



export const App = () => {

	return (
		<section className={"app"}>

			<div className={"routing"}>
				<div>
					<div><Link to="/calc">Calc</Link></div>
					<div><Link to="/selector">Selector</Link></div>
				</div>
				<Routes>
					<Route path={"/"} element={<Calc2/>}/>
					<Route path={"/calc"} element={<Calc2/>}/>
					<Route path={"/selector"} element={<SelectorJson/>}/>
				</Routes>
				</div>
		</section>
	);
};