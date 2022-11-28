import '../styles/App.scss';
import contacts from '../data/contacts.json';
import { useState} from 'react';

function App() {
  // VARIABLES ESTADO
  const [adalabers, setAdalabers] = useState(contacts.results)
  // USEEFFECT ?

  // FUNCIONES HANDLER

//pintar la tabla
const renderAdalaber = () => { 
  return adalabers.map((each)=> (
    <tr key={each.id}>
      <td>{each.name}</td>
      <td>{each.counselor}</td>
      <td>{each.speciality}</td>
      </tr>))
};
  // FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR HTML

  // HTML EN EL RETURN

  return (
    <div className='App'>
      <header><h1>Adalabers</h1></header>  
      <table className="table">
        {/* <!-- Fila de cabecera -->  */}
        <thead><tr>
          <th>Nombre</th>
          <th>Tutora</th>
          <th>Especialidad</th>
        </tr></thead>
        {/* <!-- Fin fila de cabecera --> */}
        <tbody>
          {renderAdalaber()}
        </tbody>
      </table>
      <section>
        <h2>Nueva Adalaber</h2>
        <form> onSubmit={handleSubmit}
          <label htmlfor="name" >Nombre:</label>
          <input type="text" name="name" id="name" onChange={handleInput}/>
          <label htmlfor="counselor">Tutora:</label>
          <input type="text" name="counselor" id="counselor" onChange={handleInput}/>
          <label htmlFor="speciality">Especialidad:</label>
          <input type="text" name="speciality" id="speciality" onChange={handleInput}/>
        </form>
      </section>
    </div>
  )
}  
export default App;
