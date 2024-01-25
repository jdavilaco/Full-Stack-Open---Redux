import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotesList = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  
  const vote =  (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification({message: `You voted '${anecdote.content}'`, class: 'success'}))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)         
  }

  return(
    <div>
      {[...anecdotesList].sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes