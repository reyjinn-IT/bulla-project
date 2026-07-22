import { useOnScreen } from '../hooks/useOnScreen'
import './SplitText.css'

interface SplitTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

/**
 * Letter-by-letter reveal, in the spirit of reactbits.dev's "SplitText".
 * Each character fades and rises into place once it enters the viewport.
 */
export default function SplitText({ text, as = 'h2', className = '', delay = 0 }: SplitTextProps) {
  const { ref, visible } = useOnScreen<HTMLDivElement>(0.4)
  const Tag = as
  const words = text.split(' ')

  return (
    <div ref={ref} className={`split-text ${className}`}>
      <Tag>
        {words.map((word, wi) => (
          <span className="split-text__word" key={wi}>
            {word.split('').map((char, ci) => {
              const index = words.slice(0, wi).join(' ').length + ci + wi
              return (
                <span
                  key={ci}
                  className="split-text__char"
                  style={{
                    transitionDelay: `${delay + index * 28}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(0.6em)',
                  }}
                >
                  {char}
                </span>
              )
            })}
            {wi !== words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </Tag>
    </div>
  )
}
