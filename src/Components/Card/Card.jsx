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
            src={data?.flags.png}
            alt={data?.flags.alt}
            width={360}
            height={180}
          />
        </div>
      </NavLink>
      <div className="body">
        <h3 className="countryName">{data.name.common}</h3>
        <p className="countryPopulation">
          <span className="bold">Population:</span> {data?.population.toLocaleString()}
        </p>
        <p className="countryRegion">
          <span className="bold">Region:</span> {data?.region}
        </p>
        <p className="countryCapital">
          <span className="bold">Capital:</span> {data?.capital}
        </p>
      </div>
    </div>
  ));
}
