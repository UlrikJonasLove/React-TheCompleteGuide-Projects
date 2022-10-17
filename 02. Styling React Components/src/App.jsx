import React, { useState } from 'react';

import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import './App.css';

const App = () => {
  // this state is used to store the course goals
  // the course goals are stored in an array
  const [courseGoals, setCourseGoals] = useState([
    { text: 'Do all exercises!', id: 'g1' },
    { text: 'Finish the course!', id: 'g2' }
  ]);

  // this function is used to add a new course goal
  // the new course goal is added to the start of the array
  // the new course goal is also added to the state
  const addGoalHandler = enteredText => {
    setCourseGoals(prevGoals => {
      // updatedGoals is an array of all the course goals
      // and it contains the previous course goals
      const updatedGoals = [...prevGoals];
      // unshift adds the new course goal to the beginning of the array
      updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedGoals;
    });
  };

  // this function is used to delete a course goal
  // the course goal is deleted from the array
  // the course goal is also deleted from the state
  const deleteItemHandler = goalId => {
    setCourseGoals(prevGoals => {
      // updatedGoals is an array of all the course goals
      // it filters out the course goal with the id of goalId
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
  );

  // this checks if there are any course goals
  // if there are course goals, the content is set to a list of course goals
  if (courseGoals.length > 0) {
    // content is set to a list of course goals
    // but if there are no course goals, the content is set to a message
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div>
      <section id="goal-form">
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id="goals">
        {content}
        {/* {courseGoals.length > 0 && (
          <CourseGoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
      </section>
    </div>
  );
};

export default App;
