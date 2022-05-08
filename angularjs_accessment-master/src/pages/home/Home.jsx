import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Angular from "../../assets/angular-logo.png";
import { AngularContext} from "../../AngularContext";




const Home = () => {

    const { error, repoCout, repos } = useContext(AngularContext);
    const [repoName, setRepoName] = useState("angular.js");
    const [contributorsURL, setContributorsURL] = useState();
    const [contributors, setContributors] = useState([]);
    const [filter, setFilter] = useState("Contributions");
    console.log("contributorsURL: " + contributorsURL);




    useEffect(() => {
        // geting repo by it's name to utilize the contributors-url
        // /repos/{owner}/{repo}

        fetch(`https://api.github.com/repos/Angular/${repoName}`, {
            method: "GET",
            header: {
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json",
                "User-Agent": "Chris-Imade"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setContributorsURL(data.contributors_url);
        })
        .catch((error) =>{
            console.log(error); 
        });



        fetch(`${contributorsURL}`, {
            method: "GET",
            header: {
                "Accept":"application/vnd.github.v3+json",
                "Content-Type": "application/json",
                "User-Agent": "Chris-Imade"
            }
        })
        .then((res) => res.json())
        .then((data) => setContributors(data))
        .catch((error) => console.log(error))


           // For user data full
        // contributors.map((contributor) => 
        //     fetch(`https://api.github.com/users/${contributor.login}`, {
        //     method: "GET",
        //     headers: {
        //         "Accept":"application/vnd.github.v3+json",
        //         "Content-Type": "application/json",
        //         "User-Agent": "Chris-Imade"
        //     }})
        //     .then((res) => res.json())
        //     .then((data) => console.log(data))
        //     .catch((error) => console.log(error)))
        


    }, [contributorsURL, repoName])



    return (
        <div className={`${styles.container} bg-slate-200`}>
            <div className="mb-6 animate-bounce">
                <img src={Angular} alt="Angular" width={300} />
            </div>
            <div className={`${styles.mainBody} bg-white rounded-lg shadow-lg p-4`}>
                <div className="w-full">
                    <div className="mb-2">
                        <h4>Angular Total repositories: {repoCout}</h4>
                    </div>
                    <hr />
                    <div>
                        {/* Search bar */}
                        <form>
                            <input className={`${styles.searchInput} text-gray-500 border-0 outline-none py-2`} type="search" placeholder="Search Contributors" />
                        </form>
                    </div>
                    <hr />
                    <div className="">
                        <h4>Filter by:</h4>
                        <div className="flex">
                            <div className="flex flex-col pr-4 border-r-2 border-r-slate-500">
                                <label htmlFor="repos">Public Repos:</label>

                                <select value={repoName} onChange={(e) => setRepoName(e.target.value)} className="outline-none py-2 px-4 rounded-lg" id="repos">
                                    <option disabled className="py-2 px-4 bg-white text-gray-800">Choose a Repo</option>
                                    {repos.map((repo, index) => (
                                        <option className="bg-slate-800 text-white font-bold" key={index} value={repo.name}>{repo.name}</option>
                                    ))}
                                </select>
                                <div className="">Total contributors: {contributors.length}</div>
                                <hr />
                            </div>
                            <div className="ml-4 flex flex-col">
                                <label htmlFor="filters">Search Queries</label>
                                <select className="outline-none py-2 px-4 rounded-lg" value={filter} onChange={(e) => setFilter(e.target.value)} name="filters" id="filters">
                                    <option className="bg-slate-800 text-white font-bold" value="Contributions">Contributions</option>
                                    <option className="bg-slate-800 text-white font-bold" value="Followers">Followers</option>
                                    <option className="bg-slate-800 text-white font-bold" value="Repos">Repos</option>
                                    <option className="bg-slate-800 text-white font-bold" value="Gists">Gists</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.contributors} flex flex-col jusstify-center items-start my-4`}>
                        {/* {contributors.map((contributor, index) => (
                            <div key={index} className="flex justify-start items-center py-2 w-full px-2 rounded-md hover:bg-slate-200">
                            <Link to={`/angular-collaborator/${contributor.login}`}>
                                <div className="flex items-center">
                                    <div><img className="mr-4 rounded-full w-16 h-16 border-2 border-slate-500" src={contributor.avatar_url} alt="avatarURL" /></div>
                                    <div><h4 className="text-2xl font-semibold">{contributor.login}</h4></div>
                                </div>
                            </Link>
                            </div>
                        ))} */}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Home;