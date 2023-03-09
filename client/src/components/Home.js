import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Loader from './Loader';
import '../App.css'
import axios from 'axios';


const Home = ({setResult}) => {
    const [headline, setHeadline] = useState("");
    const [snapshot, setSnapshot] = useState(null);
    const [intro, setIntro] = useState("");
    const [problem, setProblem] = useState("");
    const [solution, setSolution] = useState("");
    const [results, setResults] = useState("");
    // const [inspiration, setInspiration] = useState("");
    const [quote, setQuote] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("snapshotImage", snapshot, snapshot.name);
        formData.append("headline", headline);
        formData.append("intro", intro);
        formData.append("problem", problem);
        formData.append("solution", solution);
        formData.append("results", results);
        // formData.append("inspiration", inspiration);
        formData.append("quote", quote);
        axios
            .post("http://localhost:4000/study/create", formData, {})
            .then((res) => {
                if (res.data.message){
                    //UPDATES THE RESULT OBJECT
                    setResult(res.data.data);
                    console.log(res.data.data);
                    navigate("/study")
                }
            })
            .catch((err) => console.log(err.response.data))
            setLoading(true);
    };
    //RENDERS THE LOADING COMPONENT WHEN YOU SUBMIT THE FORM
    if (loading) {
        return <Loader/>;
    }
    return (
    <div className="app flex justify-center items-center flex-col w-full">
        <div className='my-4 text-center'>
            <h1 className='p-2 font-extrabold text-5xl'>Case Study Assustant</h1>
            <p className='font-medium text-base italic'>Generate a CaseStudy with ChatGPT in a few seconds</p>
       </div>
       <form
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
       >
            <div className='grid grid-cols-2 gap-2 w-full'>
            <div className='p-4'>
                <label htmlFor="headline" className='text-base font-semi-bold'>HEADLINE:</label><br/>
                <input
                    type="text"
                    required
                    name="headline"
                    id="headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className='shadow-sm outline outline-2 outline-gray-200 w-full rounded p-2 mt-2'
                />
            </div>
            <div className='p-4'>
                    <label htmlFor="snapshot" className='text-base font-semi-bold'>UPLOAD COMPANY LOGO:</label><br/>
                    <input
                        type="file"
                        required
                        name="photo"
                        placeholder='Company Logo'
                        id="photo"
                        accept="image/x-png,image/jpeg"
                        onChange={(e) => setSnapshot(e.target.files[0])}
                        className='shadow-sm outline outline-2 outline-gray-200 w-full rounded p-2 mt-2'
                    />
            </div>
            </div>
            <div  className=' w-full'>
                <div className='p-4'>
                    <label htmlFor="intro">INTRODUCTION:</label><br/>
                    <input
                        type="text"
                        required
                        name="intro"
                        id="intro"
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        className='shadow-sm outline outline-2 outline-gray-200 w-full rounded p-2 mt-2'
                    />
                </div>
                <div className='p-4'>
                <label htmlFor="problem">PROBLEM:</label><br/>
                    <input
                        type="text"
                        required
                        name="problem"
                        id="problem"
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        className='shadow-sm outline outline-2 outline-gray-200 w-full rounded p-2 mt-2'
                    />
                </div>
                <div className='p-4'>
                    <label htmlFor="solution">PROPOSED SOLUTION:</label><br/>
                    <input
                        type="text"
                        required
                        name="solution"
                        id="solution"
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        className='shadow-sm outline outline-2 outline-gray-200 w-full rounded p-2 mt-2'
                    />
                </div>
                <div className='p-4'>
                    <label htmlFor="results">OUTCOME:</label><br/>
                    <input
                        type="text"
                        required
                        name="results"
                        id="results"
                        value={results}
                        onChange={(e) => setResults(e.target.value)}
                        className='shadow-sm outline outline-2 outline-gray-200 w-full rounded p-2 mt-2'
                    />
                </div>
                {/* <div className='p-4'>
                    <label htmlFor="inspiration">Inspiration:</label><br/>
                    <input
                        type="text"
                        required
                        name="inspiration"
                        id="inspiration"
                        value={inspiration}
                        onChange={(e) => setInspiration(e.target.value)}
                        className='shadow-sm outline outline-2 outline-gray-200 w-full rounded p-2 mt-2'
                    />
                </div> */}
                <div className='p-4'>
                    <label htmlFor="quote">QUOTE:</label><br/>
                    <input
                        type="text"
                        required
                        name="quote"
                        id="quote"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className='shadow-sm outline outline-2 outline-gray-200 w-full rounded p-2 mt-2'
                    />
                </div>
            </div>
            <div>
                    <button className='w-full p-3 rounded-sm text-white font-bold text-xl outline outline-offset-2 outline-blue-400 hover:bg-blue-300 bg-blue-500  my-4'>Create Case Study</button>
                </div>
       </form>
    </div>
  )
}


export default Home