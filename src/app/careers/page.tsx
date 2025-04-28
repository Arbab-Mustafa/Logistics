"use client";
import { useState } from 'react';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Briefcase, Users, Award } from 'lucide-react';
import { ACERJ, ACERJ1, benefits, CAREER, CTAtake, culturePoints, d, jobOpenings, RDY_TO_SEE, RDY_TO_SEE_DESC, RTJ, RTJ_BUTTON, RTJ_DESC, TEXTAAG, VASER1 } from '@/constants/constants';

const Careers = () => {
    const [activeTab, setActiveTab] = useState("jobs");
    
   

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <NavBar />
            
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-gray-800 py-12 md:py-24 relative">
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src="/careers-hero.jpg" 
                            alt="Careers at TJR Logistics" 
                            fill 
                            style={{objectFit: 'cover'}}
                            priority
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl bg-gray-900/45 rounded-3xl backdrop-blur-sm p-3 mx-auto text-center">
                            <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-6 drop-shadow-md" 
                                >
                             {CAREER}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-sm"
                                >
                                Be part of the team that&apos;s transforming e-commerce logistics in the GCC region.
                                We&apos;re always looking for talented individuals who share our passion for innovation.
                            </p>
                            <button 
                                className="px-6 py-3 text-lg font-medium bg-green-800 cursor-pointer hover:bg-green-700 text-white rounded-md transition-colors shadow-md"
                                onClick={() => setActiveTab("jobs")}
                            >
                                {d}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Tabs Section */}
                <div className="container mx-auto px-4 bg-gray-900 py-16">
                    <div className="w-full">
                        <div className="flex justify-center mb-8">
                            <div className="grid w-full max-w-md grid-cols-3 bg-gray-800 p-1 rounded-lg shadow-sm">
                                <button 
                                    onClick={() => setActiveTab("jobs")}
                                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-colors ${activeTab === "jobs" ? "bg-gray-700 shadow-md" : "hover:bg-green-700"}`}
                                >
                                    <Briefcase className="h-4 w-4 text-green-400" />
                                    <span className="hidden sm:inline text-gray-200">{ACERJ}</span>
                                    <span className="inline sm:hidden text-gray-200">Jobs</span>
                                </button>
                                <button 
                                    onClick={() => setActiveTab("culture")}
                                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-colors ${activeTab === "culture" ? "bg-gray-700 shadow-md" : "hover:bg-green-700"}`}
                                >
                                    <Users className="h-4 w-4 text-green-400" />
                                    <span className="hidden sm:inline text-gray-200">{ACERJ1}</span>
                                    <span className="inline sm:hidden text-gray-200">Culture</span>
                                </button>
                                <button 
                                    onClick={() => setActiveTab("benefits")}
                                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-colors ${activeTab === "benefits" ? "bg-gray-700 shadow-md" : "hover:bg-green-700"}`}
                                >
                                    <Award className="h-4 w-4 text-green-400" />
                                    <span className="hidden sm:inline text-gray-200">{TEXTAAG}</span>
                                    <span className="inline sm:hidden text-gray-200">Benefits</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Jobs Tab Content */}
                        <div className={`space-y-8 transition-all duration-300 ${activeTab === "jobs" ? "block opacity-100" : "hidden opacity-0"}`}>
                            <div className="text-center mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-4"
                                    style={{textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
                                    Current Openings
                                </h2>
                                <p className="text-gray-300 max-w-2xl mx-auto">
                                    {VASER1}
                                </p>
                            </div>
                            
                            <div className="overflow-hidden rounded-lg border border-green-600 shadow-sm">
                                <table className="w-full">
                                    <thead className="bg-gray-800">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-green-400">Position</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-green-400 hidden md:table-cell">Department</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-green-400 hidden md:table-cell">Location</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-green-400 hidden md:table-cell">Type</th>
                                            <th className="px-4 py-3 text-right text-sm font-medium text-green-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {jobOpenings.map((job) => (
                                            <tr key={job.id}>
                                                <td className="px-4 py-4 text-sm font-medium text-green-400">
                                                    {job.title}
                                                    <div className="md:hidden text-sm text-gray-400">
                                                        {job.department} • {job.location}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-400 hidden md:table-cell">{job.department}</td>
                                                <td className="px-4 py-4 text-sm text-gray-400 hidden md:table-cell">{job.location}</td>
                                                <td className="px-4 py-4 text-sm text-gray-400 hidden md:table-cell">{job.type}</td>
                                                <td className="px-4 py-4 text-right">
                                                    <button className="px-3 py-1 text-sm border border-green-600 text-green-400 rounded-md hover:bg-green-700 hover:text-green-300 transition-colors shadow-sm">Apply</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="text-center mt-8">
                                <p className="text-gray-300 mb-4">
                                    {RDY_TO_SEE}
                                </p>
                                <button className="px-4 py-2 border border-green-600 text-green-400 rounded-md hover:bg-green-700 hover:text-green-300 transition-colors shadow-sm">
                                    {RDY_TO_SEE_DESC}
                                </button>
                            </div>
                        </div>
                        
                        {/* Culture Tab Content */}
                        <div className={`space-y-8 transition-all duration-300 ${activeTab === "culture" ? "block opacity-100" : "hidden opacity-0"}`}>
                            <div className="text-center mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-4"
                                    style={{textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
                                    Our Company Culture
                                </h2>
                                <p className="text-gray-300 max-w-2xl mx-auto">
                                    At TJR Logistics, we&apos;ve built a dynamic culture that encourages innovation, collaboration, and growth.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {culturePoints.map((point, index) => (
                                    <div key={index} className="border-2 border-green-600 hover:border-green-600 transition-all rounded-lg overflow-hidden shadow-sm">
                                        <div className="p-6 border-b border-green-600 bg-gray-800">
                                            <h3 className="text-xl font-semibold text-green-400" 
                                                style={{textShadow: '0 1px 1px rgba(0,0,0,0.05)'}}>{point.title}</h3>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-gray-300">{point.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="bg-gray-800 rounded-lg p-8 mt-12 relative shadow-md">
                                <div className="absolute inset-0 rounded-lg overflow-hidden">
                                    <Image 
                                        src="/culture-bg.jpg" 
                                        alt="Company culture" 
                                        fill 
                                        style={{objectFit: 'cover'}}
                                    />
                                </div>
                                <div className="max-w-3xl mx-auto text-center relative z-10">
                                    <h3 className="text-2xl bg-gray-900/55 rounded-2xl font-bold text-green-400 mb-4 drop-shadow-md"
                                        >
                                        Our Values
                                    </h3>
                                    <p className="text-gray-200 mb-8 bg-gray-900/35 rounded-md drop-shadow-sm">
                                        Our values guide everything we do, from how we develop our products to how we serve our customers and work with each other.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="flex flex-col items-center p-4">
                                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-800 mb-4 shadow-md">
                                                <span className="text-white text-2xl font-bold">T</span>
                                            </div>
                                            <h4 className="font-semibold text-green-400 drop-shadow-sm">Trust</h4>
                                        </div>
                                        <div className="flex flex-col items-center p-4">
                                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-800 mb-4 shadow-md">
                                                <span className="text-white text-2xl font-bold">J</span>
                                            </div>
                                            <h4 className="font-semibold text-green-400 drop-shadow-sm">Journey</h4>
                                        </div>
                                        <div className="flex flex-col items-center p-4">
                                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-800 mb-4 shadow-md">
                                                <span className="text-white text-2xl font-bold">R</span>
                                            </div>
                                            <h4 className="font-semibold text-green-400 drop-shadow-sm">Reliability</h4>
                                        </div>
                                        <div className="flex flex-col items-center p-4">
                                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-800 mb-4 shadow-md">
                                                <span className="text-white text-2xl font-bold">+</span>
                                            </div>
                                            <h4 className="font-semibold text-green-400 drop-shadow-sm">Excellence</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Benefits Tab Content */}
                        <div className={`space-y-8 transition-all duration-300 ${activeTab === "benefits" ? "block opacity-100" : "hidden opacity-0"}`}>
                            <div className="text-center mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-4"
                                    style={{textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
                                    Benefits & Perks
                                </h2>
                                <p className="text-gray-300 max-w-2xl mx-auto">
                                    {CTAtake}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {benefits.map((category, index) => (
                                    <div key={index} className="border-2 border-green-600 rounded-lg overflow-hidden shadow-sm">
                                        <div className="bg-gray-800 border-b border-green-600 p-6">
                                            <h3 className="text-xl font-semibold text-green-400"
                                                style={{textShadow: '0 1px 1px rgba(0,0,0,0.05)'}}>{category.title}</h3>
                                        </div>
                                        <div className="p-6 pt-6">
                                            <ul className="space-y-2">
                                                {category.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-300">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* CTA Section */}
                <div className="bg-gray-800 py-16 relative">
                    <div className="absolute backdrop-blur-xs inset-0">
                        <Image 
                            src="/cta-bg.jpg" 
                            alt="Join our team" 
                            fill 
                            style={{objectFit: 'cover'}}
                        />
                    </div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="bg-gray-900/90 backdrop-blur-sm max-w-3xl mx-auto rounded-xl p-8 shadow-lg">
                            <h2 className="text-2xl md:text-3xl text-shadow-green-900 text-shadow-2xs font-bold text-green-400 mb-4"
                                style={{textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
                                {RTJ}
                            </h2>
                            <p className="text-gray-200 max-w-2xl mx-auto mb-8">
                        {RTJ_DESC}
                            </p>
                            <button 
                                className="px-6 py-3 text-lg font-medium bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors shadow-md"
                                onClick={() => setActiveTab("jobs")}
                            >
                                {RTJ_BUTTON}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Careers;
