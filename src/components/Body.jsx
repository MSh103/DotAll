

export default function Body({children})
{
        return (
                <div className="
                        w-screen
                        h-screen
                        pt-6
                ">
                        <div className="
                                w-[90%]
                                h-fit
                                mx-auto
                                text-neutral-900
                                px-4
                                py-6
                                rounded-lg
                                border
                                ">
                                {children}
                        </div>
                </div>
        );
}