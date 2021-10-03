import React from 'react'


const Course = ({course}) => {
    return(
      <div>
        <Header courseName = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </div>
    )  
  }
  
  const Header = (props) => {
    return(
      <div>
        <h1>{props.courseName}</h1>
      </div>
    )
  }
  
  const Total = ({parts}) => {  
    const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
    
    return(
      <div>
        <p><b>Total of exercises {total}</b></p>
      </div>
    )
  } 
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
        <Part key = {part.id} part={part}/>)}
      </div>
    )
  }
  
  const Part = (props) => {
    return(
      <div>
        <p>{props.part.name} {props.part.exercises}</p> 
      </div>
    )
  }

export default Course;