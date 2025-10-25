import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/CustomDialog";
import Image from "next/image";
import Translate from "@/components/shared/Translate";

interface SuccessProps {
  showSuccessModal: boolean;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
}
function SuccessModal({
  showSuccessModal,
  setShowSuccessModal,
  handleCloseModal,
}: SuccessProps) {
  return (
    <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
      <DialogContent className="px-20 pt-20 pb-10">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-primary">
            <Translate text="success.title" />
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-600 mt-2">
            <Translate text="success.description" />
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          {/* Success Icon - Vinyl Record with Check */}
          <div className="flex justify-center mb-8">
            <Image
              src="/media/icons/success.webp"
              alt="Success Icon"
              height={150}
              width={150}
            />
          </div>

          {/* Action Button */}
          <Button
            onClick={handleCloseModal}
            className="w-full bg-primary hover:bg-neutral-800 text-white max-w-[250px]"
          >
            <Translate text="success.button" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default SuccessModal;
