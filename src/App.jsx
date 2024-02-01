import "./App.scss";
import { Header } from "./Components/Header/Header";
import {
  createBrowserRouter,
  defer,
  Outlet,
  RouterProvider,
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
    path: "/",
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
          
          const currentCountry = datas.filter(
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
  // const [currentCountry, setCurrentCountry] = useState([]);

  //Recupereation du resultat de l'appel Fetch
  const { datas } = useFetch({
    url: currentUrl,
  });

  //Recuperation de la valeur du champ textuel
  useEffect(() => {
    if (value) {
      const newUrl = `https://restcountries.com/v3.1/translation/${value.trim()}`;
      setCurrentUrl(newUrl);
    }
    console.log(value);
  }, [value]);

  //Fonction pour mettre a jour le filtrer selon le choix du continent des pays
  const handleChoiseFilter = (e) => {
    const fil = e.target.dataset.value;
    setFilter(fil);
  };

  //Le useEffect observe filter, s'il contient une valeur alors là il met à jour l'URL pour la requete a l'api en y ajoutant la "region choisi"
  useEffect(() => {
    if (filter) {
      const newUrl = `https://restcountries.com/v3.1/region/${filter}`;
      setCurrentUrl(newUrl);
    }
  }, [filter]);

  // const handleFlagClick = (countryName) => {
  //   const country = datas.filter((data) => data.name.common === countryName);
  //   console.log(country);

  //   setCurrentCountry(country);
  // };

  return (
    <>
      <Header></Header>
      <SearchBar
        placeHolder="Search for a country..."
        value={value}
        onChange={setValue}
        handleChoiseFilter={handleChoiseFilter}
      />
      <Outlet></Outlet>
      <div className="container">
        <Card datas={datas} 
        // onClick={handleFlagClick}
         />
      </div>
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