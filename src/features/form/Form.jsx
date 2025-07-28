import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../components/button/Button'
import './Form.css';

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    Pclass: '3',
    Age: '',
    Fare: '',
    Cabin_Assigned: '0',
    Name_Size: '',
    TicketNumberCounts: '1', // Valor fijo
    Sex: 'male',
    Embarked: 'S',
    Title: 'Mr',
    TicketLocation: 'Blank',
    Family_Size_Grouped: 'Alone',
    Age_Cut: '0',
    Fare_cut: '0',
    Name_LengthGB: '(11.999, 18.0]',
  });

  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función auxiliar para obtener el texto descriptivo del título
  const getTitleDisplayText = (option) => {
    const titleMap = {
      'Dr': 'Doctor/a',
      'Master': 'Master (niño de familia distinguida)',
      'Mr': 'Señor',
      'married_women': 'Señora (mujer casada)',
      'military': 'Militar (Capitán, Mayor, Coronel)',
      'nobility': 'Nobleza (Sir, Lady, Conde, etc.)',
      'religious': 'Religioso (Reverendo)',
      'unmarried_women': 'Señorita (mujer soltera)'
    };
    return titleMap[option] || option;
  };

  // Función auxiliar para obtener el ícono del título
  const getTitleIcon = (option) => {
    const iconMap = {
      'Dr': '🩺',
      'Master': '👦',
      'Mr': '👨',
      'married_women': '👩‍💼',
      'military': '🎖️',
      'nobility': '👑',
      'religious': '⛪',
      'unmarried_women': '👩'
    };
    return iconMap[option] || '👤';
  };

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://titanicbackendss.onrender.com/categories');// antes era const response = await axios.get('/api/categories');
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar las categorías. Usando valores predeterminados.');
        console.error('Error al cargar categorías:', err);
        setCategories({
          Pclass: ['1', '2', '3'],
          Sex: ['male', 'female'],
          Embarked: ['C', 'Q', 'S'],
          Title: ['Dr', 'Master', 'Mr', 'married_women', 'military', 'nobility', 'religious', 'unmarried_women'], TicketLocation: ['A/4', 'A/5', 'CA', 'PC', 'SOTON/OQ', 'SC/Paris', 'W/C', 'Blank', 'C', 'F.C.', 'F.C.C.', 'Fa', 'P/PP', 'PP', 'S.C./A.4.', 'S.O./P.P.', 'S.O.C.', 'S.O.P.', 'S.P.', 'SC', 'SC/AH', 'SO/C', 'STON/O', 'STON/O2.', 'SW/PP', 'W.E.P.', 'WE/P', 'A4.', 'A/S', 'C.A./SOTON'],
          Family_Size_Grouped: ['Alone', 'Small', 'Medium', 'Large'],
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);


  // Manejar cambios en el formulario
  const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'Age') {
    // Mapear el rango seleccionado a un valor representativo
    const ageMap = {
      '0': '16',
      '1': '18.0625',
      '2': '22.0625',
      '3': '26',
      '4': '30.156',
      '5': '35.156',
      '6': '42.5',
      '7': '63.5',
      '8': '85'
    };
    setFormData({ ...formData, Age: ageMap[value], Age_Cut: value });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};
  // Calcular campos derivados
  const calculateDerivedFields = (data) => {
    const newData = { ...data };

    // Age_Cut
    const age = parseFloat(data.Age);
    if (isNaN(age)) newData.Age_Cut = '0';
    else if (age <= 16) newData.Age_Cut = '0';
    else if (age <= 20.125) newData.Age_Cut = '1';
    else if (age <= 24) newData.Age_Cut = '2';
    else if (age <= 28) newData.Age_Cut = '3';
    else if (age <= 32.312) newData.Age_Cut = '4';
    else if (age <= 38) newData.Age_Cut = '5';
    else if (age <= 47) newData.Age_Cut = '6';
    else if (age <= 80) newData.Age_Cut = '7';
    else newData.Age_Cut = '8';

    // Fare_cut
    const fare = parseFloat(data.Fare);
    if (isNaN(fare)) newData.Fare_cut = '0';
    else if (fare <= 7.775) newData.Fare_cut = '0';
    else if (fare <= 8.662) newData.Fare_cut = '1';
    else if (fare <= 14.454) newData.Fare_cut = '2';
    else if (fare <= 26) newData.Fare_cut = '3';
    else if (fare <= 52.369) newData.Fare_cut = '4';
    else if (fare <= 512.329) newData.Fare_cut = '5';
    else newData.Fare_cut = '6';

    // Name_LengthGB
    const nameLength = data.name ? data.name.length : 0;
    if (nameLength <= 18) newData.Name_LengthGB = '(11.999, 18.0]';
    else if (nameLength <= 20) newData.Name_LengthGB = '(18.0, 20.0]';
    else if (nameLength <= 23) newData.Name_LengthGB = '(20.0, 23.0]';
    else if (nameLength <= 25) newData.Name_LengthGB = '(23.0, 25.0]';
    else if (nameLength <= 27.25) newData.Name_LengthGB = '(25.0, 27.25]';
    else if (nameLength <= 30) newData.Name_LengthGB = '(27.25, 30.0]';
    else if (nameLength <= 38) newData.Name_LengthGB = '(30.0, 38.0]';
    else newData.Name_LengthGB = '(38.0, 82.0]';

    // Name_Size
    newData.Name_Size = nameLength > 0 ? Math.ceil(nameLength / 10).toString() : '0';

    // TicketNumberCounts fijo
    newData.TicketNumberCounts = '1';

    return newData;
  };


  // Enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const processedData = calculateDerivedFields(formData);
      await onSubmit(processedData);
    } catch (err) {
      setError('Error al procesar los datos');
      console.error('Error al procesar datos:', err);
    }
  };

  if (isLoading) {
    return <div className="form-container">Cargando categorías...</div>;
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>¿Sobrevivirías al Titanic?</h2>
      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">📝</span>Nombre
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej. Kelly, Mr. James"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">🏛️</span>
          Clase
        </label>
        <select name="Pclass" value={formData.Pclass} onChange={handleChange} className="form-select">
          {categories.Pclass?.map((option) => (
            <option key={option} value={option}>
              {option === '1' ? 'Primera clase' : option === '2' ? 'Segunda clase' : 'Tercera clase'}
            </option>
          )) || [
              <option key="1" value="1">Primera clase</option>,
              <option key="2" value="2">Segunda clase</option>,
              <option key="3" value="3">Tercera clase</option>,
            ]}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">🎂</span>
          Rango de Edad
        </label>
        <select name="Age" value={formData.Age_Cut} onChange={handleChange} className="form-select" required>
          <option value="" disabled>Selecciona un rango de edad</option>
          <option value="0">Menor o igual a 16 años</option>
          <option value="1">16 a 20 años</option>
          <option value="2">20 a 24 años</option>
          <option value="3">24 a 28 años</option>
          <option value="4">28 a 32 años</option>
          <option value="5">32 a 38 años</option>
          <option value="6">38 a 47 años</option>
          <option value="7">47 a 80 años</option>
          <option value="8">Mayor a 80 años</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">💵</span>
          Tarifa:
        </label>
        <select name="Fare" value={formData.Fare} onChange={handleChange} className="form-select" required>
          <option value="" disabled>Selecciona una tarifa</option>
          <option value="7.0">Baja (hasta £7.77)</option>
          <option value="8.0">Media-Baja (£7.77 - £8.66)</option>
          <option value="12.0">Media (£8.66 - £14)</option>
          <option value="20.0">Media-Alta (£14 - £26)</option>
          <option value="40.0">Alta (£26 - £52)</option>
          <option value="100.0">Muy Alta (£52 - £512)</option>
          <option value="custom">Personalizada</option>
        </select>
        {formData.Fare === "custom" && (
          <input
            type="number"
            name="Fare"
            value={formData.FareCustom || ""}
            onChange={(e) => setFormData({ ...formData, FareCustom: e.target.value, Fare: e.target.value })}
            min="0"
            step="0.01"
            placeholder="Ingresa tu tarifa"
            className="form-input"
            required
          />
        )}
        <div className="help-container">
          <input type="checkbox" id="fare-help-toggle" className="help-toggle" />
          <label htmlFor="fare-help-toggle" className="help-icon">💡</label>
          <div className="help-content">
            <p className="help-text">
              Las tarifas más altas en el Titanic (en libras de 1912) estaban asociadas con mayores tasas de supervivencia, reflejando acceso a mejores cubiertas. Ajustá por inflación para valores modernos (~£1 en 1912 ≈ £100 hoy).
            </p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">🛏️</span>
          Cabina asignada:
        </label>
        <select name="Cabin_Assigned" value={formData.Cabin_Assigned} onChange={handleChange} className="form-select">
          <option value="0">Ninguna</option>
          <option value="1">A</option>
          <option value="1">B</option>
          <option value="1">C</option>
          <option value="1">D</option>
          <option value="1">E</option>
          <option value="1">F</option>
          <option value="1">G</option>
        </select>
        <div className="help-container">
          <input type="checkbox" id="cabin-help-toggle" className="help-toggle" />
          <label htmlFor="cabin-help-toggle" className="help-icon">💡</label>
          <div className="help-content">
            <p className="help-text">
              Seleccioná la cubierta de tu cabina (A-G) según su ubicación en el barco. "Ninguna" indica que no tenías cabina asignada o que no quieres elegir.
            </p>
            <img
              src="/Titanic_cutaway_diagram.png"
              alt="Diagrama de cubiertas del Titanic"
              className="help-image"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">🚻</span>
          Sexo
        </label>
        <select name="Sex" value={formData.Sex} onChange={handleChange} className="form-select">
          {categories.Sex?.map((option) => (
            <option key={option} value={option}>
              {option === 'male' ? 'Hombre' : 'Mujer'}
            </option>
          )) || [
              <option key="male" value="male">Hombre</option>,
              <option key="female" value="female">Mujer</option>,
            ]}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">🛳️</span>
          Puerto de embarque:
        </label>
        <select name="Embarked" value={formData.Embarked} onChange={handleChange} className="form-select">
          {categories.Embarked?.map((option) => (
            <option key={option} value={option}>
              {option === 'C' ? 'Cherburgo' : option === 'Q' ? 'Queenstown' : 'Southampton'}
            </option>
          )) || [
              <option key="C" value="C">Cherburgo</option>,
              <option key="Q" value="Q">Queenstown</option>,
              <option key="S" value="S">Southampton</option>,
            ]}
        </select>
        <div className="help-container">
          <input type="checkbox" id="embarked-help-toggle" className="help-toggle" />
          <label htmlFor="embarked-help-toggle" className="help-icon">💡</label>
          <div className="help-content">
            <p className="help-text">
              ¿Sabías que tus chances de supervivencia variaban según el puerto de embarque? Los pasajeros de Cherburgo (Francia) tenían diferentes probabilidades en comparación con los de Queenstown (Irlanda) o Southampton (Inglaterra).
            </p>
            <img
              src="/map.png"
              alt="Mapa de puertos de embarque del Titanic"
              className="help-image"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">🎭</span>
          Título Social
        </label>

        <select
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          className="form-select"
        >
          {categories.Title?.map((option) => (
            <option key={option} value={option}>
              {getTitleIcon(option)} {getTitleDisplayText(option)}
            </option>
          )) || [
              <option key="Dr" value="Dr">🩺 Doctor/a</option>,
              <option key="Master" value="Master">👦 Master (niño de familia distinguida)</option>,
              <option key="Mr" value="Mr">👨 Señor</option>,
              <option key="married_women" value="married_women">👩‍💼 Señora (mujer casada)</option>,
              <option key="military" value="military">🎖️ Militar (Capitán, Mayor, Coronel)</option>,
              <option key="nobility" value="nobility">👑 Nobleza (Sir, Lady, Conde, etc.)</option>,
              <option key="religious" value="religious">⛪ Religioso (Reverendo)</option>,
              <option key="unmarried_women" value="unmarried_women">👩 Señorita (mujer soltera)</option>
            ]}
        </select>

        <div className="help-container">
          <input type="checkbox" id="title-help-toggle" className="help-toggle" />
          <label htmlFor="title-help-toggle" className="help-icon">💡</label>
          <div className="help-content">
            <p className="help-text">
              <strong>¿Qué título te representa mejor?</strong><br />
              En el Titanic, tu título social era importante y podía influir en tu supervivencia.
              Elegí el que mejor se adapte a tu situación:
            </p>
            <ul className="help-list">
              <li><strong>Doctor/a:</strong> Médico o profesional con doctorado</li>
              <li><strong>Master:</strong> Niño de familia distinguida (menores de clase alta)</li>
              <li><strong>Señor:</strong> Hombre adulto común</li>
              <li><strong>Señora:</strong> Mujer casada</li>
              <li><strong>Militar:</strong> Oficiales del ejército o marina (Capitán, Mayor, Coronel)</li>
              <li><strong>Nobleza:</strong> Títulos aristocráticos (Sir, Lady, etc.)</li>
              <li><strong>Religioso:</strong> Clérigos y ministros</li>
              <li><strong>Señorita:</strong> Mujer soltera</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">🎫</span>
          Ubicación del ticket:
        </label>
        <select name="TicketLocation" value={formData.TicketLocation} onChange={handleChange} className="form-select">
          {categories.TicketLocation?.map((option) => (
            <option key={option} value={option}>
              {option === 'Blank' ? 'Ninguna' : option}
            </option>
          )) || [
              <option key="Blank" value="Blank">Ninguna</option>
            ]}
        </select>
        <div className="help-container">
          <input type="checkbox" id="ticket-help-toggle" className="help-toggle" />
          <label htmlFor="ticket-help-toggle" className="help-icon">💡</label>
          <div className="help-content">
            <p className="help-text">
              La ubicación del ticket indica el prefijo o tipo de boleto. "Ninguna" se usa para boletos sin prefijo específico.
            </p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">👨‍👩‍👧‍👦</span>
          Tamaño de la familia con la que viajas
        </label>
        <select name="Family_Size_Grouped" value={formData.Family_Size_Grouped} onChange={handleChange} className="form-select">
          {categories.Family_Size_Grouped?.map((option) => (
            <option key={option} value={option}>
              {option === 'Alone' ? 'Solo (1 persona)' :
                option === 'Small' ? 'Pequeña (2-4 personas)' :
                  option === 'Medium' ? 'Mediana (5-6 personas)' :
                    'Grande (7 o más personas)'}
            </option>
          )) || [
              <option key="Alone" value="Alone">Solo (1 persona)</option>,
              <option key="Small" value="Small">Pequeña (2-4 personas)</option>,
              <option key="Medium" value="Medium">Mediana (5-6 personas)</option>,
              <option key="Large" value="Large">Grande (7 o más personas)</option>,
            ]}
        </select>
      </div>

      <Button type="submit">Predecir</Button>
    </form>
  );
}

export default Form;