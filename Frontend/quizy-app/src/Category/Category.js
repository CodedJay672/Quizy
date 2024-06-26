import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import categoryImg from '../assets/images/landing-page.jpg';
import categoryImg1 from '../assets/images/hero-section.jpg';
import categoryImg2 from '../assets/images/log-in.jpg';
import categoryImg3 from '../assets/images/maths.jpg';
import categoryImg4 from '../assets/images/philosophy.jpg';
import categoryImg5 from '../assets/images/science.jpg';



export const Category = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { name } = useParams();
  const [loading, setLoading] = useState(true)
  const catImages = [categoryImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4, categoryImg5];

  useEffect(() => {
    const url = `https://quizy-qasf.onrender.com/api/v1/get_quiz?category=${name}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setQuizzes(data);
      });
  }, [name]);
  // Shuffle the catImages array
  const shuffledCatImages = [...catImages].sort(() => Math.random() - 0.5);

  return (
    <>
      <div className='container'>

        {loading ? <Loading /> : <>
          <div className='text-center fw-bold m-4' style={{ color: "red" }}>
            <h1>Welcome to the {name} Quiz Category</h1>
            <hr />
          </div>
          <div className=' fw-bold m-4'><h2 className='text-muted mt-4 text-center'>Select a quiz and get started</h2></div>
          <div className='row row-cols-3 mt-4 mb-4 d-flex justify-content-center'>
            {quizzes.map((quiz, index) => (

              <Link to={`/quiz/${quiz.id}`} key={quiz.id} className="card m-2" style={{ width: '20rem' }}>
                <img src={shuffledCatImages[index % shuffledCatImages.length]} className="card-img-top" alt="..." />
                <div className='card-body'>
                  <div className='card-title '>{quiz.title}</div>
                  <div className='card-text'>
                    Created on {new Date(quiz.created).toUTCString()}
                  </div>

                </div>

              </Link>
            ))}
          </div>
        </>}

      </div>
    </>
  );
};
