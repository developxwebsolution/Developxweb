"use client";

export default function WhatsAppButton() {
  const phoneNumber = "919625148434";

  const message =
    "Hello, I’m interested in your services. I’d like to discuss my requirements and get more information. Please let me know how we can proceed. Thank you.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-[9999] group"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

      {/* Glow */}
      <span className="absolute inset-[-5px] rounded-full bg-[#25D366]/20 blur-md transition-all duration-300 group-hover:bg-[#25D366]/40" />

      {/* WhatsApp Button */}
      <span
        className="
          relative flex h-[56px] w-[56px]
          items-center justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-[0_8px_25px_rgba(37,211,102,0.35)]
          transition-all duration-300
          group-hover:scale-110
          group-hover:shadow-[0_10px_35px_rgba(37,211,102,0.55)]
        "
      >
        {/* Proper WhatsApp Logo */}
        <svg
          viewBox="0 0 32 32"
          className="h-[30px] w-[30px] fill-white"
          aria-hidden="true"
        >
          <path d="M19.11 17.41c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.11 2.84c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.45 1.54.58.65.21 1.24.18 1.7.11.52-.08 1.59-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />

          <path d="M16.01 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.39 1.63 6.24L3.1 28.8l6.72-1.7a12.75 12.75 0 0 0 6.19 1.59h.01c7.06 0 12.8-5.74 12.8-12.8S23.08 3.2 16.01 3.2zm0 23.37h-.01a10.58 10.58 0 0 1-5.39-1.47l-.39-.23-3.99 1.01 1.06-3.89-.25-.4a10.57 10.57 0 0 1-1.62-5.59c0-5.83 4.75-10.58 10.59-10.58 2.83 0 5.49 1.1 7.49 3.1a10.54 10.54 0 0 1 3.1 7.48c0 5.83-4.75 10.57-10.59 10.57z" />
        </svg>

        {/* Online Indicator */}
        <span
          className="
            absolute right-0.5 top-0.5
            h-3.5 w-3.5
            rounded-full
            border-2 border-white
            bg-[#16A34A]
          "
        />
      </span>

      {/* Hover Tooltip */}
      <span
        className="
          pointer-events-none
          absolute left-[calc(100%+12px)] top-1/2
          -translate-y-1/2 translate-x-2
          whitespace-nowrap
          rounded-lg
          bg-neutral-900
          px-3 py-2
          text-xs font-medium text-white
          opacity-0
          shadow-xl
          transition-all duration-300
          group-hover:translate-x-0
          group-hover:opacity-100
        "
      >
        Chat with us
      </span>
    </a>
  );
}