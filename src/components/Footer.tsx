export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1A1A1A] border-t border-white/[0.06] py-6 px-6 md:px-12">
      <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[#4A4A4A] text-xs uppercase tracking-[0.1em]">
          &copy; {new Date().getFullYear()} TRANQUIL BY GLIMS
        </span>

        <div className="flex items-center gap-8">
          <a
            href="https://instagram.com/tranquilbyglims"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A4A4A] text-xs uppercase tracking-[0.1em] hover:text-[#8A8A8A] transition-colors duration-300"
            data-hover
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com/@tranquilbyglims"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A4A4A] text-xs uppercase tracking-[0.1em] hover:text-[#8A8A8A] transition-colors duration-300"
            data-hover
          >
            TikTok
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="text-[#4A4A4A] text-xs uppercase tracking-[0.1em] hover:text-[#8A8A8A] transition-colors duration-300"
          data-hover
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
}
