import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from '@/components/ui/empty'

type SettingsWorkspaceProps = {
  onBack: () => void
}

export function SettingsWorkspace({ onBack }: SettingsWorkspaceProps): React.JSX.Element {
  return (
    <Empty className="min-h-[calc(100vh-13rem)] rounded-[1.75rem] border border-border/70 bg-card/45">
      <EmptyHeader>
        <EmptyTitle className="text-xl">Settings</EmptyTitle>
        <EmptyDescription className="max-w-md text-sm">
          Settings will live here. For now, this page is a placeholder while we rebuild the rest of
          the preferences surface.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="max-w-md gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back to Home
        </Button>
      </EmptyContent>
    </Empty>
  )
}
