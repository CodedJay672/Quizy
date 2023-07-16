import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import CategoryOption from '../components/CategoryOption';
import { UserContext } from '../App/App';
import login from '../assets/logins.jpg';
import { Link } from "react-router-dom";

const CreateQuiz = () => {
  const token = localStorage.getItem("QuizyUser");
  const [title, settitle] = useState("");
  const [category, setCategory] = useState();
  const [quizId, setQuizid] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const submitQuiz = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const quizForm = { "title": title, "category": [JSON.parse(category)], "questions": questions }



    fetch("http://localhost:8000/api/v1/quiz", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${JSON.parse(token).access}`,
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NTI0MDc0LCJpYXQiOjE2ODk0Mzc2NzQsImp0aSI6IjE2Y2ZiZjUzMjA2MjQ2MTU4ZjA3OGQzOWU4OGY4NmRkIiwidXNlcl9pZCI6MSwiZmlyc3RfbmFtZSI6InN0cmluZyIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoic3RyaW5nIn0.yuEX3XI6_Vl6LG7wSbzgCtMl6jctYoI1wBcoHUpssL8`,
      },
      body: JSON.stringify(quizForm)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res)
        }
        return res.json()
      })
      .then(result => {
        setIsLoading(false)
        toast.success("Login Successful", {
          position: "top-right"
        })
        // console.log(result)
        setQuizid(result.id)
      })
      .catch(() => {
        setIsLoading(false)
        // console.log(category)
        // console.log(questions)
        toast.error("Invalid Credentials", {
          position: "top-right"
        })
      });

  }

  // function handleDropdownChange(selectedValue) {
  //   setCategory(selectedValue);
  // };

  return (
    <>
      <Helmet>
        <title>Quizy - Create quiz</title>
      </Helmet>
      <div className="row">
        <div className='col-md-6'>
          <img src={login} width='100%' height='100%' alt='img' />
        </div>
        <div className='col-md-6'>

          <div className='text-center justify-content-center p-5'>
            <h2>Create Your Quiz</h2>
            <form onSubmit={submitQuiz}>
              <div className="form-outline mb-4">
                <input
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                  type="title" required className="form-control" placeholder='Quiz title' />
              </div>

              <div className="form-outline mb-4">
                <CategoryOption selectedcategory={category} setCategory={setCategory} />
              </div>

              {quizId && <div className='form-outline mb-4'>
                <Link to={`/create-question/${quizId}`} className="btn btn-primary btn-info mb-4" >
                  Create Questions
                </Link>
              </div>}
              <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
            </form>
          </div>


        </div>
      </div>
    </>
  )
};

export default CreateQuiz;