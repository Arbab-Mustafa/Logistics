"use client";
import { useState } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus, ArrowRight } from "lucide-react";
import { z } from "zod";
import { signIn } from "next-auth/react";

// Zod validation schemas
const LoginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
});

const Login = () => {
        const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
        const [showPassword, setShowPassword] = useState(false);
        const { toast } = useToast();

        const router = useRouter();
        // Form states
        const [loginEmail, setLoginEmail] = useState("");
        const [loginPassword, setLoginPassword] = useState("");
        const [signupName, setSignupName] = useState("");
        const [signupEmail, setSignupEmail] = useState("");
        const [signupPassword, setSignupPassword] = useState("");
        const [acceptTerms, setAcceptTerms] = useState(false);
        
        // Error states
        const [loginErrors, setLoginErrors] = useState<string[]>([]);
        const [signupErrors, setSignupErrors] = useState<string[]>([]);
        const [successMessage, setSuccessMessage] = useState("");

        const handleLogin = async (e: React.FormEvent) => {
                e.preventDefault();
                try {
                        // Validate form data with Zod
                        LoginSchema.parse({ email: loginEmail, password: loginPassword });
                        setLoginErrors([]);
                        
                        // Attempt login via next-auth
                        const result = await signIn('credentials', {
                                email: loginEmail,
                                password: loginPassword,
                                redirect: false,
                        });
                        
                        if (result?.error) {
                                setLoginErrors([result.error]);
                        } else {
                                setSuccessMessage("Login successful! Redirecting...");
                                toast({
                                        title: "Login Successful",
                                        description: "You have been logged in successfully.",
                                });
                                router.push("/dashboard"); // Redirect to dashboard or home page
                        }
                } catch (error) {
                        if (error instanceof z.ZodError) {
                                setLoginErrors(error.errors.map((err) => err.message));
                                toast({
                                        title: "Validation Error",
                                        description: "Please check your inputs and try again.",
                                        variant: "destructive",
                                });
                        }
                }
        };

        const handleSignup = async (e: React.FormEvent) => {
                e.preventDefault();
                try {
                        // Validate form data with Zod
                        SignupSchema.parse({
                                name: signupName,
                                email: signupEmail,
                                password: signupPassword,
                                acceptTerms: acceptTerms
                        });
                        setSignupErrors([]);
                        
                        // Example: Send signup data to your API endpoint
                        const response = await fetch("/api/signup", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                        Name: signupName,
                                        email: signupEmail,
                                        Password: signupPassword,
                                }),
                        });
        
                        const data = await response.json();
        
                        if (!response.ok) {
                                setSignupErrors([data.message || "Signup failed"]);
                                toast({
                                        title: "Signup Error",
                                        description: data.message || "Signup failed.",
                                        variant: "destructive",
                                });
                        } else {
                                setSuccessMessage("Signup successful! You can now log in.");
                                toast({
                                        title: "Signup Successful",
                                        description: "Your account has been created. Please log in.",
                                });
                                setActiveTab("login");
                                setSignupName("");
                                setSignupEmail("");
                                setSignupPassword("");
                                setAcceptTerms(false);
                        }
                } catch (error) {
                        if (error instanceof z.ZodError) {
                                setSignupErrors(error.errors.map((err) => err.message));
                                toast({
                                        title: "Validation Error",
                                        description: "Please check your inputs and try again.",
                                        variant: "destructive",
                                });
                        } else {
                                setSignupErrors(["An unexpected error occurred."]);
                                toast({
                                        title: "Error",
                                        description: "An unexpected error occurred.",
                                        variant: "destructive",
                                });
                        }
                }
        };
        const toggleShowPassword = () => {
                setShowPassword(!showPassword);
        };

        return (
                <>
                        <NavBar />
                        <main className="bg-[url('/login.jpg')] bg-no-repeat bg-cover bg-center bg-fixed min-h-[calc(100vh-64px-300px)] backdrop-blur-lg bg-gray-900 bg-opacity-90">
                                <div className="container mx-auto px-4 py-16 max-w-lg">
                                        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-green-600 animate-fade-in">
                                                <div className="text-center mb-8">
                                                        <div className="inline-flex items-center gap-2 mb-2">
                                                                <span className="text-2xl font-bold text-white tracking-tight">
                                                                        <Image src="/ogo.jpg" alt="Logo" width={40} height={40} className="inline-block" />
                                                                </span>
                                                                <span className="h-6 w-1 bg-green-600 rounded-full"></span>
                                                                <span className="text-sm font-medium text-gray-300">Logistics</span>
                                                        </div>
                                                        <h1 className="text-2xl text-white font-bold">Welcome to TJR</h1>
                                                        <p className="text-gray-300 mt-2">
                                                                Join our logistics and fulfillment network for seamless e-commerce operations in the GCC.
                                                        </p>
                                                </div>

                                                <div className="relative mb-8">
                                                        <div className="absolute inset-0 flex items-center">
                                                                <div className="w-full border-t border-gray-700"></div>
                                                        </div>
                                                        <div className="relative flex justify-center text-sm">
                                                                <span className="px-2 bg-gray-800 text-gray-300">Login or Sign Up</span>
                                                        </div>
                                                </div>

                                                {/* Custom Tabs */}
                                                <div className="w-full">
                                                        {/* Custom TabsList */}
                                                        <div className="grid w-full grid-cols-2 mb-8 rounded-md bg-gray-700 p-1">
                                                                <button
                                                                        onClick={() => setActiveTab("login")}
                                                                        className={`flex items-center justify-center gap-2 py-2 text-sm font-medium transition-all duration-200 ${activeTab === "login"
                                                                                ? "bg-gray-900 rounded-md shadow-sm text-green-400"
                                                                                : "text-gray-300 hover:text-green-300"
                                                                                }`}
                                                                >
                                                                        <LogIn size={16} />
                                                                        Login
                                                                </button>
                                                                <button
                                                                        onClick={() => setActiveTab("signup")}
                                                                        className={`flex items-center justify-center gap-2 py-2 text-sm font-medium transition-all duration-200 ${activeTab === "signup"
                                                                                ? "bg-gray-900 rounded-md shadow-sm text-green-400"
                                                                                : "text-gray-300 hover:text-green-300"
                                                                                }`}
                                                                >
                                                                        <UserPlus size={16} />
                                                                        Sign Up
                                                                </button>
                                                        </div>

                                                        {/* Login Form */}
                                                        {activeTab === "login" && (
                                                                <div className="animate-scale-in flex justify-center px-4">
                                                                        <form
                                                                                onSubmit={handleLogin}
                                                                                className="space-y-4 py-2 w-full max-w-md"
                                                                        >
                                                                                {successMessage && (
                                                                                        <div className="text-green-400 font-medium mt-2 text-center">
                                                                                                {successMessage}
                                                                                        </div>
                                                                                )}
                                                                                
                                                                                <div className="space-y-2">
                                                                                        <label
                                                                                                htmlFor="login-email"
                                                                                                className="text-sm font-medium text-gray-200"
                                                                                        >
                                                                                                Email
                                                                                        </label>
                                                                                        <div className="relative">
                                                                                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                                                                <input
                                                                                                        id="login-email"
                                                                                                        type="email"
                                                                                                        placeholder="youremail@example.com"
                                                                                                        className="w-full pl-10 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                                                                        value={loginEmail}
                                                                                                        onChange={(e) => setLoginEmail(e.target.value)}
                                                                                                        required
                                                                                                />
                                                                                        </div>
                                                                                        {loginErrors.some(err => err.includes("email")) && (
                                                                                                <p className="text-red-400 text-sm mt-1">
                                                                                                        {loginErrors.find(err => err.includes("email"))}
                                                                                                </p>
                                                                                        )}
                                                                                </div>

                                                                                <div className="space-y-2">
                                                                                        <div className="flex items-center justify-between">
                                                                                                <label
                                                                                                        htmlFor="login-password"
                                                                                                        className="text-sm font-medium text-gray-200"
                                                                                                >
                                                                                                        Password
                                                                                                </label>
                                                                                                <a className="text-xs text-green-400 hover:text-green-300" href="#">
                                                                                                        Forgot password?
                                                                                                </a>
                                                                                        </div>
                                                                                        <div className="relative">
                                                                                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                                                                <input
                                                                                                        id="login-password"
                                                                                                        type={showPassword ? "text" : "password"}
                                                                                                        className="w-full pl-10 pr-10 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                                                                        value={loginPassword}
                                                                                                        onChange={(e) => setLoginPassword(e.target.value)}
                                                                                                        required
                                                                                                />
                                                                                                <button
                                                                                                        type="button"
                                                                                                        className="absolute right-3 top-2.5 text-gray-400"
                                                                                                        onClick={toggleShowPassword}
                                                                                                >
                                                                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                                                                </button>
                                                                                        </div>
                                                                                        {loginErrors.some(err => err.includes("password")) && (
                                                                                                <p className="text-red-400 text-sm mt-1">
                                                                                                        {loginErrors.find(err => err.includes("password"))}
                                                                                                </p>
                                                                                        )}
                                                                                </div>

                                                                                {loginErrors.length > 0 && !loginErrors.some(err => err.includes("email") || err.includes("password")) && (
                                                                                        <div className="text-red-400 text-sm">
                                                                                                {loginErrors.map((error, index) => (
                                                                                                        <p key={index}>{error}</p>
                                                                                                ))}
                                                                                        </div>
                                                                                )}

                                                                                <Button
                                                                                        type="submit"
                                                                                        className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white mt-6 group"
                                                                                >
                                                                                        Login
                                                                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                                                </Button>

                                                                                <div className="mt-4 text-center text-sm text-gray-300">
                                                                                        <p>
                                                                                                Don&apos;t have an account?{" "}
                                                                                                <button
                                                                                                        type="button"
                                                                                                        className="text-green-400 hover:text-green-300"
                                                                                                        onClick={() => setActiveTab("signup")}
                                                                                                >
                                                                                                        Sign up
                                                                                                </button>
                                                                                        </p>
                                                                                </div>
                                                                        </form>
                                                                </div>
                                                        )}
                                                        {/* Signup Form */}
                                                        {activeTab === "signup" && (
                                                                <div className="animate-scale-in flex justify-center items-center w-full">
                                                                        <form
                                                                                onSubmit={handleSignup}
                                                                                className="space-y-6 py-8 px-4 sm:px-6 w-full max-w-md bg-gray-800 rounded-xl shadow-xl"
                                                                        >
                                                                                <div className="space-y-2">
                                                                                        <label htmlFor="signup-name" className="text-sm font-medium text-gray-200">
                                                                                                Full Name
                                                                                        </label>
                                                                                        <div className="relative">
                                                                                                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                                                                <input
                                                                                                        id="signup-name"
                                                                                                        type="text"
                                                                                                        placeholder="Your Name"
                                                                                                        className="w-full pl-10 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                                                                        value={signupName}
                                                                                                        onChange={(e) => setSignupName(e.target.value)}
                                                                                                        required
                                                                                                />
                                                                                        </div>
                                                                                        {signupErrors.some(err => err.includes("Name")) && (
                                                                                                <p className="text-red-400 text-sm mt-1">
                                                                                                        {signupErrors.find(err => err.includes("Name"))}
                                                                                                </p>
                                                                                        )}
                                                                                </div>

                                                                                <div className="space-y-2">
                                                                                        <label htmlFor="signup-email" className="text-sm font-medium text-gray-200">
                                                                                                Email
                                                                                        </label>
                                                                                        <div className="relative">
                                                                                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                                                                <input
                                                                                                        id="signup-email"
                                                                                                        type="email"
                                                                                                        placeholder="youremail@example.com"
                                                                                                        className="w-full pl-10 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                                                                        value={signupEmail}
                                                                                                        onChange={(e) => setSignupEmail(e.target.value)}
                                                                                                        required
                                                                                                />
                                                                                        </div>
                                                                                        {signupErrors.some(err => err.includes("email")) && (
                                                                                                <p className="text-red-400 text-sm mt-1">
                                                                                                        {signupErrors.find(err => err.includes("email"))}
                                                                                                </p>
                                                                                        )}
                                                                                </div>

                                                                                <div className="space-y-2">
                                                                                        <label htmlFor="signup-password" className="text-sm font-medium text-gray-200">
                                                                                                Password
                                                                                        </label>
                                                                                        <div className="relative">
                                                                                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                                                                <input
                                                                                                        id="signup-password"
                                                                                                        type={showPassword ? "text" : "password"}
                                                                                                        placeholder="••••••••"
                                                                                                        className="w-full pl-10 pr-10 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                                                                        value={signupPassword}
                                                                                                        onChange={(e) => setSignupPassword(e.target.value)}
                                                                                                        required
                                                                                                />
                                                                                                <button
                                                                                                        type="button"
                                                                                                        className="absolute right-3 top-2.5 text-gray-400"
                                                                                                        onClick={toggleShowPassword}
                                                                                                >
                                                                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                                                                </button>
                                                                                        </div>
                                                                                        {signupErrors.some(err => err.includes("password")) && (
                                                                                                <p className="text-red-400 text-sm mt-1">
                                                                                                        {signupErrors.find(err => err.includes("password"))}
                                                                                                </p>
                                                                                        )}
                                                                                </div>

                                                                                <div className="flex items-center space-x-2 mt-4">
                                                                                        <input
                                                                                                id="terms"
                                                                                                type="checkbox"
                                                                                                checked={acceptTerms}
                                                                                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                                                                                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-600 focus:ring-green-500"
                                                                                        />
                                                                                        <label htmlFor="terms" className="text-sm text-gray-200">
                                                                                                I agree to the{" "}
                                                                                                <a href="#" className="text-green-400 hover:text-green-300">
                                                                                                        terms and conditions
                                                                                                </a>
                                                                                        </label>
                                                                                </div>
                                                                                {signupErrors.some(err => err.includes("terms")) && (
                                                                                        <p className="text-red-400 text-sm mt-1">
                                                                                                {signupErrors.find(err => err.includes("terms"))}
                                                                                        </p>
                                                                                )}

                                                                                <Button
                                                                                        type="submit"
                                                                                        className="w-full cursor-pointer !bg-green-600 hover:bg-green-700 text-white mt-6 group"
                                                                                >
                                                                                        Create Account
                                                                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                                                </Button>

                                                                                <div className="mt-4 text-center text-sm text-gray-300">
                                                                                        <p>
                                                                                                Already have an account?{" "}
                                                                                                <button
                                                                                                        type="button"
                                                                                                        className="text-green-400 hover:text-green-300"
                                                                                                        onClick={() => setActiveTab("login")}
                                                                                                >
                                                                                                        Login
                                                                                                </button>
                                                                                        </p>
                                                                                </div>
                                                                        </form>
                                                                </div>
                                                        )}

                                                </div>

                                                <div className="mt-8 relative">
                                                        <div className="absolute inset-0 flex items-center">
                                                                <div className="w-full border-t border-gray-700"></div>
                                                        </div>
                                                        <div className="relative flex justify-center text-sm">
                                                                <span className="px-2 bg-gray-800 text-gray-300">Or continue with</span>
                                                        </div>
                                                </div>

                                                <div className="mt-6 grid grid-cols-2 gap-4">
                                                        <Button 
                                                                className="bg-gray-700 cursor-pointer hover:bg-gray-600 border border-gray-600 text-gray-200"
                                                                onClick={() => signIn('google', { callbackUrl: '/' })}
                                                        >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="mr-2">
                                                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                                </svg>
                                                                Google
                                                        </Button>
                                                        <Button 
                                                                className="bg-gray-700 cursor-pointer hover:bg-gray-600 border text-gray-200 border-gray-600"
                                                                onClick={() => signIn('facebook', { callbackUrl: '/' })}
                                                        >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="mr-2 text-[#1877F2]">
                                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                                </svg>
                                                                Facebook
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        </main>
                        <Footer />
                </>
        );
};

export default Login;