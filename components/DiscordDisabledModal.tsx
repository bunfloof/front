"use client";

import { useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiscordDisabledModalProps {
  children: React.ReactNode;
}

export function DiscordDisabledModal({ children }: DiscordDisabledModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-[50%] left-[50%] z-50 w-full max-w-sm translate-x-[-50%] translate-y-[-50%]",
            "rounded-xl border border-[#5865F2]/20 bg-[#0c0e14] p-6 shadow-2xl shadow-[#5865F2]/5",
            "duration-200 outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#5865F2]/10">
              <svg
                viewBox="0 0 16 16"
                className="w-7 h-7 text-[#5865F2]"
                fill="currentColor"
              >
                <path d="M13.538 2.997A13.092 13.092 0 0 0 10.285 2a.07.07 0 0 0-.054.023c-.137.247-.297.57-.404.817a12.456 12.456 0 0 0-3.657 0 7.468 7.468 0 0 0-.411-.817C5.75 2.008 5.729 2 5.705 2a13.192 13.192 0 0 0-3.253.997c-.008 0-.015.008-.023.015C.357 6.064-.215 9.033.067 11.972c0 .015.008.03.023.038 1.371.99 2.69 1.59 3.993 1.987.022.007.045 0 .053-.015.305-.412.579-.847.815-1.305.015-.03 0-.06-.03-.067a9.446 9.446 0 0 1-1.25-.585c-.03-.015-.03-.06-.008-.083.084-.06.168-.127.252-.187a.048.048 0 0 1 .053-.008c2.621 1.178 5.448 1.178 8.039 0a.048.048 0 0 1 .053.008c.084.067.167.127.251.195.03.022.03.067-.007.082-.396.233-.816.42-1.25.585-.03.008-.038.045-.03.068.244.457.518.892.815 1.304.023.008.046.015.069.008a13.266 13.266 0 0 0 4-1.987.041.041 0 0 0 .023-.038c.335-3.396-.557-6.343-2.362-8.96-.008-.007-.016-.015-.031-.015Zm-8.19 7.183c-.785 0-1.44-.712-1.44-1.59 0-.876.64-1.589 1.44-1.589.807 0 1.447.72 1.44 1.59 0 .877-.64 1.59-1.44 1.59Zm5.31 0c-.785 0-1.44-.712-1.44-1.59 0-.876.64-1.589 1.44-1.589.808 0 1.448.72 1.44 1.59 0 .877-.632 1.59-1.44 1.59Z" />
              </svg>
            </div>

            <DialogPrimitive.Title className="text-lg font-semibold text-white">
              Discord Server Unavailable
            </DialogPrimitive.Title>

            <DialogPrimitive.Description className="text-sm text-gray-400 leading-relaxed">
              Due to constant raids, extreme toxicity, and abuse, we've
              temporarily unlinked our Discord server from our main website to
              protect our community. Invites have not been disabled, so you can
              still join the server if you look hard enough to find an invite.
              Private Discord support is available in the support section of our
              panel.
            </DialogPrimitive.Description>

            <button
              onClick={() => setOpen(false)}
              className="mt-2 w-full rounded-lg bg-[#5865F2] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-[#5865F2]/50 focus:ring-offset-2 focus:ring-offset-[#0c0e14] cursor-pointer"
            >
              Got it
            </button>
          </div>

          <DialogPrimitive.Close className="absolute top-3 right-3 rounded-md p-1 text-gray-500 transition-colors hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5865F2]/50 cursor-pointer">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
