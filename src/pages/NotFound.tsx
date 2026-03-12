
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 text-center bg-background">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">Page not found</p>
            <Button onClick={() => navigate("/")}>
                Return Home
            </Button>
        </div>
    );
};

export default NotFound;
