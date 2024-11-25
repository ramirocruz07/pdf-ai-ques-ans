    import React, { useState } from 'react';

    import axios from "axios";

    const Homepage = () => {

        const [text,settext]=useState("");
        const [response,setResponse]=useState("query your question ")
        const getAnswer =async()=>{
            console.log("in handle")
            try {
                const lol = await axios.post("http://localhost:3000/api/pdf/query", {
                    question:text 
                    // Use 'params' to send query parameters
                });
                console.log(lol)
                console.log(lol.data)
                setResponse(lol.data.result); // Assuming setResponse is a function to update state
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
        return (
            <div className="border flex flex-col border-white w-4/6 h-4/6 p-2">
                {console.log(text)}
                <header className="text-white flex text-center items-center justify-center h-5/6 p-3">
                    {response}
                </header>
                <div className="flex flex-col justify-center h-8 pt-5 pb-1">
                    <div className="flex flex-row justify-center pl-1 pr-1">
                        <input
                            type="text"
                            className="w-5/6 h-8 px-2 rounded-lg bg-transparent border border-white text-white text-xs placeholder-white"
                            placeholder="Type something..."
                            aria-label="Input field"
                            onChange={(e)=>settext(e.target.value)}
                        />
                        <div className='pl-2'>
                        <button
                            className="h-8 px-2 bg-transparent  border border-white rounded  flex items-center justify-center"
                            aria-label="Submit"
                            onClick={getAnswer}
                        >   
                            <span className="text-white">Submit</span>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Homepage;