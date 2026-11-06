import { useEffect, useState } from "react";

function formatFileBytes(bytes)
{
        if(bytes < 1024) return `${bytes} B`;
        if(bytes < 1024 ** 2) return `${(bytes/1024).toFixed(2)} KB`;
        if(bytes < 1024 ** 3) return `${(bytes/1024**2).toFixed(2)} MB`;

        return `${(bytes/1024**3).toFixed(2)} GB`;
}

export default function File({file, name, lastModifiedDate, size, deleteFile})
{
        const [preview, setPreview] = useState(null);

        useEffect(() => {
                if(!file?.type?.startsWith("image/")) return;

                const url = URL.createObjectURL(file);
                setPreview(url);

                return () => URL.revokeObjectURL(url);
        }, [file]);

        const onClick = (e) => {
                if(e.button === 0)
                        deleteFile(file);
        };

        return (
                <div className="
                        flex items-center
                        border-2 rounded py-2 px-4
                        my-4
                ">
                        <div className="max-w-[50%]">
                                <img src={preview} className="max-h-12"/>
                        </div>
                        <span className="ml-auto text-right max-w-[40%]">
                                <h1 className="font-semibold line-clamp-1">{name}</h1>
                                <p>{formatFileBytes(size)}</p>
                        </span>
                        <button onClick={onClick} className="
                                border rounded p-2 ml-4 bg-neutral-100 hover:bg-neutral-200
                        "><i className="fa-solid fa-trash"></i></button>
                </div>
        );
}
