import Hero from './components/Hero'
import Letter from './components/Letter'
import Encourage from './components/Encourage'
import Gallery from './components/Gallery'
import Signature from './components/Signature'
import Footer from './components/Footer'
import SectionNav from './components/SectionNav'
import MusicPlayer from './components/MusicPlayer'
import { useLenis } from './lib/useLenis'

export default function App() {
  useLenis()

  return (
    <>
      <SectionNav />
      <MusicPlayer />
      <main>
        <Hero />
        <Letter />
        <Encourage />
        <Gallery />
        <Signature />
        <Footer />
      </main>
    </>
  )
}