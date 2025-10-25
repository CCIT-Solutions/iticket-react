import Image from "next/image";

function Lock({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl  transition ${className}`}
    >
      <Image
        src="/media/icons/lock.png"
        alt="Lock Icon"
        width={20}
        height={20}
        className="object-contain"
      />
    </div>
  );
}

export default Lock;
