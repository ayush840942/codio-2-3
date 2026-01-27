
// Export the toast component and useToast hook from sonner
import { toast } from "sonner";

// Create a compatible interface that works with our existing code
export { toast };
export const useToast = () => {
  return {
    toast,
    toasts: [] // This is needed for compatibility with the old useToast hook
  };
};
