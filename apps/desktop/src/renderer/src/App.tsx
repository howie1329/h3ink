import { Badge } from '@h3ink/ui/components/badge'
import { Button } from '@h3ink/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@h3ink/ui/components/card'
import { Input } from '@h3ink/ui/components/input'
import { Separator } from '@h3ink/ui/components/separator'
import { Textarea } from '@h3ink/ui/components/textarea'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-6 py-10 text-[#f4efe3]">
      <Card className="w-full max-w-2xl border-white/10 bg-[#121318]/92 backdrop-blur-xl">
        <CardHeader className="gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Badge className="border-white/10 bg-white/6 text-[#f4efe3]">Shared UI proof</Badge>
              <CardTitle className="mt-4 text-3xl text-[#f4efe3]">
                Desktop renderer now uses the shared package.
              </CardTitle>
            </div>
            <Badge variant="outline" className="border-white/10 text-white/60">
              electron-vite
            </Badge>
          </div>
          <CardDescription className="max-w-xl text-[#b5b1a6]">
            This is the smallest proof point for the monorepo UI foundation: shared tokens, shared
            primitives, and app-specific composition still owned by the desktop renderer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Note title
              </label>
              <Input
                defaultValue="Drafting without clutter"
                className="border-white/10 bg-white/5 text-[#f4efe3] placeholder:text-white/35"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Surface
              </label>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-white/10 bg-white/6 text-[#f4efe3]">Button</Badge>
                <Badge className="border-white/10 bg-white/6 text-[#f4efe3]">Input</Badge>
                <Badge className="border-white/10 bg-white/6 text-[#f4efe3]">Textarea</Badge>
              </div>
            </div>
          </div>
          <Separator className="bg-white/10" />
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              Editor preview
            </label>
            <Textarea
              defaultValue={
                '# H3 Ink\n\nThe shared package should own stable primitives while the desktop shell remains local.'
              }
              className="min-h-36 border-white/10 bg-white/5 text-[#f4efe3] placeholder:text-white/35"
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm leading-6 text-[#9d9a92]">
            App-specific renderer composition, shared foundation underneath.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-white/10 bg-white/4 text-[#f4efe3] hover:bg-white/8"
              onClick={ipcHandle}
            >
              Send IPC
            </Button>
            <Button className="bg-[#f2efe8] text-[#141519] hover:bg-[#e5decf]">
              Continue desktop UI
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

export default App
