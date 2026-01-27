import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const MobileScrollArea = React.forwardRef<HTMLDivElement, MobileScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const element = scrollRef.current
      if (!element) return

      // Force immediate scroll activation
      element.style.transform = 'translateZ(0)'
      element.style.webkitTransform = 'translateZ(0)'
      
      // Ensure touch events are properly handled
      const handleTouchStart = (e: TouchEvent) => {
        e.stopPropagation()
      }
      
      const handleTouchMove = (e: TouchEvent) => {
        e.stopPropagation()
      }

      element.addEventListener('touchstart', handleTouchStart, { passive: true })
      element.addEventListener('touchmove', handleTouchMove, { passive: true })

      return () => {
        element.removeEventListener('touchstart', handleTouchStart)
        element.removeEventListener('touchmove', handleTouchMove)
      }
    }, [])

    return (
      <div
        ref={(node) => {
          if (node) {
            scrollRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }
        }}
        className={cn(
          "relative w-full h-full overflow-auto",
          "overscroll-contain",
          "scroll-smooth",
          "[-webkit-overflow-scrolling:touch]",
          "touch-pan-y",
          // Hide scrollbars completely
          "scrollbar-none",
          "[&::-webkit-scrollbar]:hidden",
          "[-ms-overflow-style:none]",
          "[scrollbar-width:none]",
          "will-change-scroll",
          "transform-gpu",
          className
        )}
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          transform: 'translateZ(0)',
          willChange: 'scroll-position',
          overflowX: 'hidden',
          WebkitTransform: 'translateZ(0)',
          MozTransform: 'translateZ(0)',
          msTransform: 'translateZ(0)',
          OTransform: 'translateZ(0)',
          // Hide scrollbars with CSS
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties & { scrollbarWidth?: string; msOverflowStyle?: string }}
        {...props}
      >
        <div 
          className="w-full min-h-full"
          style={{
            WebkitUserSelect: 'text',
            MozUserSelect: 'text',
            msUserSelect: 'text',
            userSelect: 'text'
          } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    )
  }
)
MobileScrollArea.displayName = "MobileScrollArea"

export { MobileScrollArea }