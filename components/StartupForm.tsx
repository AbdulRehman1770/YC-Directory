// 'use client'

// // Import necessary components and libraries
// import { Input } from "@/components/ui/input";
// import React, { useActionState, useState } from "react";
// import { Textarea } from "@/components/ui/textarea"
// import MDEditor from "@uiw/react-md-editor"
// import { Send } from "lucide-react";
// import { formSchema } from "@/lib/validation";
// import { z } from "zod"
// import { toast } from "sonner";
// import { useRouter } from 'next/navigation' 
// import { Button } from "./ui/button";
// import { createPitch } from "@/lib/action";

// const StartupForm = () => {
//     // State for form validation errors
//     const [errors, setErrors] = useState<Record<string, string>>({})
    
//     // State for storing the pitch input value
//     const [pitch, setPitch] = useState("");
    
//     // Router hook for navigation
//     const router = useRouter()

//     // Function to handle form submission
//     const handleFormSubmit = async (prevState: any, formData: FormData) => {
//         console.log("Form submission started...");
//         try {
//             // Extract values from the form data
//             console.log("Inside try block");
//             const formValues = {
//                 title: formData.get("title") as string,
//                 description: formData.get("description") as string,
//                 category: formData.get("category") as string,
//                 link: formData.get("link") as string,
//                 pitch,
//             }

//             // Validate form inputs using Zod schema
//             await formSchema.parseAsync(formValues);
           

//             // Here, you would send the data to the backend (commented out for now)
//             const result = await createPitch(prevState, formData, pitch)
          
//             if(result.status == 'SUCCESS'){
//                 toast("Success", {
//                     description: "Your Startup Pitch has been created successfully",
//                     action: {
//                         label: "View",
//                         onClick: () => router.push(`/startup/${result.id}`),
//                     },
//                 });
            
//                 router.push(`/startup/${result._id}`)
//             }
//             return result
//         }catch (error) {
//             // Handle validation errors
//             if (error instanceof z.ZodError) {
//                 const fieldErrors = error.flatten().fieldErrors;
//                 setErrors(fieldErrors as unknown as Record<string, string>)
                
//                 toast("Error", {
//                     description: "Please check your inputs and try again",
//                 });
                
//                 return { ...prevState, error: 'Validation failed', status: "ERROR" }
//             }

//             // Handle unexpected errors
//             toast("Error", {
//                 description: "An unexpected error has occurred",
//             });

//             return {
//                 ...prevState,
//                 error: 'An Unexpected Error has occurred',
//                 status: "ERROR"
//             }
//         }
//     }

//     // useActionState to manage form state
//     const [state, formAction, isPending] = useActionState(handleFormSubmit, {
//         error: "",
//         status: "INITIAL",
//     });

//     return (
//         <form action={formAction} onSubmit={() => console.log("Form submitted")} className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6">
//             {/* Title Input */}
//             <div>
//                 <label htmlFor="title" className="font-bold text-[18px] text-black uppercase">Title</label>
//                 <Input id="title" name="title" className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300" required placeholder="Startup Title" />
//                 {errors.title && <p className="text-red-500 mt-2 ml-5">{errors.title}</p>}
//             </div>

//             {/* Description Input */}
//             <div>
//                 <label htmlFor="description" className="font-bold text-[18px] text-black uppercase">Description</label>
//                 <Textarea id="description" name="description" className="border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300" required placeholder="Startup Description" />
//                 {errors.description && <p className="text-red-500 mt-2 ml-5">{errors.description}</p>}
//             </div>

//             {/* Category Input */}
//             <div>
//                 <label htmlFor="category" className="font-bold text-[18px] text-black uppercase">Category</label>
//                 <Input id="category" name="category" className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300" required placeholder="Startup Category (Tech, Health, Education...)" />
//                 {errors.category && <p className="text-red-500 mt-2 ml-5">{errors.category}</p>}
//             </div>

//             {/* Image URL Input */}
//             <div>
//                 <label htmlFor="link" className="font-bold text-[18px] text-black uppercase">Image URL</label>
//                 <Input id="link" name="link" className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300" required placeholder="Startup Image URL" />
//                 {errors.link && <p className="text-red-500 mt-2 ml-5">{errors.link}</p>}
//             </div>

