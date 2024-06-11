"use client"

import { useState, useEffect } from "react";
import styles from './job_listings.module.css'

export default function JobListings() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetch_data() {
            try {
                const response = await fetch('/json/data.json');
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const jsonData = await response.json();
                console.log('Fetched data:', jsonData);
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching the data:', error);
                setError(error);
                setData(null);
            }
        }
        fetch_data();
    }, []);

    const job_listings = data ? data.map((job, index) => (
        <div className={styles.job_listing} key={index}>
            <img src={job.logo} alt={`${job.company} logo`} />

            <div className={styles.info}>        
               <div className={styles.flex}>
               <h6>{job.company}</h6>
                <p className={job.new ? styles.new : styles.hidden}>NEW!</p>
                <p className={job.featured ? styles.featured : styles.hidden}>FEATURED</p>
               </div>

                <h4>{job.position}</h4>


                <ul className={styles.flex}>
                    <li>{job.postedAt}</li>
                    <li>{job.contract}</li>
                    <li>{job.location}</li>
                </ul>
            </div>

            <div className={styles.extra_info}>
                <ul>
                    {job.languages.map((language, langIndex) => (
                        <li className={styles.language} key={langIndex}>{language}</li>
                    ))}
                </ul>
            </div>
        </div>
    )) : (error ? <p>Error fetching job listings</p> : <p>Loading...</p>);

    return (
        <div className={styles.job_listings}>
            {job_listings}
        </div>
    );
}