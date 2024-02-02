import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createVideogame, getGenres, getPlatforms } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [form, setForm] = useState({
    name: '',
    description: '',
    background_image: '',
    released: '',
    rating: '',
    platform: [],
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    background_image: '',
    released: '',
    rating: '',
    platform: '',
    genres: '',
    descriptionLength: '',
  });

  const [loadingPlatforms, setLoadingPlatforms] = useState(true);

  const [loadingGenres, setLoadingGenres] = useState(true);

  const [isFormEmpty, setIsFormEmpty] = useState(true);



  useEffect(() => {
    dispatch(getPlatforms())
      .then(() => setLoadingPlatforms(false))
      .catch((error) => console.log(error));

    dispatch(getGenres())
      .then(() => setLoadingGenres(false))
      .catch((error) => console.log(error));
  }, []);


  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    validate({
      ...form,
      [event.target.name]: event.target.value,
    });

    const formValues = Object.values(form);
    setIsFormEmpty(formValues.every((value) => value === ''));

  };

  const handleSelectGenres = (event) => {
    const selectedGenres = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setForm({
      ...form,
      genres: selectedGenres,
    });
  };

  const handleSelectPlatforms = (event) => {
    const selectedPlatforms = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setForm({
      ...form,
      platform: selectedPlatforms,
    });
  };

  const handleChangeRating = (event) => {
    const { name, value } = event.target;

    if (value >= 0.0 && value <= 5.0) {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    validate(form);
    if (Object.values(errors).some((error) => error !== '')) {
      return alert('Faltan datos');
    }

    if (isFormEmpty) {
      return alert('El formulario está vacío');
    }

    dispatch(createVideogame(form));
    alert('VG creado!');
    setForm({
      name: '',
      description: '',
      background_image: '',
      released: '',
      rating: '',
      platform: [],
      genres: [],
    });

  };

  const validateDate = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];
    // const selectedDate = new Date(date);

    return date <= currentDate;
  };


  const validate = (form) => {
    let newErrors = {};

    if (form.name.trim() === '') {
      newErrors.name = 'Falta un nombre...';
    } else {
      newErrors.name = '';
    }

    if (form.description.trim() === '') {
      newErrors.description = 'Descripcion min. 5 caracteres max.200 ';
    } else if (form.description.length < 5) {
      newErrors.description = 'Description debe tener min. 5 caracteres';
    } else if (form.description.length > 200) {
      newErrors.description = 'Description debe tener max. 200 caracteres';
    } else {
      newErrors.description = '';
    }

    if (form.released.trim() === '') {
      newErrors.released = 'poner la fecha actual o anterior ';
    } else if (!validateDate(form.released)) {
      newErrors.released = 'La fecha no puede ser en el futuro';
    } else {
      newErrors.released = '';
    }

    if (isNaN(form.rating)) {
      newErrors.rating = 'Rating debe ser un número de 0.0 a 5.0';
    } else {
      newErrors.rating = '';
    }

    if (form.background_image.trim() === '') {
      newErrors.background_image = 'pon tu URL';
    } else {
      newErrors.background_image = '';
    }

    if (form.genres.length === 0) {
      newErrors.genres = 'Selecciona un género o más';
    } else {
      newErrors.genres = '';
    }

    if (form.platform.length === 0) {
      newErrors.platform = 'Selecciona una plataforma o más';
    } else {
      newErrors.platform = '';
    }

    setErrors(newErrors);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.contenido}>
          <div className={style.child}>
            <h3 className={style.titulo}> Create a VideoGame!</h3>

            <div>
              <label>Name:</label>
              <input
                className={style.campos}
                type='text'
                placeholder='Name for your VG'
                value={form.name}
                onChange={handleChange}
                name='name'
                required
                //pattern=".{5,200}"
                //title="La descripción debe tener min.5 caracteres hasta 200 caracteres."

              />
              {errors.name && <span>{errors.name}</span>}
            </div>
            <br></br>

            <div>
              <label>Description:</label>
              <input
                className={style.campos}
                type='text'
                placeholder='About your VG'
                value={form.description}
                onChange={handleChange}
                name='description'
                required
              />
              {errors.description && <span>{errors.description}</span>}
            </div>
            <br></br>

            <div>
              <label>Image:</label>
              <input
                className={style.campos}
                type='text'
                placeholder='Would use a text if non image'
                value={form.background_image}
                onChange={handleChange}
                name='background_image'
                required
              />
              {errors.background_image && <span>{errors.background_image}</span>}
            </div>
            <br></br>

            <div>
              <label>Release:</label>
              <input
                className={style.campos}
                type='date'
                placeholder='Pon una fecha'
                value={form.released}
                onChange={handleChange}
                name='released'
                required
              />
              {errors.released && <span>{errors.released}</span>}
            </div>
            <br></br>

            <div>
              <label>Rating</label>
              <input
                className={style.campos}
                type='number'
                placeholder='min: 0.0, max: 5.0'
                value={form.rating}
                onChange={handleChangeRating}
                name='rating'
                step='0.1'
                required
              />
              {errors.rating && <span>{errors.rating}</span>}
            </div>
            <br></br>


            <div >
              <select
                name='genres'
                multiple
                size="3"
                onChange={handleSelectGenres}
                className={style.campos}

              >
                {loadingGenres ? (
                  <option disabled>Loading Genres...</option>
                ) : (
                  <>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {errors.genres && <span>{errors.genres}</span>}
            </div>
            <br></br>


            <div>
              <select
                name='platform'
                multiple
                size="3"
                onChange={handleSelectPlatforms}
                className={style.campos}
              >
                {loadingPlatforms ? (
                  <option disabled>Loading Platforms...</option>
                ) : (
                  [...new Set(platforms)].map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))
                )}
              </select>
              {errors.platform && <span>{errors.platform}</span>}
            </div>
            <br></br>


            <div>
              <button type='submit' className={style.boton} disabled={isFormEmpty}>
                Create VG
              </button>
            </div>


            <br></br>
            <div>
              <Link to='/home'>
                <button className={style.botonHome}>Home</button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;