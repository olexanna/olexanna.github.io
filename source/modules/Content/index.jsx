import React, { useEffect, useMemo, useState,useReducer } from "react";
import "./styles/content.scss"
import {Wrapper } from "@components/wrapper/wrapper";
import { Table } from "@components/Table/table";
//mport { EventTarget } from "@components/eventTarget/event.target";
import { TableTest } from "@components/Table-Test";

export const Content = (props) => {


	return (
		<section className={"content"}>
			<section className={"components"}>

				<Wrapper title={"Table-Test"}>
					<TableTest/>
				</Wrapper>

				<Wrapper title={"Table"}>
					<Table/>
				</Wrapper>

			</section>
		</section>
	);
};