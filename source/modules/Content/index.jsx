import React, { useEffect, useMemo, useState,useReducer } from "react";
import "./styles/content.scss"
import {Wrapper } from "@components/wrapper/wrapper";



const Country = [
	{ id: 0, key: "USA", title: "USA" },
	{ id: 1, key: "Russia", title: "Russia" },
	{ id: 2, key: "China", title: "China" },
	{ id: 3, key: "Korea", title: "Korea" },
	{ id: 4, key: "Belarus", title: "Belarus" },
	{ id: 5, key: "Kongo", title: "Kongo" },
	{ id: 6, key: "Armenia", title: "Armenia" },
	{ id: 8, key: "Poland", title: "Poland" },
	{ id: 9, key: "Baltia", title: "Baltia" },
	{ id: 10, key: "Czech", title: "Czech" },
	{ id: 11, key: "Bulgaria", title: "Bulgaria" },
	{ id: 12, key: "Abkhazia", title: "Abkhazia" }
];

const Language = [
	{ id: 0, key: "en", title: "English" },
	{ id: 1, key: "ru", title: "Russian" },
	{ id: 2, key: "jp", title: "Japanese" },
	{ id: 3, key: "cn", title: "Chinese" }
];

const Inputs = [
	{ id: 0, key: "Name", placeholder: "Name" },
	{ id: 1, key: "Surname", placeholder: "Surname" },
	{ id: 2, key: "Patronymic", placeholder: "Patronymic" },
	{ id: 3, key: "Age", placeholder: "Age" }
];



export const Content = (props) => {

	return (
		<section className={"content"}>
			<section className={"components"}>

				<Wrapper title={"Table-Finally"}>
					<TableFinally/>
				</Wrapper>

				<Wrapper title={"Table-Repeat"}>
					<TableRepeat/>
				</Wrapper>

				<Wrapper title={"Selector-Test"}>
					<SelectorTest  list={Country} placeholder={"fill the folder"}/>
				</Wrapper>

			</section>
		</section>
	);
};