import { motion } from "framer-motion";
import { FileText, Mail, Phone, GitGraph, Camera } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { cn } from "../../lib/utils";
import type { ILinkResponse, IPropsProfile } from "../../type";
import { Button } from "../ui/button";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ProfileComp({ role, about, dataLink }: IPropsProfile) {
  const linkConfig: Record<
    string,
    { icon: React.ElementType; action: (url: string) => void }
  > = {
    whatsapp: {
      icon: Phone,
      action: (url) => window.open(url, "_blank"),
    },
    email: {
      icon: Mail,
      action: (url) =>
        window.location.assign(
          url.startsWith("mailto:") ? url : `mailto:${url}`,
        ),
    },
    resume: {
      icon: FileText,
      action: (url) => window.open(url, "_blank"),
    },
    linkedin: {
      icon: Linkedin,
      action: (url) => window.open(url, "_blank"),
    },
    github: {
      icon: GitGraph,
      action: (url) => window.open(url, "_blank"),
    },
    instagram: {
      icon: Camera,
      action: (url) => window.open(url, "_blank"),
    },
  };

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
  };

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
          className="relative my-6 h-[30vh] sm:h-[40vh] lg:h-[45vh] overflow-hidden"
        >
          <img
            src={"/images/homefoto.JPG"}
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
        whileInView="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        {/* ABOUT */}
        <p className="text-sm sm:text-base leading-relaxed text-justify max-w-prose">
          {about}
        </p>

        {/* LINKS */}
        <div className="flex md:justify-end gap-3">
          {dataLink.map((item: ILinkResponse, i: number) => {
            const normalizedType = item.type.toLowerCase().trim();
            const config = linkConfig[normalizedType];
            if (!config) return null;
            const Icon = config.icon;

            return (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => config.action(item.value)}
                      className={cn(
                        "rounded-full w-10 h-10 p-0",
                        "transition-all duration-300",
                        "hover:-translate-y-1 hover:shadow-md",
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
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
