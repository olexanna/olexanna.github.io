import React, { useEffect, useMemo, useState,useReducer } from "react";
import "./styles/content.scss"
import {Wrapper } from "@components/wrapper/wrapper";
import { Table } from "@components/Table/table";
//import { TableTest } from "@components/Table-Test";
import {Selector } from "@components/Selector/selector";


export const Content = (props) => {


	return (
		<section className={"content"}>
			<section className={"components"}>

				<Wrapper title={"Selector"}>
					<Selector/>
				</Wrapper>

				<Wrapper title={"Table"}>
					<Table/>
				</Wrapper>

			</section>
		</section>
	);
};