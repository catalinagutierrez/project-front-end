import React, { useState, useEffect } from "react";
import { searchByName } from "../../redux/pet-data/pet-data.actions";

import CategoryItem from "../../components/category-item/category-item";

import "./search.styles.scss";

const SearchPage = () => {
  const [query, setQuery] = useState({
    queryString: "",
    results: [],
  });

  useEffect(() => {
    if (query.queryString !== "") {
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            const response = await searchByName(query.queryString);
            setQuery({ ...query, results: response });
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [query]);

  return (
    <div className="wd-search-page">
      <input
        type="search"
        placeholder="Search pets by name..."
        value={query.queryString}
        onChange={(e) => setQuery({ ...query, queryString: e.target.value })}
      />
      <br />
      <div className="wd-search-results">
        {query.results.length > 0 ? (
          query.results.map((item) => (
            <CategoryItem key={item._id} item={item} category={item.category} />
          ))
        ) : (
          <div>No pets found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
