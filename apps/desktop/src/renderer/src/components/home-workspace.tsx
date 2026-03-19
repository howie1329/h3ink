import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from '@/components/ui/empty'

type HomeWorkspaceProps = {
  onCreateNote: () => void
  onOpenFile: () => void
}

export function HomeWorkspace({ onCreateNote, onOpenFile }: HomeWorkspaceProps): React.JSX.Element {
  return (
    <Empty className="min-h-[calc(100vh-13rem)] rounded-[1.75rem] border border-border/70 bg-card/45">
      <EmptyHeader>
        <EmptyTitle className="text-xl">Welcome to H3 Ink</EmptyTitle>
        <EmptyDescription className="max-w-md text-sm">
          Start with a fresh note or reopen something from the sidebar. The app now opens to a calm
          empty state instead of dropping you into a blank document.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="max-w-md gap-3">
        <Button type="button" onClick={onCreateNote}>
          New Note
        </Button>
        <Button type="button" variant="outline" onClick={onOpenFile}>
          Open Markdown File
        </Button>
      </EmptyContent>
    </Empty>
  )
}
