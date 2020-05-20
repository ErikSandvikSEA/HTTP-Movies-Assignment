import React, { useState, useEffect } from 'react'
import { useParams, useHistory  } from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
     id: '',
     title: '',
     director: '',
     metascore: '',
     stars: [],
}

const UpdateMovie = (props) => {
     const {movieList, setMovieList } = props
     const [movie, setMovie] = useState(initialMovie)
     const { id } = useParams()
     const { push } = useHistory()

     useEffect(() => {
          axios
               .get(`http://localhost:5000/api/movies/${id}`)
               .then(response => {
                    console.log(response)
                    setMovie(response.data)
               })
     }, [id])



     const handleChange = event => {
          event.persist()
          let formValue = event.target.value
          if(event.target.name === 'metascore') {
               formValue = parseInt(formValue, 10)
          }

          if(event.target.name === 'stars') {
               formValue = formValue.split(',')
          }

           setMovie({
                ...movie, 
                [event.target.name]: formValue
          })
     }

     const handleSubmit = e => {
          e.preventDefault()
          //put request
          axios
               .put(`http://localhost:5000/api/movies/${id}`, movie)
               .then(response => {
                    console.log(response.data)
                    //set the response to state
                    const newMovieList = movieList.filter(singleMovie => `${singleMovie.id}` !== response.data.id)
                    setMovieList(newMovieList)
                    setMovie(initialMovie)
                    push(`/`)
               })
     }

     return (
          <div className="save-wrapper">
            <h2>Update {movie.title}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Movie Title"
                value={movie.title}
              />

              <div className="baseline" />

              <input
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={movie.director}
              />

              <div className="baseline" />

              <input
                type="number"
                name="metascore"
                onChange={handleChange}
                placeholder="MetaScore"
                value={movie.metascore}
              />

              <div className="baseline" />

              <input
                type="string"
                name="stars"
                onChange={handleChange}
                placeholder="Starring..."
                value={movie.stars}
              />

              <div className="baseline" />
      
              <button className="md-button form-button">Update</button>
            </form>
          </div>
        );


}

export default UpdateMovie