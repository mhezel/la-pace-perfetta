"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
    //client side search-params 
   const searchParams = useSearchParams();
   const router = useRouter(); //for programmatic  routing like useNavigate, hook client side navigation
   const pathname = usePathname();
   const activeFilter = searchParams.get("capacity") ?? "all"; //give fallback always if params doesn't exists

    function handleFilter(filter){
     //console.log(filter);
     const params = new URLSearchParams(searchParams);
     params.set("capacity", filter); //builds the parameter URL
     router.replace(`${pathname}?${params.toString()}`, {scroll:false});
    }

    return (
        <div className="border border-primary-800 flex font-light" >
            <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>All</Button>
            <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3 guests</Button>
            <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7 guests</Button>
            <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12 guests</Button>
        </div>
    );
}

function Button({children, filter, handleFilter, activeFilter}){ 

    return(
        <button 
            onClick={()=>handleFilter(filter)} 
            className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
        >{children}
        </button>
    );
}

export default Filter;
