

export default function Body({children})
{
        return (
                <div className="
                        w-screen
                        h-screen
                        flex
                        justify-center
                        items-center
                ">
                        <div className="
                                w-[90%]
                                h-fit
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