import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const DialogBox = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Sign In Required
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            You need to be logged in to access Messages. Please log in or register to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-6 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-md cursor-pointer"
            onClick={() => {
              onClose();
              navigate("/register");
            }}
          >
            Register
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;