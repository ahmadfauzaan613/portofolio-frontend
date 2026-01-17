import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import type { PopUpProps } from '../type'

export default function PopUp({ title, children, open, setOpen }: PopUpProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg bg-black text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase text-white">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
