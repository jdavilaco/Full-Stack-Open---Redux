import AnecdoteForm from './components/AnecdoteForm'
import AnexdoteList from './components/AnecdoteList'
import Filter from './components/ContentFilter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnexdoteList />
      <h2>Create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App