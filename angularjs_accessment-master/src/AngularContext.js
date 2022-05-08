import React, { createContext, useState, useEffect } from "react";

export const AngularContext = createContext();

const AngularContextProvider = (props) => {

    const [error, setError] = useState(false);
    const [repos, setRepos] = useState([]);


    useEffect(() => {
        // Listting all repositories

        fetch("https://api.github.com/orgs/Angular/repos", {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json",
                "User-Agent": "Chris-Imade"
            }
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }, [])
   

    return (
        <AngularContext.Provider 
        value={{ 
            error: error,
            repoCout: repos.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            repos: repos
        }}>
            {props.children}
        </AngularContext.Provider>
    )
}
export default AngularContextProvider;