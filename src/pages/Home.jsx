import React, { useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom';
import search from '../img/search.svg'
const API = "https://restcountries.com/v3.1/all";


const Home = () => {
    const countries = useLoaderData();
    let options = {
        style:"decimal",
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }

    const [searchQuery, setSearchQuery] = useState("");
const [region, setRegion] = useState("");

const handleSearchChange = (event)=>{
  setSearchQuery(event.target.value);
};
const handleRegionChange = (event)=>{
  setRegion(event.target.value);
};

const filterSearch = (country)=>{
  if(searchQuery.trim() === ""){
    return true;
  }
  return country.name.common
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
}

const Filterbyregion = (country)=>{
  if(region === ""){
    return true;
  }return country.region === region
}

const filterCountries = countries.filter(filterSearch);
const filterCountriesbyRegion = filterCountries.filter(Filterbyregion);

  return (
   <section className='py-12 min-h-screen dark:bg-textColor '>
    <div className='w-full max-w-[1320px] px-5 mx-auto'>
        {/* Input & Select */}
        <div className="flex flex-col items-end sm:flex-row sm:justify-between">
          {/* Input */}
          <div className="relative w-full max-w-[480px] mb-5 sm:mr-10 sm:mb-0">
            <input
              className="w-full py-[18px] pl-[74px] rounded-md shadow-input text-sm text-textColor dark:bg-lightDark dark:text-white "
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a country…"
            />
            <img
              className="absolute top-5 left-8"
              src={search}
              alt="search icon"
            />
          </div>

          {/* Select */}
          <select
            defaultValue="DEFAULT"
            onChange={handleRegionChange}
            className="px-6 py-5 shadow-input w-52 text-sm text-textColor space-y-2 rounded-[5px] dark:text-white dark:bg-lightDark bg-white"
          >
            <option value="DEFAULT" disabled>
              Filter by region
            </option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
         
         <div className='pt-12'>
          <ul className='grid  grid-cols-1 gap-10 sm:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-16 lg:gap-y-14 xl:grid-cols-4 xl:gap-x-[74px] xl:gap-y-16 dark:text-white'>
            {
                filterCountriesbyRegion.map((country)=>{
                    return(
                        <li key={country.name.common} className='shadow-listItem bg-white dark:bg-lightDark  '
                        >
                        
                        <Link to={country.name.common}>
                        <img className='w-[267px] h-40' src={country.flags.png} alt={country.name.common + "flag"} />
                         <div className='pt-6 pb-11 px-6'>
                            <h3 className='text-[#111517] text-lg font-[800] leading-[26px] mb-4 dark:text-white'>
                                {country.name.common}
                            </h3>
                            <p className='text-[#111517] text-sm leading-4 font-normal mb-2 dark:text-white'>
                                <b className='font-semibold mr-0.5 dark:text-white'>
                              Population:   
                                </b>
                            {
                            country.population.toLocaleString("uz-Uz", options)
                            }
                            </p>
                            <p className='text-[#111517] text-sm leading-4 font-normal mb-2 dark:text-white '>
                                <b className='font-semibold mr-0.5 dark:text-white'>
                                Region:  
                                </b>
                            {
                            country.region
                            }
                            </p>
                            <p className='text-[#111517] text-sm leading-4 font-normal dark:text-white'>
                                <b className='font-semibold mr-0.5 dark:text-white'>Capital:</b>
                            {
                            country.capital ? country.capital : "No capital"
                            }
                            </p>
                         </div>
                        </Link>
                        </li>
                    )
                })
            }
          </ul>
         </div>
    </div>
   </section>
  )
}
export default Home
export const fetchApi = async () => {
    const res = await fetch(API);
    const data = await res.json();
    if(!res.ok){
        throw  Error("Davlatlarni olib bolmadi")
    }
    return data;
}