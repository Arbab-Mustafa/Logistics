import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
import { SLIDER_BUTTON_TEXT, SLIDER_HTEXT, SLIDER_STEXT, imageUrls } from "@/constants/constants";

// Create an array of fixed image URLs instead of dynamic generation

  
const GridShowcase = () => {
    return (
        <section className="container mx-auto px-4 py-16 bg-gray-900">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Left Section */}
                <div className="w-full md:w-1/3 flex p-4 flex-col justify-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {SLIDER_HTEXT}
                    </h2>
                    <p className="text-lg text-gray-300 mb-8">
                      {SLIDER_STEXT}        </p>
                    <Button 
                        className="w-fit !bg-green-600 hover:bg-green-700 text-white border border-green-600"
                    >
                       <Link href={"./dashboard"}>{SLIDER_BUTTON_TEXT}</Link>
                    </Button>
                </div>

                {/* Right Section with Marquee for each row */}
                <div className="w-full md:w-2/3">
                    <div className="flex flex-col gap-8">
                        {[0, 1, 2].map((row, idx) => (
                            <Marquee 
                                key={row} 
                                speed={25 + (idx * 10)} 
                                pauseOnHover={true}
                                gradient={false}
                                direction={idx % 2 === 0 ? "left" : "right"}
                            >
                                <div className="flex gap-14 px-2">
                                    {[...Array(9)].map((_, col) => {
                                        const index = row * 9 + col;
                                        return (
                                            <div 
                                            key={col} 
                                            className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-md overflow-hidden bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 border border-green-600"
                                        >
                                            {index < imageUrls.length && (
                                                <Image
                                                    src={imageUrls[index]}
                                                    alt={`Product ${index + 1}`}
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>
                                        );
                                    })}
                                </div>
                            </Marquee>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GridShowcase;
