import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReducer } from 'react'

import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AlertContext from './alertContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
      return state = {message: `New anecdote: '${action.content}', created`, class: 'success'}
    case 'VOTE':
      return state = {message: `You voted '${action.content}'`, class: 'success'}
    case 'ERROR':
      return state = {message: `System error: '${action.content}'`, class: 'error'}
    case 'REMOVE': 
      return state = {message: null, class: null}
    default:
      return state
  }
}


const App = () => {
  const [alert, alertDispatch] = useReducer(notificationReducer, {message: null, class: null})
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote, dispatch) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

    dispatch({type: 'VOTE', content: anecdote.content})
    setTimeout(() => {
      dispatch({type: 'REMOVE'})
    }, 5*1000)             
    console.log('vote', anecdote.content)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
 
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  // console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <AlertContext.Provider value={[alert, alertDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification  />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote, alertDispatch)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </AlertContext.Provider>
  )
}

export default App
