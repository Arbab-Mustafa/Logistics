import { BRANDS, BRANDSLIST } from "@/constants/constants";
import Image from "next/image";

export default function Sponsors() {
    return (
        <div>
            <section className="bg-gray-900 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">{BRANDS}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-2">
                        {BRANDSLIST.map(({ href, src, alt }) => (
                            <div key={alt} className="flex justify-center items-center">
                                <a href={href} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={src}
                                        alt={alt}
                                        width={160}
                                        height={60}
                                        className="h-16 object-contain transition  duration-300"
                                        unoptimized
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
