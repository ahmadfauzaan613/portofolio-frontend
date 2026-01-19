import { FileText, Linkedin, Mail, Phone } from 'lucide-react'
import ImgHome from '../../assets/images/homefoto.jpg'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip'
import type { ILinkResponse, IPropsProfile } from '../../type'
import { Button } from '../ui/button'

export default function ProfileComp({ role, about, dataLink }: IPropsProfile) {
  const linkConfig: Record<string, { icon: React.ElementType; action: (url: string) => void }> = {
    WhatsApp: {
      icon: Phone,
      action: url => window.open(url, '_blank'),
    },
    Email: {
      icon: Mail,
      action: url => window.location.assign(url),
    },
    Resume: {
      icon: FileText,
      action: url => window.open(url, '_blank'),
    },
    Linkedin: {
      icon: Linkedin,
      action: url => window.open(url, '_blank'),
    },
  }

  return (
    <div>
      <div>
        <h1 className="text-8xl uppercase tracking-wide">{role}</h1>
        <div className="bg-black w-full h-[45vh] my-8 relative overflow-hidden">
          <img
            src={ImgHome}
            alt="Gambar dari Pinterest"
            className="w-full h-full object-cover object-[center_30%]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-5">
        <p className="text-justify">{about}</p>
        <div className="flex items-start justify-end gap-x-3">
          {dataLink.map((item: ILinkResponse, i: number) => {
            const config = linkConfig[item.type]
            if (!config) return null
            const Icon = config.icon
            return (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      key={i}
                      variant="outline"
                      className="border cursor-pointer rounded-full w-9 h-9 p-0"
                      onClick={() => config.action(item.value)}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p>{item.type}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </div>
    </div>
  )
}
