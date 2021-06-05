import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './colourTest.css'
export default function ColourTest({ selectedColors, results, setResults, randomiseArray }) {
    const [colors, setColors] = useState([])
    useEffect(() => {
        const tempColors = selectedColors.filter(color => color.selected)
        randomiseArray(tempColors)
        setColors(tempColors)

        axios("https://ipinfo.io?token=c8dedc79c07efe")
            .then(response => {
                const { ip, country, city, region } = response.data;
                console.log(ip, country, city, region)
            }).catch(err => console.log(err))
    }, [])
    const [showResult, setShowResult] = useState(false)

    const handleSubmit = () => {
        setShowResult(true)
        axios({
            method: 'post',
            url: 'https://37fr3l0ug9.execute-api.ap-southeast-2.amazonaws.com/emailer',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                sender_message: `<pre style="font-family:arial;font-size:12pt;">
                        ${results.map(result => {
                    return `<p>Correct Answer: ${result.colourName} > Your Answer :${result.answer}</p>`
                }).join('')}
                   </pre>`
            }

        }).then(res => {

        }).catch(err => console.log(err.response))

    }
    const handleResults = ({ e, color }) => {
        const index = results.findIndex(result => result.colourName === e.target.value)
        if (index === -1) {
            console.log({ ...color, result: e.target.value === color.colourName });
            setResults([...results, { ...color, result: e.target.value === color.colourName, answer: e.target.value }])
        } else {
            const resultsCopy = [...results];
            console.log({ ...color, result: e.target.value === color.colourName });
            resultsCopy[index] = { ...color, result: e.target.value === color.colourName, answer: e.target.value }
            setResults([...resultsCopy])
        }
    }
    return (
        <div className="choices_main">
            {!showResult &&
                <div>
                    {colors.map((color, index) => <div key={`${color.colourName}-${index}`} className="choices">
                        <div style={{ width: '100px', height: '30px', backgroundColor: `${color.hexValue}` }}></div>
                        <select onChange={e => handleResults({ color, e })}>
                            <option value=""></option>
                            {color.choices.map((choice, index) => <option key={`${choice}-${index + 100}`}> {choice}</option>)}
                        </select>
                    </div>)
                    }
                    <button className="submit" onClick={handleSubmit}>Submit Answers</button>
                </div>}
            {showResult &&
                <div className="results">
                    <h2>Results</h2>
                    {`${results.filter(result => result.result).length} / ${colors.length}`}
                </div>}
        </div >
    )
}
