export default function Hero() {
  return (
    <div className="text-center mb-20">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Hi, I&apos;m Sun
      </h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
          1x Frontend Developer
        </p>
        <p className="text-md text-gray-700 dark:text-gray-400 mb-8">
          Caring about efficient and accessible web apps.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <a
          href="#projects"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg dark:bg-blue-600 hover:bg-blue-700 transition"
        >
          View My Work
        </a>
        <a
          href="/contact"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-100 transition"
        >
          Get In Touch
        </a>
      </div>
    </div>
  )
}
