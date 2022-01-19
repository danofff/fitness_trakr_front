import React, { useState, useCallback } from "react";

export const DataContext = React.createContext({
  routines: [],
  activities: [],
  setRoutines: (routines) => {},
  setActivities: (activities) => {},
  addRoutine: (routine) => {},
});

const DataContextProvider = (props) => {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);

  const setRoutinesHandler = useCallback((routines) => {
    setRoutines(routines);
  }, []);

  const setActivitiesHandler = useCallback((activities) => {
    setActivities(activities);
  }, []);

  const addRoutineHandler = (routine) => {
    setRoutines((prevState) => {
      return [...prevState, routine];
    });
  };

  return (
    <DataContext.Provider
      value={{
        routines,
        activities,
        setRoutinesHandler,
        setActivitiesHandler,
        addRoutineHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
