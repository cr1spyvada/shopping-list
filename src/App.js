import "./styles/App.scss";
import { useEffect, useState } from "react";
import Tile from "./components/Tile";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        // console.log({ ...res.products[0] });
        setData(res.products);
        setSearch(res.products);
        filterData(res.products);
      });
  };
  const sortOptions = [
    "Alphabetically",
    "Price high to low",
    "Price low to high",
    "Rating ascending",
  ];
  const MAX_COST = 100000;
  const [keyword, setKeyword] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(MAX_COST);
  const [brand, setBrand] = useState();
  const [bid, setBid] = useState([]);

  const filterData = (data) => {
    let brand = [];
    data.map((val) => {
      brand = [...brand, val.brand];
    });
    setBrand([...new Set(brand)]);
  };
  const clearSearch = () => {
    setSearch(data);
    setKeyword("");
    setBid([]);
    setMin(0);
    setMax(MAX_COST);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log({ bid });
    setSearch(
      data.filter((value, idx) => {
        return (
          (bid.length > 0 && bid.includes(value.brand)) ||
          (keyword.length > 0 &&
            value.title.toLowerCase().includes(keyword.toLowerCase())) ||
          (min !== 0 &&
            max !== MAX_COST &&
            value.price >= min &&
            value.price <= max)
        );
      })
    );
  };
  const sortChangeHandler = (event) => {
    if (typeof event.target.value !== "string") return;
    let searchTerm = event.target.value;
    console.log({ searchTerm });
    setSearch((prev) =>
      [].concat(prev).sort((a, b) => {
        if (searchTerm === sortOptions[0]) return a.title > b.title ? 1 : -1;
        else if (searchTerm === sortOptions[1])
          return a.price < b.price ? 1 : -1;
        else if (searchTerm === sortOptions[2])
          return a.price > b.price ? 1 : -1;
        else return a.rating > b.rating ? 1 : -1;
      })
    );
  };
  return (
    <div className="App">
      <header className="header">
        <h1>ShopList</h1>
        <div className="sort-container">
          Sort by
          <select onChange={sortChangeHandler}>
            {sortOptions.map((val, idx) => (
              <option key={idx}>{val}</option>
            ))}
          </select>
        </div>
      </header>
      <div className="body">
        <div className="filter">
          <form onSubmit={submitHandler} className="filter-container">
            <div className="title">
              <h4>Title</h4>
              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>
            <div className="brand">
              <h4>Brands</h4>
              {brand?.map((val, idx) => {
                return (
                  <div>
                    <input
                      checked={bid.includes(val)}
                      onChange={(e) => {
                        if (!bid.includes(val)) setBid([...bid, val]);
                        else
                          setBid((prevArr) =>
                            prevArr.filter((value) => value !== val)
                          );
                      }}
                      key={idx}
                      type="checkbox"
                    />
                    {val}
                  </div>
                );
              })}
            </div>
            <div className="Price">
              <h4>Price</h4>
              <div className="row">
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  placeholder="min value"
                />
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  placeholder="max value"
                />
              </div>
            </div>
            <button
              onClick={(event) => {
                event.preventDefault();
                clearSearch();
              }}
            >
              Clear
            </button>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="tile-container">
          {search?.map((val, idx) => (
            <Tile key={idx} data={val} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
