import { NavLink, useLoaderData, useNavigate } from "react-router-dom";

export function Details() {
  const { datas, currentCountry } = useLoaderData();

  // const { countryName } = useParams();

  //Pour changer l'url
  const navigate = useNavigate();

  const navigateToCountry = (country) => {
    const filteredData = datas.filter(
      (data) =>
        data.cioc === country ||
        data.cca2 === country ||
        data.ccn3 === country ||
        data.cca3 === country
    );

    if (filteredData.length > 0) {
      const newCountryName = filteredData[0].name.common;
      navigate(`/Rest-countries-api/${encodeURIComponent(newCountryName)}`);
    } else {
      console.error("Invalid country name");
    }
  };

  return (
    <main className="main">
      <NavLink to="/Rest-countries-api" className="back_btn">
        Back
      </NavLink>
      <div className="wrapper">
        <div className="left">
          <img
            src={currentCountry.flags.png}
            alt={currentCountry.flags.alt}
          />
        </div>
        <div className="right">
          <div className="title">
            <h1>{currentCountry.name.common}</h1>
          </div>
          <div className="body">
            <div className="sup">
              <p>
                <span className="bold">Native Name: </span>
                {Object.values(currentCountry.name.nativeName)[0].common}
              </p>
              <p>
                <span className="bold">Population:</span>{" "}
                {currentCountry.population}
              </p>
              <p>
                <span className="bold">Region:</span> {currentCountry.region}
              </p>
              <p>
                <span className="bold">Sub Region:</span>{" "}
                {currentCountry.subregion}
              </p>
              <p>
                <span className="bold">Capital:</span>{" "}
                {currentCountry.capital}
              </p>
            </div>
            <div className="sub">
              <p>
                <span className="bold">Top Level Domain:</span>{" "}
                {currentCountry.tld}
              </p>
              <p>
                <span className="bold">Currencies:</span>{" "}
                {Object.values(currentCountry.currencies)[0].name}
              </p>
              <p>
                <span className="bold">Languages: </span>
                {Object.values(currentCountry.languages).join(", ")}
              </p>
            </div>
          </div>
          <div className="footer">
            <p className="bold">Border Countries: </p>
            <div className="box-btns">
              {currentCountry.borders &&
                currentCountry.borders.map((country, index) => (
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
      </div>
    </main>
  );
}
