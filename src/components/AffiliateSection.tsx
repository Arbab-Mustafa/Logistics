"use client";
import { ArrowRight, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import NavBar from './NavBar';
import Footer from './Footer';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const AffiliateSection = () => {
  const [showForm, setShowForm] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    try {
      // Post to demo API
      const response = await fetch('/api/afa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.status === 201) {
        // Show success toast
        toast.success("Application submitted successfully!");
        form.reset();
        setShowForm(false); // Hide form after submission
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Network error. Please check your connection and try again.");
    }
  }

  return (
   <div>      <NavBar /><section id="affiliate" className="py-16 md:py-24 bg-gray-900">

      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-md relative overflow-hidden border-green-600 border">
            {/* Abstract Shapes Background */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-green-800 rounded-full opacity-50"></div>
            <div className="absolute right-20 bottom-12 w-24 h-24 bg-green-800 rounded-full opacity-40"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-green-800 rounded-full opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Become a TJR Affiliate</h2>
                  <p className="text-gray-300 text-lg">Get paid for referring brands, influencers, or e-commerce sellers to TJR.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="animate-fade-in">
                  <div className="mb-4 p-3 inline-block rounded-lg bg-gray-700">
                    <Users className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Who Should Join?</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• E-commerce consultants</li>
                    <li>• UGC creators</li>
                    <li>• Influencers</li>
                    <li>• Freelancers in dropshipping</li>
                    <li>• Agency owners</li>
                  </ul>
                </div>
                
                <div className="animate-fade-in" style={{animationDelay: "0.1s"}}>
                  <div className="mb-4 p-3 inline-block rounded-lg bg-gray-700">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">How It Works</h3>
                  <ol className="space-y-2 text-gray-200 list-decimal pl-5">
                    <li>Register as an affiliate</li>
                    <li>Get your unique referral code</li>
                    <li>Share with your audience</li>
                    <li>Track conversions in your dashboard</li>
                    <li>Get paid monthly</li>
                  </ol>
                </div>
                
                <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
                  <div className="mb-4 p-3 inline-block rounded-lg bg-gray-700">
                    <DollarSign className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Earning Potential</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• 20% commission on first 3 months</li>
                    <li>• 10% lifetime commission</li>
                    <li>• Bonuses for high-volume referrals</li>
                    <li>• Special incentives for top affiliates</li>
                  </ul>
                </div>
              </div>
              
              {/* Contact Form - conditionally rendered */}
              {showForm && (
                <div className="bg-gray-700 rounded-xl p-6 mb-10 animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4 text-white">Apply Now</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name" 
                                  {...field} 
                                  className="bg-gray-800 border-gray-600 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="your.email@example.com" 
                                  {...field} 
                                  className="bg-gray-800 border-gray-600 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about yourself and why you want to join" 
                                {...field}
                                className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="bg-green-600 hover:bg-green-700 text-white w-full"
                      >
                        Submit Application
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
              
              <div className="flex justify-center">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white shadow-md flex items-center gap-2 px-8 py-6 text-lg rounded-xl"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "Cancel" : "Join the Affiliate Program"} 
                  {!showForm && <ArrowRight size={18} className="text-green-400 hover:text-green-300" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </section>  <Footer /></div> 
  );
};

export default AffiliateSection;
