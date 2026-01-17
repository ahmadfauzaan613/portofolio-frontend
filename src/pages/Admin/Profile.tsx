import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'

export default function Profile() {
  const [links, setLinks] = useState([{ type: '', value: '' }])

  const addLink = () => {
    setLinks([...links, { type: '', value: '' }])
  }

  const removeLink = (index: number) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index))
    }
  }
  return (
    <div>
      <h1 className="text-5xl uppercase tracking-wide">Profile</h1>
      <div className="mt-10 space-y-5">
        <div>
          <Label htmlFor="role" className="mb-3">
            Role
          </Label>
          <Input name="role" id="role" placeholder="Role" className="h-12" />
        </div>
        <div>
          <Label htmlFor="about" className="mb-3">
            About
          </Label>
          <Textarea placeholder="Type your message here." cols={12} />
        </div>
        <div className="flex items-center justify-between my-10">
          <h1 className="text-2xl uppercase tracking-wide">Link</h1>
          <Button onClick={addLink} className="border cursor-pointer" size="lg">
            Add Link
          </Button>
        </div>
        <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {links.map((link, index) => (
            <div key={index} className="flex gap-4 items-start border-b pb-6 last:border-0">
              <div className="flex-1 space-y-3">
                <Input placeholder="Type" defaultValue={link.type} className="h-10" />
                <Input placeholder="Value" defaultValue={link.value} className="h-10" />
              </div>

              {links.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLink(index)}
                  className="text-red-500 hover:bg-red-50 cursor-pointer mt-1"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
