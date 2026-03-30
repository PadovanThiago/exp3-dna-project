import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminBlog from "./pages/AdminBlog";
import AdminBlogEditor from "./pages/AdminBlogEditor";
import NotFound from "./pages/NotFound";
import DeckRedirect from "./pages/DeckRedirect";
import NeoDash from "./pages/NeoDash";
import NeoDashAdmin from "./pages/NeoDashAdmin";
import AdminNewsletter from "./pages/AdminNewsletter";

const queryClient = new QueryClient();

const FULLSCREEN_ROUTES = ["/neodash", "/neodash/admin"];

const AppLayout = () => {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);

  return (
    <div className={isFullscreen ? "" : "flex flex-col min-h-screen"}>
      {!isFullscreen && <Header />}
      <main className={isFullscreen ? "" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/en/blog" element={<Blog />} />
          <Route path="/en/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/blog" element={<ProtectedAdminRoute><AdminBlog /></ProtectedAdminRoute>} />
          <Route path="/admin/blog/new" element={<ProtectedAdminRoute><AdminBlogEditor /></ProtectedAdminRoute>} />
          <Route path="/admin/blog/edit/:id" element={<ProtectedAdminRoute><AdminBlogEditor /></ProtectedAdminRoute>} />
          <Route path="/deck" element={<DeckRedirect />} />
          <Route path="/neodash" element={<NeoDash />} />
          <Route path="/neodash/admin" element={<NeoDashAdmin />} />
          <Route path="/admin/newsletter" element={<ProtectedAdminRoute><AdminNewsletter /></ProtectedAdminRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
