import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import RequestInfo from "./pages/RequestInfo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import CreateListing from "./pages/Createlisting";
import Profile from "./pages/Profile";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin />} />
          <Route path="/request-info" element={<RequestInfo />} />
          <Route path="/CreateListing" element={<CreateListing />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Buy" element={<Buy />} />
          <Route path="/Rent" element={<Rent />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
