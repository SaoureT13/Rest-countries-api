import "./App.scss";
import { Header } from "./Components/Header/Header";
import {
  createBrowserRouter,
  defer,
  Outlet,
  RouterProvider,
  useLocation,
  useRouteError,
} from "react-router-dom";
import { SearchBar } from "./Components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useFetch } from "./Hooks/useFetch";
import { Card } from "./Components/Card/Card.jsx";
import { Details } from "./Components/CountryDetails/CountryDetails.jsx";

const router = createBrowserRouter([
  {
    path: "Rest-countries-api",
    element: <Root />,
    errorElement: <PageError />,
    children: [
      {
        path: ":countryName",
        element: <Details />,
        loader: async ({ params }) => {
          const countryName = params.countryName;
          const response = await fetch("https://restcountries.com/v3.1/all");
          const datas = await response.json();

          const currentCountry = datas.find(
            (data) => data.name.common === countryName
          );

          return defer({
            //Ma premiere solution, je recupere la reponse entiere
            datas,
            //Je recupere seulement les informations du pays dont le nom est dans l'url
            currentCountry,
          });
        },
      },
    ],
  },
]);

function Root() {
  const valueRef = useRef(null);
  const [value, setValue] = useState("");
  valueRef.current = value;
  const [filter, setFilter] = useState("");
  //URL pour afficher tous les pays
  const [currentUrl, setCurrentUrl] = useState(
    "https://restcountries.com/v3.1/all"
  );

  //Recupereation du resultat de l'appel Fetch
  const { datas, error } = useFetch({
    url: currentUrl,
    options: ""
  });

  //Recuperation de la valeur du champ textuel
  useEffect(() => {
    if (value.length > 0) {
      const newUrl = `https://restcountries.com/v3.1/translation/${value.trim()}`;
      setCurrentUrl(newUrl);
      setFilter("")
    }
    if(value.length == 0){
      const newUrl = `https://restcountries.com/v3.1/all`;
      setCurrentUrl(newUrl);
    }
  }, [value]);

  //Fonction pour mettre a jour le filtrer selon le choix du continent des pays
  const handleChoiseFilter = (e) => {
    const fil = e.target.dataset.value;
    if(filter == "" ){
      setFilter(fil);
    }
    if(filter == fil){
      setFilter("");
      const newUrl = `https://restcountries.com/v3.1/all`;
      setCurrentUrl(newUrl);
    }
    setValue("")
  };

  //Le useEffect observe filter, s'il contient une valeur alors là il met à jour l'URL pour la requete a l'api en y ajoutant la "region choisi"
  useEffect(() => {
    if (filter) {
      const newUrl = `https://restcountries.com/v3.1/region/${filter}`;
      setCurrentUrl(newUrl);
    }
  }, [filter]);

  const location = useLocation();
  // console.log(location.pathname)

  return (
    <>
      <Header></Header>

      <Outlet></Outlet>
      {/*Je me suis basé sur la longueur de mon url pour afficher tous les pays ou non, parce que j'avais pas d'autre idée*/}
      {location.pathname == "/Rest-countries-api/" && (
        <div className="container">
          <SearchBar
            placeHolder="Search for a country..."
            value={value}
            onChange={setValue}
            handleChoiseFilter={handleChoiseFilter}
            filter={filter}
          />
          {!error && <Card datas={datas} />}
        </div>
      )}
    </>
  );
}

function PageError() {
  //Ce hook nous permet de capturer la derniere erreur rencontré par le router
  const error = useRouteError();

  return (
    <>
      <h1>Erreur survenu</h1>
      {error?.error?.toString() ?? error?.toString()}
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
