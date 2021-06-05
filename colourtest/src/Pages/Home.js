import React from 'react'
import './home.css'
export default function Home({ colors, selectedColors, setSelectedColors, setShowHome }) {
    const changeSelectedColors = e => {
        const copyOfselectedColors = [...selectedColors]
        const index = copyOfselectedColors.findIndex(color => color.colourName === e.target.value)
        copyOfselectedColors[index] = { ...copyOfselectedColors[index], selected: e.target.checked }
        setSelectedColors(copyOfselectedColors)
    }
    return (
        <div>
            <h3>Test your colour distinguishing abilities</h3>
            <div className="colors__select">
                {colors.map(color =>
                    <div key={color.hexValue} className="color">
                        <input type="checkbox" value={color.colourName} onChange={changeSelectedColors} />
                        <label> {color.colourName}</label>
                    </div>
                )}
            </div>
            <button className="submit" onClick={() => setShowHome(false)}>Start Test</button>
        </div>
    )
}
