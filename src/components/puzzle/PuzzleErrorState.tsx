
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

type PuzzleErrorStateProps = {
  title: string;
  message?: string;
  buttonText?: string;
  buttonAction?: () => void;
};

const PuzzleErrorState: React.FC<PuzzleErrorStateProps> = ({
  title,
  message,
  buttonText = "Back to Level Map",
  buttonAction
}) => {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction();
    } else {
      navigate('/levels');
    }
  };

  return (
    <div className="min-h-screen bg-puzzle-light">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-red-100 p-3">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        {message && <p className="mb-6 text-gray-600 max-w-md mx-auto">{message}</p>}
        <Button onClick={handleButtonClick} size="lg" className="mt-2">{buttonText}</Button>
      </div>
    </div>
  );
};

export default PuzzleErrorState;
