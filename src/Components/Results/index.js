import React from "react";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import "./Results.css";

const Results = ({
  searchText,
  searchResults,
  lessCharacters,
  recentSearch,
}) => {
  const popularCities = [
    { city: "London", country: "England" },
    { city: "Washington", country: "USA" },
    { city: "New Delhi", country: "India" },
  ];

  console.log("recentSearch", searchText);
  const enterMoreMessage = "Please type atleast 3 characters get suggestion";

  return (
    <div className="Results">
      {lessCharacters && <p className="Message">{enterMoreMessage}</p>}

      {searchText.length !== 0 ? (
        searchResults.map((result) => {
          return (
            <div key={result.id} className="Result_item">
              <div className="Result_location">
                <LocationOnOutlinedIcon />
              </div>
              <div>
                <h4 className="Result_h4">{result.name}</h4>
                <p className="Result_p"> {result.secondary_name}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="Recent_search">
          <h4 className="Result_h4">Recent Search</h4>
          <hr />
          <div className="Recent_list">
            {recentSearch.map((recentElement) => {
              return (
                <div className="Recent_element">
                  <p className="Recent_p"> {recentElement}</p>
                </div>
              );
            })}
          </div>
          <div className="Popular_cities">
            <h4 className="Result_h4">Popular Cities</h4>
            <hr />
            <div className="Popular_list">
              {popularCities.map((popularElement) => {
                return (
                  <div className="Popular_element">
                    <h4 className="Popular_h4">
                      {" "}
                      {popularElement.city}{" "}
                      <span className="Popular_span">
                        {popularElement.country}
                      </span>{" "}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
