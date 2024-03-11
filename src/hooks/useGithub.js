import { useState } from "react";

export function useGithub() {

    const [user, setUser] = useState();
    const [usersRepositories, setUsersRepositories] = useState();
    const [repositoryInfo, setRepositoryInfo] = useState();

    async function findUserProfile(username) {
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}`, 
                { 
                    method: 'GET' 
                }
            );
            const data = await response.json();
            if (data.message === "Not Found") {
                setUser(null);
            } else {
                setUser(data);
            }
        } catch(err) {
            setUser(null);
            console.error("Error:", err);
        }
    }

    async function findRepositoriesByUserId(username) {
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}/repos`, 
                { 
                    method: 'GET' 
                }
            );
            const data = await response.json();
            setUsersRepositories(data);
        } catch (err) {
            setUsersRepositories([]);
            console.error("Error:", err);
        }
    }

    async function findRepositoryInfo(full_name) {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${full_name}`, 
                { 
                    method: 'GET' 
                }
            );
            const data = await response.json();
            setRepositoryInfo(data);
        } catch (err) {
            setRepositoryInfo(null);
            console.error("Error:", err);
        }
    }

    return {
        findUserProfile,
        findRepositoriesByUserId,
        findRepositoryInfo,
        user,
        usersRepositories,
        repositoryInfo,
    };
}
