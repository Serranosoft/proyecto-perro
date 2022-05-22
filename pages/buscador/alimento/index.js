import Head from "next/head";
import Link from "next/link";
import styles from '../../../styles/css/buscadorIngrediente.module.css'
import { useState } from "react";
import { formatToUrl, removeAccents } from "../../../utils/strings";
import { fetchExcel } from "../../api/excel";

export default function BuscadorAlimentos({ ingredients }) {

    const [matches, setMatches] = useState([]);

    return (
        <section className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.inputContainer}>
                <h1>¿Qué alimentos son {/* <span className={styles.highlightSuccess}> */}saludables{/* </span> */} o {/* <span className={styles.highlightError}> */}perjudiciales{/* </span> */} para mi perro?</h1>
                <input type="text" className={styles.searchInput} placeholder="¿Mi perro puede comer ..." onKeyUp={(e) => displayMatches(e.target.value)} onChange={(e) => displayMatches(e.target.value)} />
                <div className={styles.suggestions}>
                    {matches.map(el => {
                        return (
                            <Link key={el.id} href={`/buscador/alimento/${el.url}`}><a dangerouslySetInnerHTML={{__html: el.html}} /></Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )

    function findMatches(letters) {
        return ingredients.filter(ingredient => {
            const regex = new RegExp(removeAccents(letters), 'gi');
            if (letters != "") {
                return removeAccents(ingredient.name).match(regex);
            }
            return "";
        })
    }

    function displayMatches(letters) {
        const matchArray = findMatches(letters);
        let i = 0;
        let matches = [];
        matchArray.map(ingredient => {
            if (i < 5) {
                const regex = new RegExp(removeAccents(letters), 'gi');
                const ingrMatched = removeAccents(ingredient.name).replace(regex, `<span style="background-color:#5DFDCB">${letters}</span>`)
                i++;
                matches.push({id: ingredient.id, html: `<p>${ingrMatched}</p>`, url: removeAccents(formatToUrl(ingredient.name)), name: ingredient.name})
            }
        }).join('');
        setMatches(matches)
    }

}

export async function getServerSideProps() {
    let ingredients = await fetchExcel();
    return {
        props: { ingredients }
    }
}