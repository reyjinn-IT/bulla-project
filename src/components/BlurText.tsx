import { useOnScreen } from '../../useOnScreen'
import './BlurText.css'

interface BlurTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

/**
 * Word-by-word blur-to-focus reveal, in the spirit of reactbits.dev's "BlurText".
 * Each word starts blurred and translated, then sharpens into place.
 */
export default function BlurText({ text, as = 'h2', className = '', delay = 0 }: BlurTextProps) {
  const { ref, visible } = useOnScreen<HTMLDivElement>(0.4)
  const Tag = as
  const words = text.split(' ')

  return (
    <div ref={ref} className={`blur-text ${className}`}>
      <Tag>
        {words.map((word, i) => (
          <span
            key={i}
            className="blur-text__word"
            style={{
              transitionDelay: `${delay + i * 90}ms`,
              opacity: visible ? 1 : 0,
              filter: visible ? 'blur(0px)' : 'blur(10px)',
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
            }}
          >
            {word}
            {i !== words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </Tag>
    </div>
  )
}
