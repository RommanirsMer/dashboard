import React, {useEffect, useState} from "react"
import axios from "axios";
import param from "../../param";

const TwitterWidget = () => {

    const [results, setResults] = useState([])

    const submitSearch = (evt) => {
        console.log(evt.target.value);
        if (evt.target.value.length >= 3) {
            axios.get(param.twitter + `?query=${evt.target.value}`)
                .then(res => {
                    setResults(res.data);
                    console.log(res.data)
                }).catch(error => {
                console.log("error:", error)
            })
        }
    };
    const renderResult = (result) => {
        return (
            <a className="twitter-result"
               href={"https://twitter.com/"+result.screen_name}
               key={result.id}
               target="_blank"
               rel="noreferrer"
            >
                <span>
                    <img alt={"Photo de profil"} src={result.profile_image_url_https}/></span>{result.name}
                {result.verified &&
                <svg
                    viewBox="0 0 24 24" aria-label="Compte certifié"
                    className="certified r-13gxpu9 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                    <g>
                        <path
                            d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.8181.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                    </g>
                </svg>
                }

            </a>
        )
    }


    return (
        <div>
            <input
                onKeyDown={(evt) => submitSearch(evt)}
                type="text"
                placeholder="Quel utilisateur voulez vous voir ?"
            />

            <div className="twitter-results">
                {results.map(question => renderResult(question))}
            </div>
        </div>
    )
}
export default TwitterWidget;