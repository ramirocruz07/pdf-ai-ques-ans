import { useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
import Homepage from "./homepage";


const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files[0])
  };
  const handleUpload = () => {

    const formData = new FormData();
    formData.append("files", files); // Append the single file
    console.log(formData)// Logs the uploaded file
    // Fetch logic can go here
  };

 
  
  // send files to the server // learn from my other video
  // const handleUpload = () => {
  //   const formData = new FormData();
  //   formData.append("Files", files);
  //   console.log(formData.getAll())
  //   // fetch(
  //   //   "link", {
  //   //     method: "POST",
  //   //     body: formData
  //   //   }  
  //   // )
  ;

  if (files) return (
   <Homepage></Homepage>
  )

  return (
    <div className=" w-4/6 border p-3 backdrop-blur-none hover:backdrop-blur-md">
        <div 
            className='  text-slate-200  '  
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
          <h1 className="flex justify-center text-white ">Drag and Drop Files to Upload</h1>
          <h1 className="flex justify-center text-white">Or</h1>
          <input className=""
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}  
            hidden
            accept="image/png, image/jpeg,application/pdf"
            ref={inputRef}
          />
          <div  className=" flex justify-center h-5">
          <button className="border border-white text-white rounded-lg  text-xs w-24" onClick={() => inputRef.current.click()}>Select File</button>
         
      </div>
          </div>
          {files && (
            <div className="flex justify-center pt-1">

<button onClick={handleUpload} className=" flex justify-center bg-blue-500  border border-white text-white rounded-lg text-xs w-24  ">
  Submit
</button>
</div>

)}
        </div>
  
  );
};

export default DragDropFiles;
// import { useState, useRef } from "react";
// import { Button } from "@material-tailwind/react";

// const DragDropFiles = () => {
//   const [files, setFiles] = useState([]);
//   const inputRef = useRef();

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'copy'; // Indicate the drop effect
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const droppedFiles = Array.from(event.dataTransfer.files);
//     setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     files.forEach(file => formData.append("Files", file));

//     // Uncomment and replace 'link' with your server URL
//     // fetch("link", {
//     //   method: "POST",
//     //   body: formData,
//     // })
//     // .then(response => response.json())
//     // .then(data => {
//     //   console.log(data);
//     //   setFiles([]); // Clear files after upload
//     // })
//     // .catch(error => console.error('Error:', error));
//   };

//   return (
//     <div className="w-full border p-2 border-black">
//       {files.length > 0 ? (
//         <div>
//           <ul>
//             {files.map((file, idx) => (
//               <li key={idx}>{file.name}</li>
//             ))}
//           </ul>
//           <div className="">
//             <button className="" onClick={() => setFiles([])}>Cancel</button>
//             <button onClick={handleUpload}>Upload</button>
//           </div>
//         </div>
//       ) : (
//         <div 
//           className='border p-2 border-black'
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <h1 className="flex justify-center bg-gradient-to-r from-slate-50 to-zinc-900 bg-clip-text">Drag and Drop Files to Upload</h1>
//           <h1 className="flex justify-center">Or</h1>
//           <input 
//             multiple
//             onChange={(event) => setFiles(Array.from(event.target.files))}
//             hidden
//             accept="image/png, image/jpeg"
//             ref={inputRef}
//           />
//           <div className="flex justify-center h-5">
//             <Button variant="gradient" className="flex items-center gap-3 h-2" onClick={() => inputRef.current.click()}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 className="h-5 w-5"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
//                 />
//               </svg>
//               Upload Files
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DragDropFiles;