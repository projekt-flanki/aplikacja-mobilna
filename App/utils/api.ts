import apisauce from 'apisauce'
import  {LoginPayload, RegisterPayload, NewEventPayload, UserInfoPayload, EditEventPayload, AssignEventPayload, TeamWinPayload} from '../typings'

const baseURL = "http://34.240.172.124:8080/"

const create = () => {
  const THIRTY_SECONDS_TIMEOUT = 30000

  const api = apisauce.create({
    baseURL,
    headers: { 'Cache-Control': 'no-cache' },
    timeout: THIRTY_SECONDS_TIMEOUT,
  })

  const setAuthorizationHeader = (token: string) => api.setHeader('Authorization', `Bearer ${token}`)

  // unprotected
  const login = (loginPayload: LoginPayload) => api.post(`login`, loginPayload)
  const register = (registerPayload: RegisterPayload) => api.post(`register`, registerPayload)

  //protected
  const getUserInfo = () => api.get('user/info')
  const addEvent = (addEventPayload: NewEventPayload) => api.post(`event/create`,addEventPayload)
  const getMyEvents = () => api.get('/event/owned')
  const getAllEvents = () => api.get('/event/all')
  const editEvent = (editEventPayload:EditEventPayload) => api.put('/event/edit',editEventPayload)
  const editUser = (userInfoPayload: UserInfoPayload) => api.post('/user/edit', userInfoPayload);
  const assignEvent = (assignEventPayload: AssignEventPayload) => api.post('/event/join', assignEventPayload);
  const quitEvent = (assignEventPayload: AssignEventPayload) => api.post('/event/unsubscribe', assignEventPayload);
  const teamWin = (teamWinPayload: TeamWinPayload) => api.post('/event/finalize', teamWinPayload)
  const getUserRanking = () => api.get('/user/rating-rank');
  const getUserPoints = () => api.get('/user/points-rank');
  const getEventDetails = (eventId: string) => api.get(`/event/${eventId}`)


  const logout = () => delete api.headers['Authorization']

  return {
    login,
    logout,
    register,
    addEvent,
    setAuthorizationHeader,
    getUserInfo,
    getMyEvents,
    getAllEvents,
    editUser,
    editEvent,
    assignEvent,
    teamWin,
    getUserRanking,
    getUserPoints,
    getEventDetails,
    quitEvent
  }
}

const api = () => create()

export default api()
