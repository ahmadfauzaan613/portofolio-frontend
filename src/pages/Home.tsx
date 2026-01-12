import { Phone } from 'lucide-react'
import ImgHome from '../assets/images/homefoto.jpg'
import { Button } from '../components/ui/button'
export default function Home() {
  return (
    <div>
      <div>
        <h1 className="text-8xl uppercase tracking-wide">front end developer</h1>
        <div className="bg-black w-full h-[45vh] my-8 relative overflow-hidden">
          <img
            src={ImgHome}
            alt="Gambar dari Pinterest"
            className="w-full h-full object-cover object-[center_30%]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-5">
        <p className="text-justify">
          I am a Full Stack Developer with a strong focus on frontend development, bringing nearly 4
          years of professional experience in building modern web applications using React,
          TypeScript, and Next.js. Alongside frontend development, I contribute to backend
          development using Node.js, Laravel, and Golang. I have a solid foundation in UI/UX design,
          utilizing tools such as Figma and Tailwind CSS to deliver responsive and user-friendly
          interfaces.
        </p>
        <div className="flex items-start justify-end gap-x-3">
          <Button variant="outline" className="border cursor-pointer rounded-full w-9">
            <Phone />
          </Button>
          <Button variant="outline" className="border cursor-pointer rounded-full w-9">
            <Phone />
          </Button>
          <Button variant="outline" className="border cursor-pointer rounded-full w-9">
            <Phone />
          </Button>
          <Button variant="outline" className="border cursor-pointer rounded-full w-9">
            <Phone />
          </Button>
          <Button variant="outline" className="border cursor-pointer rounded-full w-9">
            <Phone />
          </Button>
        </div>
      </div>
    </div>
  )
}
