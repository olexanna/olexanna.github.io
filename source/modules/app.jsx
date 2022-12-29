import React, { useState } from "react";
import "@styles/main.scss"
import "@styles/fonts.scss"
import { Header } from "@modules/Header";
import { Footer } from "@modules/Footer";
import { Content } from "@modules/Content";


export const App = () => {

	return (
		<section className={"app"}>
			<div>6666</div>
			<Header/>
			<Content/>
			<Footer/>
		</section>
	);
};