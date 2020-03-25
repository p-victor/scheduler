export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;
  return { appointments: [], ...days.find(({ name }) => name === day) }.appointments.map(id => appointments[id]);
}
export const getInterview = ({ interviewers }, interview) => {
  return interview && { ...interview, interviewer: interviewers[interview.interviewer] };
}
export const getInterviewersForDay = (state, day) => {
  const { days, interviewers } = state;
  return { interviewers: [], ...days.find(({ name }) => name === day) }.interviewers.map(id => interviewers[id]);
}
