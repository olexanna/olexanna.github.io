export const RequestEmu = {

	transactions: ( id, callback ) => {
		fetch( "../assets/requests/transactions.json" )
			.then(( response )=>{ return response.json() })
			.then(( response ) => {
				callback( response );
			});
	},

	list: ( query, sortKey, sort, page, callback ) =>{

		fetch( "../assets/requests/list.json" )
			.then(( response )=>{ return response.json() })
			.then(( response )=>{

				let filtered = [];
				let sorted = [];

				if( query ){
					for( const item of response ){

						if( (item.name || "").indexOf( query ) < 0  && (item.email || "").indexOf( query ) < 0 )
							continue;

						filtered.push( item );
					};

				}else{
					filtered = [ ...response ];
				};

				if( sortKey ){
					if( sort === "asc" )
						sorted = filtered.sort( ( a, b ) => a[ sortKey ] - b[ sortKey ] );
					else
						sorted = filtered.sort( ( a, b ) => b[ sortKey ] - a[ sortKey ] );
				}else{
					sorted = [ ...filtered ];
				};

				let list = [];
				let perPage = 20;

				page = parseInt( page ) || 1;

				let offset = (page - 1) * perPage;
				let limit = page * perPage;
				let pages = Math.ceil( response.length / perPage ) || 1;

				for( ; offset < limit; offset++ ){

					if( offset > (sorted.length - 1) )
						break;

					list.push( sorted[ offset ] );
				};

				callback({
					data: list,
					pages: pages
				});
			});
	},
};