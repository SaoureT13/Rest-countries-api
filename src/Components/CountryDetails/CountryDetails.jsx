import { useEffect, useState } from "react";
import { NavLink, useLoaderData, useNavigation } from "react-router-dom";

export function Details() {
  //Cette option m'arrange pas, parce que je dois aussi pouvoir afficher les informations des pays voisins lorsqu'on clique sur les btn qui sont dans le footer
  // const { currentCountry } = useLoaderData();

  const { datas } = useLoaderData();
  const { countryName } = useLoaderData();
  const [currentCountry, setCurrentCountry] = useState([]);
  //Pour changer l'url
  const navigate = useNavigation();

  useEffect(() => {
    //garder que le pays qui m'interesse
    const country = datas.filter((data) => data.name.common === countryName);
    setCurrentCountry(country);
  }, [datas, countryName]);

  const navigateToCountry = (country) => {
    const filteredData = datas.filter((data) =>
      data.altSpellings.includes(country)
    );

    if (filteredData.length > 0) {
      const newCountryName = filteredData[0].name.common;
      navigate(`/${newCountryName}`);
    } else {
      console.error("Country not found");
    }
  };

  return (
    <main className="main">
      <div className="left">
        {/* <button className="back" onClick={handleBack}>
          Back
        </button> */}
        <NavLink to="/">Back</NavLink>

        <div>
          <img
            src={currentCountry[0].flags.png}
            alt={currentCountry[0].flags.alt}
          />
        </div>
      </div>
      <div className="right">
        <div className="title">
          <h1>{currentCountry[0].name.common}</h1>
        </div>
        <div className="body">
          <div className="sup">
            <p>
              Native Name:{" "}
              {Object.values(currentCountry[0].name.nativeName)[0].common}
            </p>
            <p>Population: {currentCountry[0].population}</p>
            <p>Region: {currentCountry[0].region}</p>
            <p>Sub Region: {currentCountry[0].subregion}</p>
            <p>Capital: {currentCountry[0].capital}</p>
          </div>
          <div className="sub">
            <p>Top Level Domain: {currentCountry[0].tld}</p>
            <p>
              Currencies: {Object.values(currentCountry[0].currencies)[0].name}
            </p>
            <p>
              Languages: {Object.values(currentCountry[0].languages).join(", ")}
            </p>
          </div>
        </div>
        <div className="footer">
          <p>Border Countries: </p>
          <div className="box-btns">
            {currentCountry[0].borders &&
              currentCountry[0].borders.map((country, index) => (
                <button
                  key={index}
                  onClick={() => navigateToCountry(country)}
                  data-name={country}
                >
                  {country}
                </button>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
