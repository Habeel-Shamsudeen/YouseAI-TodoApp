import Image from 'next/image'

export default function Quote() {
  return (
    <div className="hidden md:flex flex-col justify-center items-start h-full bg-slate-100 w-full p-8 shadow-lg">
      <div className="mb-8 w-full flex justify-center">
        <Image
          src="/TodoImage.jpg"
          alt="Inspirational image"
          width={500}
          height={450}
          className="rounded-lg shadow-md"
        />
      </div>
      <blockquote className="space-y-2">
        <p className="text-2xl font-bold text-slate-800 leading-tight">
          "The secret of getting ahead is getting started."
        </p>
        <footer className="mt-4">
          <cite className="flex flex-col not-italic">
            <span className="text-lg font-semibold text-slate-700">Mark Twain</span>
            <span className="text-sm text-slate-500">Author & Humorist</span>
          </cite>
        </footer>
      </blockquote>
    </div>
  )
}