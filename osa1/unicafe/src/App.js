import React, { useState } from 'react'

const Header = () => {
    return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad 
  const average = (props.good - props.bad)/all
  const positive = (props.good / all) * 100

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
          <StatisticLine text="good" value ={props.good} />
          </tr>
          <tr>
          <StatisticLine text="neutral" value ={props.neutral} />
          </tr>
          <tr>
          <StatisticLine text="bad" value = {props.bad} />
          </tr>
          <tr>
          <StatisticLine text="all" value ={all} />
          </tr>
          <tr>
          <StatisticLine text="average" value ={average} />
          </tr>
          <tr>
          <StatisticLine text="positive" value ={positive} percent ='%'/>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <>
    <td>{props.text}</td>
    <td> {props.value} {props.percent}</td>
    </>
  )
}

const History = (props) => {
  if (props.allFeedback.length === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Statistics good ={props.good} neutral ={props.neutral} bad = {props.bad}/>
    </div>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAllFeedback] = useState([])

  const handleGoodClick = () => {
    setAllFeedback(allFeedback.concat('G'))
    setGood(good + 1)
  }

  const handleNeutralClick = () =>{
    setAllFeedback(allFeedback.concat('N'))
    setNeutral(neutral + 1)
  } 

  const handleBadClick = () => {
    setAllFeedback(allFeedback.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <History allFeedback={allFeedback} good ={good} neutral ={neutral} bad = {bad}/>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App;
