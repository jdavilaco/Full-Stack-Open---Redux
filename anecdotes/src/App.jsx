import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Filter from './components/ContentFilter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <Anecdotes />
      <h2>Create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App