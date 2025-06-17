"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Heart, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useState } from "react";

import { CountdownTimer } from "@/components/countdown-timer";
import { RsvpForm } from "@/components/rsvp-form";
// import { Gallery } from "@/components/gallery";
// import { VenueMap } from "@/components/venue-map";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedText } from "@/components/animated-text";
import { BankAccountCard } from "@/components/bank-account-card";
import { InvitationPopup } from "@/components/invitation-popup";
import { MusicPlayer } from "@/components/music-player";
import { MessageWall } from "@/components/message-wall";
import { MessageProvider } from "@/contexts/message-context";

// Import animations
import "@/styles/animations.css";

// Client component that uses searchParams
function WeddingContent() {
  // Get the guest name from the query string
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");

  return <WeddingInvitationContent guestName={guestName} />;
}

// Main component that wraps the client component in Suspense
export default function WeddingInvitation() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse">Loading...</div></div>}>
      <WeddingContent />
    </Suspense>
  );
}

// Component that contains all the wedding invitation content
function WeddingInvitationContent({ guestName }: { guestName: string | null }) {

  // State for controlling animations and music
  const [popupClosed, setPopupClosed] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  // Handle popup close
  const handlePopupClose = () => {
    setPopupClosed(true);
    // Set a slight delay before playing music to ensure smooth transition
    setTimeout(() => {
      setPlayMusic(true);
    }, 300);
  };

  // Handle music toggle from anywhere in the app
  const handleMusicToggle = (playing: boolean) => {
    setPlayMusic(playing);
  };

  // Wedding details - customize these
  const weddingDetails = {
    brideFirstName: "Zulfa",
    brideLastName: "Ayyuhan",
    brideFullName: "Choirunnissa Zulfa Ayyuhan",
    brideParents: "Bapak Harun Rosit & Ibu Endra Rochimiyati",
    groomFirstName: "Firly",
    groomLastName: "Pomolango", 
    groomFullName: "Roby Firly A.S Pomolango",
    groomParents: "Bapak Suyoto & Ibu Budhi Hendi Astuti",
    akadDate: "2025-04-18T08:00:00", // Friday, April 18, 2025
    receptionDate: "2025-06-28T10:00:00", // Saturday, June 28, 2025
    akadVenue: "Masjid Baitul Jannah",
    akadAddress: "Kauman, RT 02/ RW 02, SELOPAMPANG, TEMANGGUNG",
    receptionPutriVenue: "Kediaman Mempelai Putri",
    receptionPutriAddress: "Kauman, RT 02/ RW 02, SELOPAMPANG, TEMANGGUNG",
    receptionPutraVenue: "Kediaman Mempelai Putra", 
    receptionPutraAddress: "Bulan, RT 01/ RW 01, SELOPAMPANG, TEMANGGUNG",
    receptionPutriMapLink: "https://maps.app.goo.gl/RdFke57mkHg6Fp1g9",
    receptionPutraMapLink: "https://maps.app.goo.gl/VVbSjgRG6pJrVKrR9",
    rsvpTime: "2025-04-10T08:00:00",
  };

  return (
    <MessageProvider>
      {/* Invitation Popup - Outside the main content so it's always visible */}
      <InvitationPopup
        guestName={guestName || undefined}
        onClose={handlePopupClose}
      />

      {/* Music Player - Outside the main content so it's always accessible */}
      <MusicPlayer
        audioSrc="/music/music.mp3"
        startPlaying={playMusic}
        onStateChange={handleMusicToggle}
      />

      <main
        className={`flex min-h-screen flex-col items-center ${
          popupClosed ? "animate-fade-in" : "opacity-0"
        }`}
      >
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/FOTO-1.png"
              alt="Wedding background"
              fill
              className="object-cover brightness-50 filter grayscale"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
          <div className="relative z-10 text-center text-white space-y-6 px-4 max-w-3xl mx-auto">
            <div
              className="mb-4 opacity-0 animate-fadeIn"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <Image
                src="/ring.png"
                alt="Wedding rings"
                width={60}
                height={60}
                className="mx-auto mb-6 opacity-80 filter invert brightness-200"
              />
            </div>

            <AnimatedText
              text={`${weddingDetails.brideFirstName} & ${weddingDetails.groomFirstName}`}
              className="text-5xl md:text-7xl font-serif font-light tracking-wide"
              delay={0.5}
            />

            <AnimatedText
              text="We're getting married"
              className="text-xl md:text-2xl font-light tracking-widest uppercase"
              delay={1.2}
              staggerChildren={0.03}
            />

            <div
              className="w-32 h-px bg-white/70 mx-auto my-8 opacity-0 animate-fadeIn"
              style={{ animationDelay: "1.8s", animationFillMode: "forwards" }}
            ></div>

            <AnimatedText
              text={new Date(weddingDetails.akadDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              className="text-lg md:text-xl font-light"
              delay={2}
            />

            <div
              className="pt-8 opacity-0 animate-fadeIn"
              style={{ animationDelay: "2.3s", animationFillMode: "forwards" }}
            >
              <CountdownTimer targetDate={weddingDetails.akadDate} />
            </div>

            <div
              className="pt-10 opacity-0 animate-fadeIn"
              style={{ animationDelay: "2.6s", animationFillMode: "forwards" }}
            >
              <Link
                href="#our-story"
                className="inline-flex items-center justify-center border border-white/60 rounded-none text-sm font-light tracking-widest uppercase transition-colors hover:bg-white/10 px-10 py-3"
              >
                Our Story
              </Link>
            </div>
          </div>
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0 animate-fadeIn"
            style={{ animationDelay: "3s", animationFillMode: "forwards" }}
          >
            <Link
              href="#our-story"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Quranic Verse Section */}
        <AnimatedSection
          className="py-24 w-full bg-gray-50 text-center px-4 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-10 border border-gray-100 shadow-sm">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic mb-6 text-center">
                  "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
                </p>
                <p className="text-sm text-gray-600 font-medium">Q.S Ar-Rum : 21</p>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Bride and Groom Profiles Section */}
        <AnimatedSection
          className="py-24 w-full bg-white text-center px-4 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Bride Profile */}
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.7 }}
              >
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="absolute -inset-2 border border-gray-200 -rotate-3"></div>
                    <Image
                      src="/FOTO-2.png"
                      alt="Bride"
                      width={300}
                      height={400}
                      className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-lg mx-auto"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif mb-2">{weddingDetails.brideFullName}</h3>
                  <div className="w-16 h-px bg-gray-400 mx-auto mb-4"></div>
                  <p className="text-gray-700 mb-2">Putri Pertama dari</p>
                  <p className="text-gray-700 font-medium">{weddingDetails.brideParents}</p>
                  <p className="text-sm text-gray-500 mt-3">Kauman Rt 02-Rw 02, Selopampang, Temanggung</p>
                </div>
              </AnimatedSection>

              {/* Groom Profile */}
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.7 }}
              >
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="absolute -inset-2 border border-gray-200 rotate-3"></div>
                    <Image
                      src="/FOTO-3.png"
                      alt="Groom"
                      width={300}
                      height={400}
                      className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-lg mx-auto"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif mb-2">{weddingDetails.groomFullName}</h3>
                  <div className="w-16 h-px bg-gray-400 mx-auto mb-4"></div>
                  <p className="text-gray-700 mb-2">Putra Kelima dari</p>
                  <p className="text-gray-700 font-medium">{weddingDetails.groomParents}</p>
                  <p className="text-sm text-gray-500 mt-3">Bulan Rt 01-Rw 01, Bulan, Selopampang, Temanggung</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Wedding Announcement Section */}
        <AnimatedSection
          className="py-24 w-full bg-gray-50 text-center px-4 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 border border-gray-200 rotate-2"></div>
                  <Image
                    src="/FOTO-4.png"
                    alt="Wedding Ceremony"
                    width={500}
                    height={400}
                    className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-lg mx-auto"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white p-10 border border-gray-100 shadow-sm text-left">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    "Alhamdulillah, kami telah melangsungkan akad nikah pada"
                  </p>
                  <h3 className="text-xl md:text-2xl font-medium mb-4 text-center">
                    Jum'at, 18 April 2025
                  </h3>
                  <p className="text-gray-700 mb-2 text-center">{weddingDetails.akadVenue}</p>
                  <p className="text-sm text-gray-500 mb-6 text-center">{weddingDetails.akadAddress}</p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    secara sederhana bersama keluarga."<br/>
                    Kini kami ingin berbagi kebahagiaan melalui acara resepsi.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>

        {/* Reception Details Section */}
        <AnimatedSection
          className="py-24 w-full bg-white text-center px-4 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Reception Details
              </h2>
              <div className="w-24 h-px bg-gray-400 mx-auto"></div>
              <p className="text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
                Sebagai wujud rasa syukur, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara resepsi pernikahan kami yang insyaAllah akan dilaksanakan pada:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Reception Putri */}
              <AnimatedSection
                className="bg-gray-50 p-10 border border-gray-100 shadow-sm"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xl font-medium mb-4">RESEPSI PUTRI</h3>
                <p className="text-lg font-medium mb-2">Sabtu, 28 Juni 2025</p>
                <p className="text-gray-700 mb-4">{weddingDetails.receptionPutriAddress}</p>
                <a 
                  href={weddingDetails.receptionPutriMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-white px-6 py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  LOKASI
                </a>
              </AnimatedSection>

              {/* Reception Putra */}
              <AnimatedSection
                className="bg-gray-50 p-10 border border-gray-100 shadow-sm"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-medium mb-4">RESEPSI PUTRA</h3>
                <p className="text-lg font-medium mb-2">Sabtu, 28 Juni 2025</p>
                <p className="text-gray-700 mb-4">{weddingDetails.receptionPutraAddress}</p>
                <a 
                  href={weddingDetails.receptionPutraMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-white px-6 py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  LOKASI
                </a>
              </AnimatedSection>
            </div>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <p className="text-gray-700 text-lg leading-relaxed">
                Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dalam momen bahagia ini.
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Our Story Section */}
        <AnimatedSection
          id="our-story"
          className="py-24 w-full bg-gray-50 text-center px-4 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute -left-24 top-40 w-48 h-48 rounded-full border border-gray-100 opacity-20"></div>
          <div className="absolute -right-24 bottom-40 w-64 h-64 rounded-full border border-gray-100 opacity-20"></div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Our Story
              </h2>
              <div className="w-24 h-px bg-gray-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 border border-gray-200 -rotate-3"></div>
                  <Image
                    src="/ourStory.png"
                    alt="Couple"
                    width={500}
                    height={500}
                    className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-lg mx-auto"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-left space-y-5"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Perjalanan kami dimulai dari sebuah pertemuan yang tak
                  terduga. Pondok Pesantren. Ya, Saat itu kami masih duduk di
                  bangku SMP. Firly adalah kakak kelas Zulfa , kita tidak pernah
                  menyangka bahwa pertemuan pertama kami di sebuah lomba pidato
                  bahasa Inggris akan menjadi awal dari kisah yang begitu indah.
                  dari sanalah kita mulai saling mengenal.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Meskipun setelah lulus kami sempat berpisah untuk mengejar
                  jalan masing-masing, takdir membawa kami bertemu kembali di
                  awal tahun 2016. Kami mulai menjalin persahabatan yang semakin
                  erat seiring berjalannya waktu. Dari sahabat, kami belajar
                  saling menghargai dan mengerti, hingga akhirnya kami menyadari
                  bahwa ada perasaan yang lebih dari sekadar persahabatan. Tak
                  terasa langkah-langkah kecil yang kami ambil akan membawa kami
                  sejauh ini.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Di hari yang penuh keberkahan ini, kami ingin berbagi
                  kebahagiaan dengan kalian semua. Kami, Firly dan Zulfa, dengan
                  penuh rasa syukur dan cinta, mengundang kalian untuk menjadi
                  bagian dari perjalanan cinta kami.
                </p>
                <p className="text-xl font-serif mt-8 italic">Firly & Zulfa</p>
              </AnimatedSection>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </AnimatedSection>

        {/* Details Section */}
        <AnimatedSection
          className="py-24 w-full bg-white text-center px-4 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute -right-16 bottom-40 w-32 h-32 border border-gray-200 opacity-20 rounded-full"></div>
          <div className="absolute -left-16 top-40 w-32 h-32 border border-gray-200 opacity-20 rounded-full"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Wedding Details
              </h2>
              <div className="w-24 h-px bg-gray-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <AnimatedSection
                className="bg-white p-10 border border-gray-100 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex justify-center mb-6">
                  <Calendar className="h-12 w-12 text-gray-800" />
                </div>
                <h3 className="text-xl font-medium mb-3">The Date</h3>
                <p className="text-gray-700">
                  {new Date(weddingDetails.akadDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </AnimatedSection>

              <AnimatedSection
                className="bg-white p-10 border border-gray-100 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <Clock className="h-12 w-12 text-gray-800" />
                </div>
                <h3 className="text-xl font-medium mb-3">Ceremony</h3>
                <p className="text-gray-700">
                  {new Date(weddingDetails.akadDate).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  Please arrive 30 minutes early
                </p>
              </AnimatedSection>

              <AnimatedSection
                className="bg-white p-10 border border-gray-100 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex justify-center mb-6">
                  <MapPin className="h-12 w-12 text-gray-800" />
                </div>
                <h3 className="text-xl font-medium mb-3">Location</h3>
                <p className="text-gray-700">{weddingDetails.akadVenue}</p>
                <p className="mt-3 text-sm text-gray-500">
                  {weddingDetails.akadAddress}
                </p>
              </AnimatedSection>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </AnimatedSection>

        {/* Gallery Section */}
        {/* <AnimatedSection className="py-20 w-full bg-white text-center px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">Our Moments</h2>
          <Gallery />
        </div>
      </AnimatedSection> */}

        {/* Map Section */}
        <AnimatedSection
          className="py-24 w-full bg-gray-50 text-center px-4 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute -left-16 top-40 w-32 h-32 border border-gray-200 opacity-20 rotate-45"></div>
          <div className="absolute -right-16 bottom-40 w-32 h-32 border border-gray-200 opacity-20 rotate-45"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Venue Location
              </h2>
              <div className="w-24 h-px bg-gray-400 mx-auto"></div>
            </div>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-lg overflow-hidden shadow-lg mb-10 border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3956.799476543086!2d110.1705888313372!3d-7.376357668360877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjInMzQuNiJTIDExMMKwMTAnMTMuMCJF!5e0!3m2!1sen!2sid!4v1743223364279!5m2!1sen!2sid"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing location of ${weddingDetails.akadVenue}`}
                  className="filter grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </AnimatedSection>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-medium mb-4 text-left">
                  Getting There
                </h3>
                <p className="text-gray-700 mb-5 text-left leading-relaxed">
                  {weddingDetails.akadVenue} is located at {weddingDetails.akadAddress}.
                </p>
              </div>
            </AnimatedSection>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </AnimatedSection>

        {/* Gift Section */}
        <AnimatedSection
          className="py-24 w-full bg-gray-50 text-center px-4 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute -left-16 bottom-20 w-32 h-32 border border-gray-200 opacity-20 rotate-45"></div>
          <div className="absolute -right-16 top-20 w-32 h-32 border border-gray-200 opacity-20 rotate-45"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Wedding Gift
              </h2>
              <div className="w-24 h-px bg-gray-400 mx-auto"></div>
            </div>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gray-700 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Your presence at our wedding is the greatest gift of all.
                However, if you wish to honor us with a gift, we have provided
                our account details below.
              </p>
            </AnimatedSection>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <BankAccountCard
                  accountNumber="7181539202"
                  accountName="Choirunnissa Zulfa Ayyuhan"
                  bankLogoSrc="/bsi-logo.png"
                />
                <BankAccountCard
                  accountNumber="1540857527"
                  accountName="Roby Firly A.S Pomolango"
                  bankLogoSrc="/bca-logo.png"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-gray-600 mt-10 text-sm italic">
                Thank you for your love, support, and generosity.
              </p>
            </AnimatedSection>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </AnimatedSection>

        {/* RSVP Section */}
        <AnimatedSection
          id="rsvp"
          className="py-20 w-full bg-white text-center px-4 relative"
        >
          <div className="absolute inset-0 z-0 opacity-10">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">RSVP</h2>
            <p className="text-gray-700 mb-8">
              Please respond by{" "}
              {new Date(weddingDetails.rsvpTime).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <RsvpForm />
          </div>
        </AnimatedSection>

        {/* Message Section */}
        <AnimatedSection
          className="py-24 w-full bg-gray-50 text-center px-4 relative overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute -left-16 bottom-20 w-32 h-32 border border-gray-200 opacity-20 rotate-45"></div>
          <div className="absolute -right-16 top-20 w-32 h-32 border border-gray-200 opacity-20 rotate-45"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-16">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative mb-8 inline-block">
                  <div className="absolute -inset-2 border border-gray-200 -rotate-2"></div>
                  <Image
                    src="/FOTO-5.png"
                    alt="Happy Couple"
                    width={300}
                    height={200}
                    className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-lg"
                  />
                </div>
              </AnimatedSection>
              
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Messages from Guests
              </h2>
              <div className="w-24 h-px bg-gray-400 mx-auto"></div>
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                Share your love and well wishes with the couple. Your message
                will be displayed here for everyone to see.
              </p>
            </div>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="px-4 py-6">
                <MessageWall />
              </div>
            </AnimatedSection>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </AnimatedSection>

        {/* Footer */}
        <footer className="w-full py-20 bg-black text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="absolute -left-16 top-40 w-32 h-32 border border-gray-800 opacity-20 rounded-full"></div>
          <div className="absolute -right-16 bottom-40 w-32 h-32 border border-gray-800 opacity-20 rounded-full"></div>

          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <AnimatedSection
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div className="mb-8">
                <Heart className="h-8 w-8 mx-auto mb-4 text-white opacity-80" />
              </div>
            </AnimatedSection>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif mb-6 tracking-wide">
                {weddingDetails.brideFirstName} &{" "}
                {weddingDetails.groomFirstName}
              </h2>

              <div className="w-16 h-px bg-white/30 mx-auto my-8"></div>

              <p className="mb-10 font-light tracking-wider">
                {new Date(weddingDetails.akadDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </AnimatedSection>

            <AnimatedSection
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm text-gray-400 tracking-wider uppercase">
                Made with love for our special day
              </p>
            </AnimatedSection>
          </div>
        </footer>
      </main>
    </MessageProvider>
  );
}
