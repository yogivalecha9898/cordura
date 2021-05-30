import { useEffect, useState } from 'react'
import { req as suggestArray } from './suggest'

function Suggest() {

    const[arr, setArr] = useState([])
    const[spArr, setSArr] = useState([])

    useEffect(() => {
        const length = suggestArray.length
        let arrNow = []
        let sarrNow = []
        for(let i = 0; i < 5; i++) {
            const random = Math.floor(Math.random()*length)
            const rem = (random+i)%length
            arrNow.push(suggestArray[rem])
            if(i < 2) { 
                sarrNow.push(suggestArray[(random+i+3)%length])
            }   
        }
        setArr(arrNow)
        setSArr(sarrNow)
    }, [])

    const rand = ()=> {
        return Math.floor(Math.random()*suggestArray.length)
    }

    return (
        <div>
            <h1>Some suggestions</h1>
            {arr.map(el => {
                return <div>{el}</div>
            })}
            <br />
            <br />
            <h1>Today's Special Suggestions</h1>
            {spArr.map(el => {
                return <div>{el}</div>
            })}
        </div>
    )
}

export default Suggest