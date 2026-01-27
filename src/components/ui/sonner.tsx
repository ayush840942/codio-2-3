
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      expand={true}
      richColors={true}
      closeButton={true}
      offset={24}
      visibleToasts={3}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-puzzle-purple/20 group-[.toaster]:shadow-xl group-[.toaster]:backdrop-blur-sm android-card android-notification",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm android-text-select",
          actionButton:
            "group-[.toast]:bg-puzzle-purple group-[.toast]:text-white group-[.toast]:hover:bg-puzzle-purple/90 mobile-button android-haptic",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:hover:bg-muted/80 mobile-button android-haptic",
          success: "group-[.toast]:border-green-200 group-[.toast]:bg-green-50/90",
          error: "group-[.toast]:border-red-200 group-[.toast]:bg-red-50/90",
          warning: "group-[.toast]:border-yellow-200 group-[.toast]:bg-yellow-50/90",
          info: "group-[.toast]:border-blue-200 group-[.toast]:bg-blue-50/90",
          closeButton: "group-[.toast]:border-0 group-[.toast]:bg-transparent group-[.toast]:text-muted-foreground group-[.toast]:hover:bg-muted/50 mobile-button android-haptic",
        },
        duration: 4000,
        style: {
          borderRadius: '12px',
          padding: '16px',
          fontSize: '16px',
          fontWeight: '500',
          minHeight: '60px',
          maxWidth: 'calc(100vw - 32px)',
          width: 'auto',
          minWidth: '280px',
          marginTop: 'max(env(safe-area-inset-top), 8px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
