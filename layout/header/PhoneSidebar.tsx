import { memo, useState } from "react";
import HeaderLinks from "./HeaderLinks";
import Logo from "@/components/shared/Logo";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/CustomDialog";

function PhoneSidebar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((old) => !old);

  return (
    <div className="flex items-center md:hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="cursor-pointer"
          onClick={toggle}
          aria-label="Menu"
          
        >
          <RxHamburgerMenu size={25} />
        </DialogTrigger>
        <DialogContent className="md:hidden min-h-[60svh] bg-white/80">
          <DialogHeader className="items-center">
            <Logo className="w-60 h-24" />
            <DialogTitle />
          </DialogHeader>
          <HeaderLinks phone={true} toggle={toggle} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default memo(PhoneSidebar);
