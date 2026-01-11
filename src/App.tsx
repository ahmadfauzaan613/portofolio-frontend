import Navbar from './components/Navbar'

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-8xl uppercase tracking-wide">
          front end <br /> developer
        </h1>
        <p className="text-right">
          I am a Full Stack Developer with a strong focus on frontend development, bringing nearly 4
          years of professional experience in building modern web applications using React,
          TypeScript, and Next.js. Alongside frontend development, I contribute to backend
          development using Node.js, Laravel, and Golang. I have a solid foundation in UI/UX design,
          utilizing tools such as Figma and Tailwind CSS to deliver responsive and user-friendly
          interfaces.
        </p>
      </div>
    </div>
  )
}
