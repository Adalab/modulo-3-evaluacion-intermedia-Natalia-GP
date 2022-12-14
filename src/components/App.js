import '../styles/App.scss';
import contacts from '../data/contacts.json';
import { useState, useEffect } from 'react';
import ls from '../services/localstorage';
import { fetchAdalabers } from '../services/api';

function App() {
  // VARIABLES ESTADO
  const randomID = () => {
    return crypto.randomUUID();
  };

  const [adalabers, setAdalabers] = useState(contacts.results);
  const [newAdalaber, setNewAdalaber] = useState({
    name: '',
    counselor: '',
    speciality: '',
    id: randomID(),
  });
  const [search, setSearch] = useState(ls.get('search', ''));
  const [searchCounselor, setSearchCounselor] = useState(''); //variable estado para filtrar-buscar metiendola en localstorage
  // USEEFFECT Llamo a la APi
  useEffect(() => {
    fetchAdalabers().then((data) => {
      setAdalabers(data.results);
    });
  }, []);
  // FUNCIONES HANDLER

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };
  // función manejadora para filtrar
  const handleSearchName = (ev) => {
    ls.set('search', ev.target.value);
    setSearch(ev.target.value);
  };
  const handleSearchCounselor = (ev) => {
    setSearchCounselor(ev.target.value);
  };

  const handleInput = (ev) => {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;
    setNewAdalaber({ ...newAdalaber, [inputName]: inputValue });
  };
  //pintar la tabla
  //añadir el new contact al array objeto "btn"
  const handleAdd = () => {
    setAdalabers([...adalabers, newAdalaber]);
    setNewAdalaber({
      name: '',
      counselor: '',
      speciality: '',
      id: randomID(),
    });
  };
  const renderAdalaber = () => {
    return adalabers
      .filter((each) => each.name.toLowerCase().includes(search.toLowerCase()))
      .filter((each) => each.counselor.toLowerCase().includes(searchCounselor))
      .map((each) => (
        <tr key={each.id}>
          <td>{each.name}</td>
          <td>{each.counselor}</td>
          <td>{each.speciality}</td>
        </tr>
      ));
  };
  // FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR HTML

  // HTML EN EL RETURN

  return (
    <div className="App">
      <header>
        <h1>Adalabers</h1>
        <h2>Buscador de Adalabers</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchName">Nombre:</label>
          <input
            type="text"
            name="searchName"
            value={search}
            onChange={handleSearchName}
          />
          <label htmlFor="searchCounselor">
            Tutora:
            <select
              name="searchCounselor"
              id="searchCounselor"
              value={searchCounselor}
              onChange={handleSearchCounselor}
            >
              <option value="">Escoge una opción</option>
              <option value="yanelis">Yanelis</option>
              <option value="dayana">Dayana</option>
              <option value="iván">Iván</option>
            </select>
          </label>
        </form>
      </header>
      <table className="table">
        {/* <!-- Fila de cabecera -->  */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        {/* <!-- Fin fila de cabecera --> */}
        <tbody>{renderAdalaber()}</tbody>
      </table>
      <section>
        <h2>Nueva Adalaber</h2>
        <form onSubmit={handleSubmit}>
          <label htmlfor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newAdalaber.name}
            onChange={handleInput}
          />
          <label htmlfor="counselor">Tutora:</label>
          <input
            type="text"
            name="counselor"
            id="counselor"
            value={newAdalaber.counselor}
            onChange={handleInput}
          />
          <label htmlFor="speciality">Especialidad:</label>
          <input
            type="text"
            name="speciality"
            id="speciality"
            value={newAdalaber.speciality}
            onChange={handleInput}
          />
          <button onClick={handleAdd}>Añadir</button>
        </form>
      </section>
    </div>
  );
}
export default App;
