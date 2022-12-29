import React, { useEffect, useMemo, useState,useReducer } from "react";
import{TableTitlesItem } from "@components/Table/table-titles-item";


export const TableTitles= ( props) => {

	let tableTitles = props.tableTitles|| [];

	return(
		<div className={"table-title"}>
			{
				tableTitles.map( (item) =>{

					return(
						<TableTitlesItem title={item.title} key={item.key}/>
					)
				})
			}
		</div>
	)
};