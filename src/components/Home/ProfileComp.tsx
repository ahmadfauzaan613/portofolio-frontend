import { motion } from 'framer-motion'
import { FileText, Linkedin, Mail, Phone } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip'
import { cn } from '../../lib/utils'
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

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <div className="px-4">
      {/* HEADER */}
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl uppercase tracking-wide leading-none">
          {role}
        </h1>

        {/* HERO IMAGE */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-10 h-[30vh] sm:h-[40vh] lg:h-[45vh] overflow-hidden"
        >
          <img
            src={'../../../public/images/homefoto.JPG'}
            alt="Hero visual"
            className="w-full h-full object-cover object-[center_30%]"
          />
          {/* overlay biar teks kebaca */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        {/* ABOUT */}
        <p className="text-sm sm:text-base leading-relaxed text-justify max-w-prose">{about}</p>

        {/* LINKS */}
        <div className="flex md:justify-end gap-3">
          {dataLink.map((item: ILinkResponse, i: number) => {
            const config = linkConfig[item.type]
            if (!config) return null
            const Icon = config.icon

            return (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => config.action(item.value)}
                      className={cn(
                        'rounded-full w-10 h-10 p-0',
                        'transition-all duration-300',
                        'hover:-translate-y-1 hover:shadow-md'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white text-xs">
                    <p className="uppercase tracking-widest">{item.type}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
