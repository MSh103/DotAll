import {useEffect, useRef, useState} from 'react';

import Body from './components/Body'
import File from './components/File';
import { convertToPNG } from './conversion/image';

function App() {

        const [files, setFiles] = useState([]);
        const [isDragging, setIsDragging] = useState(false);
        const [error, setError] = useState(null);
        const [qualityValue, setQualityValue] = useState(0.9);
        const [convertedImage, setConvertedImage] = useState(null);
        const fileInput = useRef(null);

        const canConvert = files.length > 0;

        const deleteFileHandle = (file) => {
                setFiles(prevFiles => prevFiles.filter(f => f !== file));
        };

        const handleFileClick = (e) => {
                if(e.button === 0)
                        fileInput.current.click();
        };

        const handleDragOver = (e) => {
                e.preventDefault();
                setIsDragging(true);
        };

        const handleDragLeave = (e) => {
                e.preventDefault();
                setIsDragging(false);        
        };


        const validateFile = (file) => {
                if(file.type !== "image/png") {
                        return `${file.name} is not a .png!`;
                }

                return null;
        };

        const handleDrop = (e) => {
                e.preventDefault();
                setIsDragging(false);

                const droppedFiles = Array.from(e.dataTransfer.files);
                const validFiles = [];

                for(const file of droppedFiles) {
                        if(!file) continue;

                        const validationError = validateFile(file);

                        if(validationError) {
                                console.error("VALIDATION ERROR: " + validationError);
                                setError(prevError => prevError ? 
                                        prevError + "\n" + validationError : validationError
                                );
                                continue;
                        }

                        console.log(file);
                        validFiles.push(file);
                }

                
                if(validFiles.length > 0) {
                        setFiles(prevFiles => [...prevFiles, ...validFiles]);
                }
        }

        const handleFileInput = (e) => {
                const selectedFiles = Array.from(e.target.files);
                const validFiles = [];

                for(const file of selectedFiles) {
                        if(!file) continue;                        

                        console.log(file);
                        validFiles.push(file);
                }
                
                if(validFiles.length > 0) {
                        setFiles(prevFiles => [...prevFiles, ...validFiles]);
                }

                e.target.value = "";
        };

        useEffect(() => {
                if(!error) return;

                setTimeout(() => {
                        setError(null);
                }, 2500);

        }, [error]);

        const handleConversionProcess = async (e) => {
                if(e.button !== 0) return;

                try {
                        const result = await convertToPNG(files[0], qualityValue);

                        const url = URL.createObjectURL(result);

                        setConvertedImage(url);

                        console.log("Conversion successful: " + url);
                } catch (error) {
                        console.error("An error occurred: " + error);
                        setError(error.message);
                }
        }

        useEffect(() => {
                return () => {
                        if(convertedImage) 
                                URL.revokeObjectURL(convertedImage);
                }
        }, [convertedImage]);

        return (
                <Body>
                        <h1 className='text-left font-bold text-xl'>Convert PNG &rarr; JPG/JPEG</h1>
                        <p className='mt-2 text-sm'>Convert a .png file to a .jpg file.</p>
                        <hr className='my-4'/>

                        <div
                                onClick={handleFileClick}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}

                                className={`                                
                                        block w-full
                                        text-center
                                        py-8 h-30
                                        rounded-lg border-2 border-black
                                        hover:bg-neutral-100 transition-all duration-300 ease-in-out
                                        hover:border-neutral-400
                                        ${isDragging ? 'border-indigo-600 scale-[1.02] bg-neutral-100' : 
                                                ""}
                                        group`}
                                >
                                <span className='
                                        text-2xl bg-neutral-100 rounded 
                                        transition-colors duration-300 ease-in-out 
                                        group-hover:bg-neutral-200 p-2
                                '><i className="fa-solid fa-upload"></i></span>
                                <h2 className='font-semibold text-md mt-2'>
                                        Drop your files here or <span className='
                                                underline underline-offset-4
                                        '>browse</span>
                                </h2>
                        </div>

                        {error && 
                                <span className='text-red-700 text-center mt-4 font-semibold'><p>{error}</p></span>
                        }

                        <div className='my-6'>
                                {files && 
                                        files.map((f, idx) => (
                                                <File file={f} key={idx} name={f.name} lastModifiedDate={f.lastModifiedDate} size={f.size} deleteFile={deleteFileHandle}/>
                                        ))
                                }
                        </div>

                        <div className='
                                w-full
                        '>
                                <label htmlFor="quality" className='text-xl font-bold'>Quality:</label>
                                <div className='flex space-x-4'>
                                        <input 
                                                type="range" 
                                                name="quality" 
                                                id="quality" 
                                                className='
                                                w-full h-2 rounded-full my-4 accent-indigo-700
                                                '
                                                min={0}
                                                step={0.01}
                                                max={1}
                                                value={qualityValue}
                                                onChange={(e) => setQualityValue(Number(e.target.value))}
                                        />
                                        <p className='font-semibold text-xl max-w-xl'>{`${Math.round(qualityValue*100)}%`}</p>
                                </div>

                                <button onClick={handleConversionProcess} disabled={!canConvert} className='
                                        w-full bg-neutral-500 
                                        hover:bg-neutral-600
                                        active:bg-neutral-700
                                        text-neutral-100
                                        p-2 rounded font-bold
                                        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-neutral-500
                                '>Convert</button>
                        </div>

                        { convertedImage &&
                        <div className='
                        
                        '>
                                <img src={convertedImage} alt="" />
                        </div>
                        }

                        <input multiple type="file" ref={fileInput} hidden onChange={handleFileInput} accept='.png'/>
                </Body>
        )
}

export default App
