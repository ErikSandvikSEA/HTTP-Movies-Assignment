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
     const [movie, setMovie] = useState(initialMovie)
     const { id } = useParams()
     const { push } = useHistory()

     const handleChange = event => {
          event.persist()
          let formValue = event.target.value
          if(event.target.name === 'metascore') {
               formValue = parseInt(formValue, 10)
          }

          setMovie({
               ...movie,
               [event.target.name]: formValue
          })
     }

     const handleSubmit = e => {
          e.preventDefault()
     }

     return (
          <div>
            <h2>Update Movie</h2>
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