// import { useContext } from "react";
// import { DatasContext } from "../../Hooks/CurrentCountryContext.jsx";
import { NavLink } from "react-router-dom";

export function Card({ datas }) {
//   const datas = useContext(DatasContext);


  return (datas ?? []).map((data, index) => (
    <div className="card" key={index}>
      <NavLink to={`/${encodeURIComponent(data.name.common)}`}>
        <div
          className="flag"
          // onClick={() => onClick(data.name.common)}
          data-name={data.name.common}
        >
          <img
            src={data.flags.png}
            alt={data.flags.alt}
            width={360}
            height={200}
          />
        </div>
      </NavLink>
      <div className="body">
        <p className="countryName">{data.name.common}</p>
        <p className="countryPopulation">Population: {data.population}</p>
        <p className="countryRegion">Region: {data.region}</p>
        <p className="countryCapital">Capital: {data.capital}</p>
      </div>
    </div>
  ));
}
