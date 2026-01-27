
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FCE2] via-[#E5DEFF] to-[#FEF7CD] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-puzzle-blue via-puzzle-purple to-puzzle-pink rounded-2xl flex items-center justify-center shadow-2xl">
              <img 
                src="/lovable-uploads/38091d20-000d-419d-8269-4a7c07d5c321.png" 
                alt="CodeZen Logo" 
                className="w-12 h-12 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-red-100 p-3">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {/* 404 Content */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-puzzle-blue via-puzzle-purple to-puzzle-pink bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-puzzle-gray mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-puzzle-gray/70 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm text-puzzle-gray/60 mb-8">
            Route: <code className="bg-puzzle-light px-2 py-1 rounded font-mono text-xs">{location.pathname}</code>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGoHome}
            size="lg"
            className="bg-gradient-to-r from-puzzle-purple to-puzzle-blue hover:scale-105 transition-all duration-300"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Button>
          
          <Button 
            onClick={handleGoBack}
            variant="outline"
            size="lg"
            className="border-puzzle-purple/30 text-puzzle-purple hover:bg-puzzle-purple/10"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-8 border-t border-puzzle-purple/10">
          <p className="text-sm text-puzzle-gray/60 mb-4">Need help? Try these:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              onClick={() => navigate('/levels')}
              variant="ghost" 
              size="sm"
              className="text-puzzle-purple hover:text-puzzle-purple hover:bg-puzzle-purple/10"
            >
              Levels
            </Button>
            <Button 
              onClick={() => navigate('/profile')}
              variant="ghost" 
              size="sm"
              className="text-puzzle-purple hover:text-puzzle-purple hover:bg-puzzle-purple/10"
            >
              Profile
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              variant="ghost" 
              size="sm"
              className="text-puzzle-purple hover:text-puzzle-purple hover:bg-puzzle-purple/10"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
