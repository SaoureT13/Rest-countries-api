export function SearchBar({
  value,
  onChange,
  placeHolder,
  handleChoiseFilter,
}) {
  const regions = [
    {
      text: "Africa",
      value: "Africa",
    },
    {
      text: "America",
      value: "America",
    },
    {
      text: "Asia",
      value: "Asia",
    },
    {
      text: "Europe",
      value: "Europe",
    },
    {
      text: "Oceania",
      value: "Oceania",
    },
  ];
  return (
    <div className="searchBar">
      <div className="searchBox">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder={placeHolder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="filterBox">
        <div className="select">
          Filter by Region
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          <input type="checkbox" />
          <div className="optionGroup">
            {regions.map((region, index) => (
              <div
                className="option"
                data-value={region.value}
                key={index}
                onClick={handleChoiseFilter}
              >
                {region.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
