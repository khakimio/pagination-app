import Pagination from './components/Pagination'

function App() {
  return (
    <main className="centered">
      <h1>Pagination</h1>
      <section>
        <h2>Standard</h2>
        <Pagination totalItems={52} itemsPerPage={10} />
      </section>

      <section>
        <h2>Circular</h2>
        <Pagination totalItems={52} itemsPerPage={10} isCircular={true} />
      </section>
    </main>
  )
}

export default App