//             {/* Markdown Editor for Pitch */}
//             <div data-color-mode="light">
//                 <label htmlFor="pitch" className="font-bold text-[18px] text-black uppercase">Pitch</label>
//                 <MDEditor
//                     value={pitch}
//                     onChange={(value) => setPitch(value as string)}
//                     id="pitch"
//                     preview="edit"
//                     height={300}
//                     style={{ borderRadius: 20, overflow: "hidden" }}
//                     textareaProps={{
//                         placeholder: "Briefly describe your idea and what problem it solves"
//                     }}
//                     previewOptions={{
//                         disallowedElements: ["style"]
//                     }}
//                 />
//                 {errors.pitch && <p className="text-red-500 mt-2 ml-5">{errors.pitch}</p>}
//             </div>

//             {/* Submit Button */}
//             <Button type="submit" className="bg-[#EE2B69] border-[4px] text-white border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px]" disabled={isPending}>
//                 {isPending ? "Submitting..." : "Submit Your Pitch"}
//                 <Send className="size-6 ml-2" />
//             </Button>
//         </form>
//     )
// }

// export default StartupForm;

'use client'

import { Input } from "@/components/ui/input";
import React, { useActionState, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod"
import { toast } from "sonner";
import { useRouter } from 'next/navigation' 
import { Button } from "./ui/button";
import { createPitch } from "@/lib/action";

interface FormState {
  error: string;
  status: 'INITIAL' | 'SUCCESS' | 'ERROR';
  id?: string;
  _id?: string;
}

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (prevState: FormState, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            await formSchema.parseAsync(formValues);
           
            const result = await createPitch(prevState, formData, pitch);
          
            if(result.status == 'SUCCESS'){
                toast("Success", {
                    description: "Your Startup Pitch has been created successfully",
                    action: {
                        label: "View",
                        onClick: () => router.push(`/startup/${result.id}`),
                    },
                });
                router.push(`/startup/${result._id}`);
            }
            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                // Convert field errors to Record<string, string> by joining array messages
                const stringFieldErrors = Object.fromEntries(
                    Object.entries(fieldErrors).map(([key, value]) => [
                        key,
                        value ? value.join(', ') : ''
                    ])
                );
                setErrors(stringFieldErrors);
                
                toast("Error", {
                    description: "Please check your inputs and try again",
                });
                
                return { ...prevState, error: 'Validation failed', status: "ERROR" };
            }

            toast("Error", {
                description: "An unexpected error has occurred",
            });

            return {
                ...prevState,
                error: 'An Unexpected Error has occurred',
                status: "ERROR"
            };
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        <form action={formAction} className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6">
            {/* Server Error Display */}
            {state.error && state.status === 'ERROR' && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                    <p className="font-medium">{state.error}</p>
                </div>
            )}

            {/* Title Input */}
            <div>
                <label htmlFor="title" className="font-bold text-[18px] text-black uppercase">Title</label>
                <Input 
                    id="title" 
                    name="title" 
                    className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300" 
                    required 
                    placeholder="Startup Title" 
                />
                {errors.title && <p className="text-red-500 mt-2 ml-5">{errors.title}</p>}
            </div>

            {/* Description Input */}
            <div>
                <label htmlFor="description" className="font-bold text-[18px] text-black uppercase">Description</label>
                <Textarea 
                    id="description" 
                    name="description" 
                    className="border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300" 
                    required 
                    placeholder="Startup Description" 
                />
                {errors.description && <p className="text-red-500 mt-2 ml-5">{errors.description}</p>}
            </div>

            {/* Category Input */}
            <div>
                <label htmlFor="category" className="font-bold text-[18px] text-black uppercase">Category</label>
                <Input 
                    id="category" 
                    name="category" 
                    className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300" 
                    required 
                    placeholder="Startup Category (Tech, Health, Education...)" 
                />
                {errors.category && <p className="text-red-500 mt-2 ml-5">{errors.category}</p>}
            </div>

            {/* Image URL Input */}
            <div>
                <label htmlFor="link" className="font-bold text-[18px] text-black uppercase">Image URL</label>
                <Input 
                    id="link" 
                    name="link" 
                    className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300" 
                    required 
                    placeholder="Startup Image URL" 
                />
                {errors.link && <p className="text-red-500 mt-2 ml-5">{errors.link}</p>}
            </div>

            {/* Markdown Editor for Pitch */}
            <div data-color-mode="light">
                <label htmlFor="pitch" className="font-bold text-[18px] text-black uppercase">Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value || "")}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves"
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />
                {errors.pitch && <p className="text-red-500 mt-2 ml-5">{errors.pitch}</p>}
            </div>

            {/* Submit Button */}
            <Button 
                type="submit" 
                className="bg-[#EE2B69] border-[4px] text-white border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px]" 
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    );
};

export default StartupForm;