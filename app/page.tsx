import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Heart, MapPin } from "lucide-react";

import { CountdownTimer } from "@/components/countdown-timer";
import { RsvpForm } from "@/components/rsvp-form";
import { Gallery } from "@/components/gallery";
import { VenueMap } from "@/components/venue-map";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedText } from "@/components/animated-text";
import { BankAccountCard } from "@/components/bank-account-card";

export default function WeddingInvitation() {
  // Wedding details - customize these
  const weddingDetails = {
    brideFirstName: "Zulfa",
    brideLastName: "Ayyuhan",
    groomFirstName: "Firly",
    groomLastName: "Pomolango",
    date: "2025-04-15T08:00:00", // ISO format: YYYY-MM-DDTHH:MM:SS
    venue: "Masjid Baitul Jannah",
    address: "Kauman, RT 02/ RW 02, SELOPAMPANG, TEMANGGUNG",
    receptionTime: "8:00 AM",
    lunchTime: "10:00 AM",
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/invitation.png"
            alt="Wedding background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white space-y-6 px-4 max-w-3xl mx-auto">
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
            className="w-24 h-0.5 bg-white/70 mx-auto my-8 opacity-0 animate-fadeIn"
            style={{ animationDelay: "1.8s", animationFillMode: "forwards" }}
          ></div>

          <AnimatedText
            text={new Date(weddingDetails.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            className="text-lg md:text-xl"
            delay={2}
          />

          <div
            className="pt-8 opacity-0 animate-fadeIn"
            style={{ animationDelay: "2.3s", animationFillMode: "forwards" }}
          >
            <CountdownTimer targetDate={weddingDetails.date} />
          </div>

          <div
            className="pt-8 opacity-0 animate-fadeIn"
            style={{ animationDelay: "2.6s", animationFillMode: "forwards" }}
          >
            <Link
              href="#rsvp"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-white/90 h-10 px-8 py-6"
            >
              RSVP
            </Link>
          </div>
        </div>
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0 animate-fadeIn"
          style={{ animationDelay: "3s", animationFillMode: "forwards" }}
        >
          <Link href="#our-story" className="text-white">
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
              className="h-8 w-8"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <AnimatedSection
        id="our-story"
        className="py-20 w-full bg-white text-center px-4"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/ourStory.png"
                alt="Couple"
                width={500}
                height={500}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
            <div className="text-left space-y-4">
              <p className="text-lg text-gray-700">
                Perjalanan kami dimulai dari sebuah pertemuan yang tak terduga.
                Pondok Pesantren. Ya, Saat itu kami masih duduk di bangku SMP.
                Firly adalah kakak kelas Zulfa , kita tidak pernah menyangka
                bahwa pertemuan pertama kami di sebuah lomba pidato bahasa
                Inggris akan menjadi awal dari kisah yang begitu indah. dari
                sanalah kita mulai saling mengenal.
              </p>
              <p className="text-lg text-gray-700">
                Meskipun setelah lulus kami sempat berpisah untuk mengejar jalan
                masing-masing, takdir membawa kami bertemu kembali di awal tahun
                2016. Kami mulai menjalin persahabatan yang semakin erat seiring
                berjalannya waktu. Dari sahabat, kami belajar saling menghargai
                dan mengerti, hingga akhirnya kami menyadari bahwa ada perasaan
                yang lebih dari sekadar persahabatan.Tak terasa langkah-langkah
                kecil yang kami ambil akan membawa kami sejauh ini.
              </p>
              <p className="text-lg text-gray-700">
                Di hari yang penuh keberkahan ini, kami ingin berbagi
                kebahagiaan dengan kalian semua. Kami, Firly dan Zulfa, dengan
                penuh rasa syukur dan cinta, mengundang kalian untuk menjadi
                bagian dari perjalanan cinta kami.
              </p>
              <p className="text-lg text-gray-700">Firly & Zulfa.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Gift Section */}
      <AnimatedSection className="py-20 w-full bg-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Wedding Gift</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honor us with a gift, we have provided our account
            details below.
          </p>

          <BankAccountCard
            accountNumber="1540857527"
            accountName="Roby Firly"
            bankLogoSrc="/bca-logo.png"
          />

          <p className="text-gray-600 mt-8 text-sm italic">
            Thank you for your love, support, and generosity.
          </p>
        </div>
      </AnimatedSection>

      {/* Details Section */}
      <AnimatedSection className="py-20 w-full bg-gray-50 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">
            Wedding Details
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection
              className="bg-white p-8 rounded-lg shadow-md"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <Calendar className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">The Date</h3>
              <p>
                {new Date(weddingDetails.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </AnimatedSection>
            <AnimatedSection
              className="bg-white p-8 rounded-lg shadow-md"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Ceremony</h3>
              <p>
                {new Date(weddingDetails.date).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Please arrive 30 minutes early
              </p>
            </AnimatedSection>
            <AnimatedSection
              className="bg-white p-8 rounded-lg shadow-md"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Location</h3>
              <p>{weddingDetails.venue}</p>
              <p className="mt-2 text-sm text-gray-500">
                {weddingDetails.address}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Gallery Section */}
      {/* <AnimatedSection className="py-20 w-full bg-white text-center px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">Our Moments</h2>
          <Gallery />
        </div>
      </AnimatedSection> */}

      {/* Map Section */}
      <AnimatedSection className="py-20 w-full bg-gray-50 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">
            Venue Location
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1743201557843!6m8!1m7!1syW0HdWuB8c15h6Iub-aJzg!2m2!1d-7.376007021861672!2d110.1716905793647!3f248.81!4f0!5f0.7820865974627469"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing location of ${weddingDetails.venue}`}
            ></iframe>
          </div>
          <div className="mt-8 text-left">
            <h3 className="text-xl font-medium mb-2">Getting There</h3>
            <p className="text-gray-700 mb-4">
              {weddingDetails.venue} is located at {weddingDetails.address}.
              Parking is available on-site at no additional cost.
            </p>
            <p className="text-gray-700">
              For guests traveling from out of town, we recommend staying at the
              Roseville Grand Hotel, which is offering a special rate for our
              wedding guests. Please mention our names when booking.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* RSVP Section */}
      {/* <AnimatedSection
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
          <p className="text-gray-700 mb-8">Please respond by May 15, 2025</p>
          <RsvpForm />
        </div>
      </AnimatedSection> */}

      {/* Footer */}
      <footer className="w-full py-12 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection
            variants={{
              hidden: { scale: 0 },
              visible: { scale: 1 },
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Heart className="h-8 w-8 mx-auto mb-4 text-white" />
          </AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-serif mb-6">
            {weddingDetails.brideFirstName} & {weddingDetails.groomFirstName}
          </h2>
          <p className="mb-8">
            {new Date(weddingDetails.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-sm text-gray-400">
            Made with love for our special day
          </p>
        </div>
      </footer>
    </main>
  );
}
