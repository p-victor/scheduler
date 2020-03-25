import { useState, useEffect } from "react";
import axios from 'axios';

export const useApplicationData = () => {

  axios.defaults.baseURL = "http://localhost:8001";

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({ ...state, appointments })
      })
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(data => {
        console.log(data)
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({ ...state, appointments })
      })
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then(([{ data: days }, { data: appointments }, { data: interviewers }]) => {
        setState(previousState => ({ ...previousState, days, appointments, interviewers }));
      })
      .catch(e => console.log(e));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}