import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { createAnecdote } from '../requests'
import AlertContext from '../alertContext'

const AnecdoteForm = () => {
  const [alert, dispatch] = useContext(AlertContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({type: 'NEW', content: newAnecdote.content})
      setTimeout(() => {
        dispatch({type: 'REMOVE'})
      }, 5*1000)               
    },
    onError: (error) => {
      dispatch({type: 'ERROR', content: error.response.data.error})
      setTimeout(() => {
        dispatch({type: 'REMOVE'})
      }, 5*1000)               
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
