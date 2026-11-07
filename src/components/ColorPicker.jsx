import {useState, useEffect} from 'react';


function ColorPicker({title="Background:", color="#FF0000", setColor})
{
        const [red, setRed] = useState(255);
        const [green, setGreen] = useState(0);
        const [blue, setBlue] = useState(0);
        const [colorInput, setColorInput] = useState(color);

        const rgbToHex = (r, g, b) => 
                '#' + [r, g, b]
                        .map(x => x.toString(16).padStart(2, '0'))
                        .join('');
        
        const hexToRGB = (hex) => {
                let cleanHex = hex.replace(/^#/, '');

                if(cleanHex.length === 3) {
                        cleanHex = cleanHex.split('').map((char) => char + char).join('');
                }

                const r = parseInt(cleanHex.slice(0,2), 16);
                const g = parseInt(cleanHex.slice(2,4), 16);
                const b = parseInt(cleanHex.slice(4,6), 16);

                return {r, g, b};
        }

        // useEffect(()=>{
        //         if(!setColor) return;
        //         setColor(rgbToHex(red, green, blue));
        // }, [red, green, blue]);


        const handleRGBInput = (r, g, b) => {
                setRed(r);
                setGreen(g);
                setBlue(b);

                setColorInput(rgbToHex(r, g, b));
                setColor(rgbToHex(r, g, b));
        }

        const handleColorInput = (e) => {
                setColorInput(e.target.value);
        
                if(!/^#([0-9a-fA-F]{6})$/.test(e.target.value)) return;
                        
                const {r, g, b} = hexToRGB(e.target.value);
                
                setRed(r);
                setGreen(g);
                setBlue(b);
        };

        return (
                <div>
                        <h1 className='
                                text-xl font-bold
                        '>{title}</h1>
                        <div className="w-full px-4 my-6 flex flex-row">
                                <div className={`
                                        w-64 h-32 rounded mr-auto border-1
                                `} style={{backgroundColor: rgbToHex(red, green, blue)}}></div>
                                
                                <div className='w-1/2'>
                                        <div className='flex flex-row justify-end items-center'>
                                                <label htmlFor="r" className='text-xl font-bold mr-4'>Red:</label>
                                                <input type="range" name="r" id="r"
                                                        min={0}
                                                        max={255}
                                                        step={1}
                                                        value={red}
                                                        onChange={(e) => {handleRGBInput(Number(e.target.value), green, blue)}}
                                                        className='
                                                                w-1/2 h-2 rounded-full my-4 accent-indigo-700
                                                        '
                                                />
                                                <span className='max-w-10 min-w-10 text-center'><p className='text-xl font-semibold ml-4'>{red}</p></span>
                                        </div>
                                        <div className='ml-auto w-full flex flex-row justify-end items-center'>
                                                <label htmlFor="g" className='text-xl font-bold mr-4'>Green:</label>
                                                <input type="range" name="g" id="g"
                                                        min={0}
                                                        max={255}
                                                        step={1}
                                                        value={green}
                                                        onChange={(e) => {handleRGBInput(red, Number(e.target.value), blue)}}
                                                        className='
                                                                w-1/2 h-2 rounded-full my-4 accent-indigo-700
                                                        '
                                                />
                                                <span className='max-w-10 min-w-10 text-center'><p className='text-xl font-semibold ml-4'>{green}</p></span>
                                        </div>
                                        <div className='ml-auto w-full flex flex-row justify-end items-center'>
                                                <label htmlFor="b" className='text-xl font-bold mr-4'>Blue:</label>
                                                <input type="range" name="b" id="b"
                                                        min={0}
                                                        max={255}
                                                        step={1}
                                                        value={blue}
                                                        onChange={(e) => {handleRGBInput(red, green, Number(e.target.value))}}
                                                        className='
                                                                w-1/2 h-2 rounded-full my-4 accent-indigo-700
                                                        '
                                                />
                                                <span className='max-w-10 min-w-10 text-center'><p className='text-xl font-semibold ml-4'>{blue}</p></span>
                                        </div>
                                        <div className='ml-auto w-full flex flex-row justify-end items-center'>
                                                <label htmlFor="color" className='text-xl font-bold mr-4'>Hex Code:</label>
                                                <input type="text" name="color" id="color" value={colorInput} 
                                                        className='
                                                                bg-neutral-300 border border-2 
                                                                font-semibold text-sm rounded-lg 
                                                                block px-3 py-2.5 shadow-xs text-center
                                                        '
                                                        onChange={handleColorInput}
                                                />                 
                                        </div>
                                </div>

                                
                        </div>
                </div>
        );
}

export default ColorPicker;